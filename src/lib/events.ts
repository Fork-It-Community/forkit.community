import dayjs from "dayjs";
import {
  getCollection,
  getEntries,
  getEntry,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content";
import { match } from "ts-pattern";
import { entries, isEmpty, isNonNullish, isNullish, uniqueBy } from "remeda";
import { lunalink } from "@bearstudio/lunalink";
import { ROUTES } from "@/routes.gen";
import defaultImage from "@/assets/images/events.jpeg";

export function isEventPublished(
  status?: CollectionEntry<"events">["data"]["status"],
) {
  if (!status) return false;
  return status !== "draft";
}

export interface EventDetails {
  startTime: Date | undefined;
  duration: number | undefined;
  title: string | undefined;
  location: string | undefined;
}

function toGoogleCalendarDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function getGoogleCalendarNewEventUrl(talk: EventDetails) {
  const start = new Date(talk.startTime || "");
  const end = new Date(start.getTime() + (talk.duration || 0) * 60000);
  const eventUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(talk.title || "")}` +
    `&dates=${toGoogleCalendarDate(start)}/${toGoogleCalendarDate(end)}` +
    `&location=${encodeURIComponent(talk.location || "")}`;
  return eventUrl;
}

export async function eventWithComputed<
  Event extends CollectionEntry<"events">,
>(event: Event) {
  const city = await getEntry("cities", event.data.city.id);

  const country = city
    ? await getEntry("countries", city.data.country.id)
    : undefined;

  const talks = (
    event.data.schedule
      ? await Promise.all(
          (event.data.schedule?.items ?? []).map((item) => {
            if (!item.slug) {
              return;
            }
            return getEntry("talks", item.slug.id);
          }),
        )
      : []
  ).filter((i) => !!i);

  const speakers = (
    await Promise.all(
      talks.flatMap(
        (talk) =>
          talk.data.speakers?.map(async (speaker) => {
            if (!speaker) return;
            const scheduleTalk = event.data.schedule?.items?.find(
              (item) => item.slug?.id === talk.id,
            );
            const isSpeakerTalkCanceled = scheduleTalk?.status === "cancelled";
            if (isSpeakerTalkCanceled) {
              return;
            }
            const person = await getEntry("people", speaker.id.id);

            if (!person) {
              return;
            }

            return {
              ...person,
              data: {
                ...person.data,
                _computed: {},
              },
            };
          }) ?? [],
      ),
    )
  ).filter((i) => !!i);

  const organizers = (
    await Promise.all(
      (event.data.organizers ?? []).map(async (organizer) => {
        if (!organizer.person || !organizer.person.id) {
          return;
        }

        const person = await getEntry("people", organizer.person.id);

        if (isNullish(person)) {
          return;
        }

        return {
          ...person,
          data: {
            ...person.data,
            _computed: { role: organizer.role },
          },
        };
      }),
    )
  ).filter(isNonNullish);

  const volunteers = (
    await Promise.all(
      (event.data.volunteers ?? []).map(async (volunteer) => {
        if (!volunteer || !volunteer.id) {
          return;
        }

        const person = await getEntry("people", volunteer.id);

        if (isNullish(person)) {
          return;
        }

        return {
          ...person,
          data: {
            ...person.data,
            _computed: {},
          },
        };
      }),
    )
  ).filter(isNonNullish);

  const coverImage = await getCoverImage("events", event.id);

  return {
    ...event,
    data: {
      ...event.data,
      image: coverImage,
      _computed: {
        name: `${city?.data.name}, ${country?.data.name}, ${event.data.date.getFullYear()}`,
        city,
        country,
        talks,
        speakers: uniqueBy(speakers, (speaker) => speaker.id),
        organizers,
        volunteers,
      },
    },
  };
}

export type EventComputed = Awaited<ReturnType<typeof eventWithComputed>>;

export async function getEventsCollection({
  without,
}: {
  without?: Array<CollectionEntry<"events">["data"]["status"]>;
} = {}) {
  return (
    await Promise.all(
      (
        await getCollection("events", ({ data }) =>
          import.meta.env.PROD ? isEventPublished(data.status) : true,
        )
      )
        .sort((a, b) => dayjs(b.data.date).diff(a.data.date))
        .map(eventWithComputed),
    )
  ).filter((event) => {
    if (isNullish(without) || isEmpty(without)) {
      return true;
    }

    return !without.includes(event.data.status);
  });
}

export function getEventSubPagesCollection(
  event: CollectionEntry<"events"> | null | undefined,
) {
  if (!event) {
    return [];
  }

  return getEntries(event.data.subPages ?? []);
}

type GetEventsParams = {
  limit?: number;
};

export async function getEventsByCountry(
  country: CollectionEntry<"countries">["id"],
) {
  const events = await getEventsCollection();

  return (
    events.filter((event) => event.data._computed.country?.id === country) ?? []
  );
}

export async function getEventByCity(city: CollectionEntry<"cities">["id"]) {
  const events = await getEventsCollection();

  return events.filter((event) => event.data._computed.city?.id === city) ?? [];
}

export async function getUpcomingEvents({
  limit = undefined,
}: GetEventsParams = {}) {
  const events = without(await getEventsCollection(), "draft");
  const upcomingEvents =
    events
      .filter((event) => dayjs(event.data.date).endOf("day").isAfter(dayjs()))
      .sort(
        (event1, event2) =>
          (event1.data.date?.valueOf() ?? 0) -
          (event2.data.date?.valueOf() ?? 0),
      ) ?? [];

  if (limit) {
    return upcomingEvents.slice(0, limit);
  }

  return upcomingEvents;
}

export async function getPastEvents({
  limit = undefined,
}: GetEventsParams = {}) {
  const events = await getEventsCollection();
  const pastEvents =
    events
      .filter((event) => dayjs(event.data.date).endOf("day").isBefore(dayjs()))
      .sort(
        (event1, event2) =>
          (event2.data.date?.valueOf() ?? 0) -
          (event1.data.date?.valueOf() ?? 0),
      ) ?? [];

  if (limit) {
    return pastEvents.slice(0, limit);
  }

  return pastEvents;
}

export async function getUpcomingMajorEvent() {
  const upcomingEvents = await getUpcomingEvents();

  const onlyScheduledEvents = upcomingEvents.filter(
    (event) =>
      event.data.status !== "cancelled" &&
      event.data.status !== "published-without-date",
  );

  return (
    onlyScheduledEvents.find((event) => event.data.type === "event") ??
    onlyScheduledEvents.find((event) => event.data.type === "meetup") ??
    onlyScheduledEvents.find((event) => event.data.type === "hackathon") ??
    // In case we add another type later, like external events
    onlyScheduledEvents.at(0)
  );
}

export async function getEvent(id: CollectionEntry<"events">["id"]) {
  const event = await getEntry("events", id);
  if (import.meta.env.PROD && !isEventPublished(event?.data.status)) {
    return undefined;
  }
  return event;
}

export async function getEventNavItems(id: string) {
  const event = await getEventWithComputed(id);

  if (!event) return [];

  const route = lunalink(ROUTES.events[":id"].__path, { id: event.id });

  return [
    ...(event.data.afterEventContent
      ? [
          {
            href: `${route}#after-event`,
            label: "After Event",
          },
        ]
      : []),
    ...(event.data.location
      ? [
          {
            href: `${route}#venue`,
            label: "Venue",
          },
        ]
      : []),
    {
      href: `${route}#schedule`,
      label: "Schedule",
    },
    ...(event.data._computed.speakers?.length
      ? [
          {
            href: `${route}#speakers`,
            label: "Speakers",
          },
        ]
      : []),
    ...(event.data.sponsors?.length
      ? [
          {
            href: `${route}#sponsors`,
            label: "Sponsors",
          },
        ]
      : []),
    ...(event.data.faq?.length
      ? [{ href: `/events/${event.id}#faq`, label: "FAQ" }]
      : []),
  ];
}

