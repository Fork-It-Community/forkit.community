import dayjs from "dayjs";

import { getCollection, getEntries, type CollectionEntry } from "astro:content";

export function getEventsCollection() {
  return getCollection("events");
}

export function getEventSubPagesCollection(
  event: CollectionEntry<"events"> | null | undefined,
) {
  if (!event) {
    return [];
  }

  return getEntries(event.data.subPages);
}

export async function getUpcomingEvents() {
  const events = await getEventsCollection();
  const upcomingEvents = events
    .filter((event) => dayjs().isBefore(event.data.date))
    .sort(
      (event1, event2) =>
        (event1.data.date?.valueOf() ?? 0) - (event2.data.date?.valueOf() ?? 0),
    );

  return upcomingEvents ?? [];
}

export async function getNextEvent() {
  const upcomingEvents = await getUpcomingEvents();

  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  return nextEvent;
}
