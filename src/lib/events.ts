import dayjs from "dayjs";

import { getCollection, getEntries, type CollectionEntry } from "astro:content";

export function getEventsCollection() {
  return getCollection("events", ({ data }) =>
    import.meta.env.PROD ? data.published === true : true,
  );
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

export async function getMeetupsCollection() {
  return getCollection("meetups", ({ data }) =>
    import.meta.env.PROD ? data.published === true : true,
  );
}

export async function getUpcomingMeetups() {
  const meetups = getMeetupsCollection();

  const upcomingMeetups = (await meetups)
    .filter((meetup) => dayjs().isBefore(meetup.data.date))
    .sort(
      (event1, event2) =>
        (event1.data.date?.valueOf() ?? 0) - (event2.data.date?.valueOf() ?? 0),
    );

  return upcomingMeetups ?? [];
}
