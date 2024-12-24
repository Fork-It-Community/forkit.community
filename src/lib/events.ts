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

export async function getNextEvent() {
  const events = await getEventsCollection();
  const upcomingEvents = events
    .filter((event) => dayjs().isBefore(event.data.date))
    .sort(
      (event1, event2) =>
        (event1.data.date?.valueOf() ?? 0) - (event2.data.date?.valueOf() ?? 0),
    );
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  return nextEvent;
}