export function shouldShowTickets(
  event: CollectionEntry<"events">,
): event is CollectionEntry<"events"> & {
  data: { tickets: NonNullable<CollectionEntry<"events">["data"]["tickets"]> };
} {
  if (event.data.status === "cancelled") {
    return false;
  }

  return !!(
    event.data.tickets &&
    dayjs(event.data.tickets.endDate ?? event.data.date)
      .endOf("day")
      .isAfter(dayjs())
  );
}

export function shouldShowCFP(
  event: CollectionEntry<"events">,
): event is CollectionEntry<"events"> & {
  data: { cfp: NonNullable<CollectionEntry<"events">["data"]["cfp"]> };
} {
  if (event.data.status === "cancelled") {
    return false;
  }

  return !!(
    event.data.cfp &&
    dayjs(event.data.cfp.endDate).endOf("day").isAfter(dayjs())
  );
}

export function shouldShowProspectus(
  event: CollectionEntry<"events">,
): event is CollectionEntry<"events"> & {
  data: {
    prospectus: NonNullable<CollectionEntry<"events">["data"]["prospectus"]>;
  };
} {
  if (event.data.status === "cancelled") {
    return false;
  }

  return !!(
    event.data.prospectus &&
    dayjs(event.data.prospectus.endDate).endOf("day").isAfter(dayjs()) &&
    dayjs(event.data.date).startOf("day").isAfter(dayjs())
  );
}

