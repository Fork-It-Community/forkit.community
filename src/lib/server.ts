import collections from "@/content/collections";

/**
 * Get the next event to come in the MDX collection.
 * @returns The next event to come in the MDX collections.
 */
export async function getNextEvent() {
  return (
    (await collections.event.getAll())
      // Sorting, so we making sure they are correclty sorted by date
      .sort(
        (event1, event2) =>
          (event1.date?.valueOf() ?? 0) - (event2.date?.valueOf() ?? 0),
      )
      // Finding the first one that is published, has a date and the date of the
      // event is not passed
      .find(
        (event) =>
          event.published &&
          event.date &&
          event.date.valueOf() > new Date().valueOf(),
      )
  );
}
export async function getNextMeetup() {
  return (
    (await collections.meetup.getAll())
      // Sorting, so we making sure they are correclty sorted by date
      .sort(
        (meetup1, meetup2) =>
          (meetup1.date?.valueOf() ?? 0) - (meetup2.date?.valueOf() ?? 0),
      )
      // Finding the first one that is published, has a date and the date of the
      // meetup is not passed
      .find(
        (meetup) =>
          meetup.published &&
          meetup.date &&
          meetup.date.valueOf() > new Date().valueOf(),
      )
  );
}
