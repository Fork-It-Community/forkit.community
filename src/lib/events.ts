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
  if (!event || event.data.type !== "event") {
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
    {
      href: `/events/${event.id}#speakers`,
      label: "Speakers",
    },
    {
      href: `/events/${event.id}#sponsors`,
      label: "Sponsors",
    },
  ];
}