export function getEventDisplayDate(
  event: CollectionEntry<"events"> | CollectionEntry<"forKidsEvent">,
) {
  const DRAFT_STATUSES: Array<CollectionEntry<"events">["data"]["status"]> = [
    "published-without-date",
    "draft",
  ] as const;

  if (DRAFT_STATUSES.includes(event.data.status)) {
    return `Coming in ${dayjs(event.data.date).locale("en").format("YYYY")}`;
  }

  return dayjs(event.data.date).locale("en").format("MMMM DD, YYYY");
}
export function getEventDisplayType(
  eventType: CollectionEntry<"events">["data"]["type"],
) {
  return match(eventType)
    .with("event", () => "Full Day Event")
    .with("meetup", () => "Community Meetup")
    .with("hackathon", () => "Hackathon")
    .exhaustive();
}

function personWasInEvent(
  person: CollectionEntry<"people">,
  event: EventComputed,
) {
  return (
    event.data._computed.organizers?.some(
      (organizer) => organizer.id === person.id,
    ) ||
    event.data.volunteers?.some((volunteer) => volunteer.id === person.id) ||
    event.data._computed.speakers?.some((speaker) => speaker.id === person.id)
  );
}

export async function getPersonEvents(
  person: CollectionEntry<"people">,
  { limit }: GetEventsParams = {},
) {
  return (
    (await getEventsCollection())
      // We don't want cancelled events and just the one the person is in
      .filter(
        (event) =>
          event.data.status !== "cancelled" && personWasInEvent(person, event),
      )
      .slice(0, limit)
  );
}

export type EventCtaType =
  | "tickets"
  | "after-event"
  | "prospectus"
  | "cfp"
  | "stay-updated";
export type EventCtaTypes = ReturnType<typeof getEventCtaTypes>;

export function getEventCtaTypes(event: CollectionEntry<"events">) {
  const getButtonType: (
    excludeTypes?: Array<EventCtaType | null>,
  ) => EventCtaType | null = (excludeTypes) => {
    if (shouldShowTickets(event) && !excludeTypes?.includes("tickets")) {
      return "tickets";
    }
    if (shouldShowProspectus(event) && !excludeTypes?.includes("prospectus")) {
      return "prospectus";
    }
    if (shouldShowCFP(event) && !excludeTypes?.includes("cfp")) {
      return "cfp";
    }
    if (
      event.data.afterEventContent &&
      !excludeTypes?.includes("after-event")
    ) {
      return "after-event";
    }
    if (
      dayjs(event.data.date).isAfter(dayjs()) &&
      !shouldShowTickets(event) &&
      !excludeTypes?.includes("stay-updated")
    ) {
      return "stay-updated";
    }
    return null;
  };

  const primary = getButtonType();
  const secondary = getButtonType([primary]);
  const tertiary = getButtonType([primary, secondary]);

  return {
    primary,
    secondary,
    tertiary,
  } as const;
}

