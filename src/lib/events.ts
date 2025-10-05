import dayjs from "dayjs";
import {
  getCollection,
  getEntries,
  getEntry,
  type CollectionEntry,
} from "astro:content";
import { match } from "ts-pattern";
import { entries, isEmpty, isNullish } from "remeda";
import { lunalink } from "@bearstudio/lunalink";
import { ROUTES } from "@/routes.gen";

export function isEventPublished(
  status?: CollectionEntry<"events">["data"]["status"],
) {
  if (!status) return false;
  return status !== "draft";
}

export interface eventDetails {
  event_startTime: Date | undefined;
  event_duration: number | undefined;
  event_title: string | undefined;
  event_location: string | undefined;
}

function toGoogleCalendarDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function getGoogleCalendarNewEventUrl(talk: eventDetails) {
  const start = new Date(talk.event_startTime || "");
  const end = new Date(start.getTime() + (talk.event_duration || 0) * 60000);
  const eventUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(talk.event_title || "")}` +
    `&dates=${toGoogleCalendarDate(start)}/${toGoogleCalendarDate(end)}` +
    `&location=${encodeURIComponent(talk.event_location || "")}`;
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
          (event.data.schedule?.items ?? []).map(async (item) => {
            if (!item.slug) {
              return;
            }
            return await getEntry("talks", item.slug.id);
          }),
        )
      : []
  ).filter((i) => !!i);

  return {
    ...event,
    data: {
      ...event.data,
      _computed: {
        name: `${city?.data.name}, ${country?.data.name}, ${event.data.date.getFullYear()}`,
        city,
        country,
        talks,
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
  const event = await getEvent(id);

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
    ...(event.data.speakers?.length
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
    .exhaustive();
}

function personWasInEvent(
  person: CollectionEntry<"people">,
  event: CollectionEntry<"events">,
) {
  return (
    event.data.organizers?.some((organizer) => organizer.id === person.id) ||
    event.data.volunteers?.some((volunteer) => volunteer.id === person.id) ||
    event.data.speakers?.some((speaker) => speaker.id === person.id)
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

export function getPersonRolesInEvent(
  event: CollectionEntry<"events">,
  person: CollectionEntry<"people">,
) {
  const ROLE_MAPPINGS = {
    organizers: "organizer",
    volunteers: "volunteer",
    speakers: "speaker",
  } as const;

  const roles = new Set<(typeof ROLE_MAPPINGS)[keyof typeof ROLE_MAPPINGS]>();

  for (const [key, role] of entries(ROLE_MAPPINGS)) {
    if (event.data[key]?.some((p) => p.id === person.id)) {
      roles.add(role);
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
