import dayjs from "dayjs";

import {
  getCollection,
  getEntries,
  getEntry,
  type CollectionEntry,
} from "astro:content";
import { match } from "ts-pattern";

export function isEventPublished(
  status?: CollectionEntry<"events">["data"]["status"],
) {
  if (!status) return false;
  return status !== "draft";
}

export function getEventsCollection() {
  return getCollection("events", ({ data }) =>
    import.meta.env.PROD ? isEventPublished(data.status) : true,
  );
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

export async function getUpcomingEvents({
  limit = undefined,
}: GetEventsParams = {}) {
  const events = await getEventsCollection();
  const upcomingEvents =
    events
      .filter((event) => dayjs().isBefore(event.data.date))
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
      .filter((event) => dayjs().isAfter(event.data.date))
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

export async function getEvent(id: string) {
  const event = await getEntry("events", id);
  if (import.meta.env.PROD && !isEventPublished(event?.data.status)) {
    return undefined;
  }
  return event;
}

export async function getEventNavItems(id: string) {
  const event = await getEvent(id);

  if (!event) return [];

  return [
    ...(event.data.afterEventContent
      ? [
          {
            href: `/events/${event.id}#after-event`,
            label: "After Event",
          },
        ]
      : []),
    ...(event.data.location
      ? [
          {
            href: `/events/${event.id}#venue`,
            label: "Venue",
          },
        ]
      : []),
    {
      href: `/events/${event.id}#schedule`,
      label: "Schedule",
    },
    ...(event.data.speakers?.length
      ? [
          {
            href: `/events/${event.id}#speakers`,
            label: "Speakers",
          },
        ]
      : []),
    ...(event.data.sponsors?.length
      ? [
          {
            href: `/events/${event.id}#sponsors`,
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
    dayjs().isBefore(event.data.tickets.endDate ?? event.data.date)
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

  return !!(event.data.cfp && dayjs().isBefore(event.data.cfp.endDate));
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
    event.data.prospectus && dayjs().isBefore(event.data.prospectus.endDate)
  );
}

export function getEventDisplayDate(event: CollectionEntry<"events">) {
  if (event.data.status === "published-without-date")
    return `Coming in ${dayjs(event.data.date).format("YYYY")}`;
  return dayjs(event.data.date).format("MMMM DD, YYYY");
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
  { limit }: GetEventsParams,
) {
  return (
    (await getEventsCollection())
      // Order with the most recent first
      .sort((a, b) => dayjs(b.data.date).diff(a.data.date))
      // We don't want cancelled events and just the one the person is in
      .filter(
        (event) =>
          event.data.status !== "cancelled" && personWasInEvent(person, event),
      )
      .slice(0, limit)
  );
}