const ROLE_MAPPINGS = {
  organizers: "organizer",
  volunteers: "volunteer",
  speakers: "speaker",
} as const;

export function getPersonRolesInEvent(
  event: EventComputed,
  person: CollectionEntry<"people">,
) {
  const roles = new Set<string>();

  for (const [key, role] of entries(ROLE_MAPPINGS)) {
    const people = match(key)
      .with("speakers", (k) =>
        event.data._computed[k].map((i) => ({
          ...i,
          type: "speakers" as const,
        })),
      )
      .with("organizers", (k) =>
        event.data._computed[k].map((i) => ({
          ...i,
          type: "organizers" as const,
        })),
      )
      .with("volunteers", (k) =>
        event.data._computed[k].map((i) => ({
          ...i,
          type: "volunteers" as const,
        })),
      )
      .exhaustive();

    const foundPerson = people.find((p) => p.id === person.id);
    if (foundPerson) {
      roles.add(role);

      if (
        foundPerson.type === "organizers" &&
        foundPerson.data._computed.role
      ) {
        roles.add(foundPerson.data._computed.role);
      }
    }
  }

  return roles;
}

export async function getEventWithComputed(
  id: CollectionEntry<"events">["id"],
) {
  const event = await getEvent(id);

  if (!event) {
    throw new Error(`Event ${id} does not exist`);
  }

  return await eventWithComputed(event);
}

export function without<T extends CollectionEntry<"events">>(
  events: Array<T>,
  status: T["data"]["status"],
) {
  return events.filter((event) => event.data.status !== status);
}

export async function getTalksWithVOD({ limit }: GetEventsParams = {}) {
  const talks = await getCollection(
    "talks",
    (talk) => talk.data.vod?.youtubeId,
  );
  const events = await getEventsCollection();
  const talksWithDate = talks
    .map((talk) => {
      const event = events.find((event) =>
        event.data.schedule?.items?.some((item) => item.slug?.id === talk.id),
      );
      return {
        talk,
        eventDate: event?.data.date,
      };
    })
    .sort(
      (a, b) => (b.eventDate?.valueOf() ?? 0) - (a.eventDate?.valueOf() ?? 0),
    )
    .map((item) => item.talk);
  if (limit) {
    return talksWithDate.slice(0, limit);
  }
  return talksWithDate;
}

export const getCoverImage = async (
  collection: Extract<CollectionKey, "events" | "cities">,
  id: CollectionEntry<"events">["id"] | CollectionEntry<"cities">["id"],
) => {
  const image = {
    media: defaultImage,
    alt: "Fork it Community's",
  };
  return await match(collection)
    .with("events", async () => {
      const event = await getEntry("events", id);
      const city = event
        ? await getEntry("cities", event.data.city.id)
        : undefined;
      const country = city
        ? await getEntry("countries", city.data.country.id)
        : undefined;
      return (
        event?.data.image ?? city?.data.cover ?? country?.data.cover ?? image
      );
    })
    .with("cities", async () => {
      const city = await getEntry("cities", id);
      const country = city
        ? await getEntry("countries", city.data.country.id)
        : undefined;
      return city?.data.cover ?? country?.data.cover ?? image;
    })
    .exhaustive();
};

export async function getUpcomingEventsWithOpenCfp(limit?: number) {
  const upcomingEvents = await getUpcomingEvents();
  const cfpEvents =
    upcomingEvents
      .filter(
        (e) =>
          e.data.cfp &&
          (!e.data.cfp?.endDate ||
            (e.data.cfp?.endDate &&
              dayjs(e.data.cfp.endDate).isAfter(dayjs()))),
      )
      .sort(
        (event1, event2) =>
          (event1.data.date?.valueOf() ?? 0) -
          (event2.data.date?.valueOf() ?? 0),
      ) ?? [];
  return cfpEvents.slice(0, limit);
}
