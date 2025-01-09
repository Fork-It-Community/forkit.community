import dayjs from "dayjs";

import {
  getCollection,
  getEntries,
  getEntry,
  type CollectionEntry,
} from "astro:content";

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

export async function getNextEvent() {
  const upcomingEvents = await getUpcomingEvents();

  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  return nextEvent;
}

export async function getUpcomingMajorEvent() {
  const upcomingEvents = await getUpcomingEvents();

  const notCancelledEvents = upcomingEvents.filter(
    (event) => event.data.status !== "cancelled",
  );

  return (
    notCancelledEvents.find((event) => event.data.type === "event") ??
    notCancelledEvents.find((event) => event.data.type === "meetup") ??
    // In case we add another type later, like external events
    notCancelledEvents.at(0)
  );
}

export async function getMeetupsCollection() {
  return getCollection("events", ({ data }) => {
    const isPublished = import.meta.env.PROD
      ? isEventPublished(data.status)
      : true;

    return isPublished && data.type === "meetup";
  });
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
    {
      href: `/events/${event.id}#venue`,
      label: "Venue",
    },
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

export function shouldShowTicketsButton(
  event: CollectionEntry<"events">,
): event is CollectionEntry<"events"> & {
  data: { tickets: NonNullable<CollectionEntry<"events">["data"]["tickets"]> };
} {
  if (event.data.status === "cancelled") {
    return false;
  }

  return !!(event.data.tickets && dayjs().isBefore(event.data.date));
}

export function shouldShowCFPButton(
  event: CollectionEntry<"events">,
): event is CollectionEntry<"events"> & {
  data: { cfp: NonNullable<CollectionEntry<"events">["data"]["cfp"]> };
} {
  if (event.data.status === "cancelled") {
    return false;
  }

  return !!(event.data.cfp && dayjs().isBefore(event.data.cfp.endDate));
}

export function getEventDisplayDate(event: CollectionEntry<"events">) {
  if (event.data.status === "published-without-date")
    return `Coming in ${dayjs(event.data.date).format("YYYY")}`;
  return dayjs(event.data.date).format("MMMM DD, YYYY");
}
