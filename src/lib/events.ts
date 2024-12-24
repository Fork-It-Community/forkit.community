import dayjs from "dayjs";
import type { Event } from "@/schemas/events";
import { getCollection, getEntries } from "astro:content";

export function getEventsCollection() {
  return getCollection("events");
}

export function getEventsSubpagesCollection(event: Event) {
  return getEntries(event.subPages);
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
