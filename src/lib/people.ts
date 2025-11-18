import {
  getEntry,
  type CollectionEntry,
  type ReferenceDataEntry,
} from "astro:content";
import { getPersonEvents } from "./events";

export async function getPeopleFromReference(
  people: Array<ReferenceDataEntry<"people">>,
) {
  return Promise.all(
    people.map(async (organizer) => await getEntry(organizer)),
  );
}

export async function peopleWithComputed<
  People extends CollectionEntry<"people">,
>(people: People) {
  const personEvents = await getPersonEvents(people);

  const personEventsAsSpeakerCount = personEvents.filter((event) =>
    event.data._computed.speakers.some((speaker) => speaker.id === people.id),
  ).length;

  const personFullDayEventsAsOrganizerCount = personEvents.filter(
    (event) =>
      event.data.organizers?.some((organizer) => organizer.id === people.id) &&
      event.data.type === "event",
  ).length;

  const personMeetupsAsOrganizerCount = personEvents.filter(
    (event) =>
      event.data.organizers?.some((organizer) => organizer.id === people.id) &&
      event.data.type === "meetup",
  ).length;

  const personEventsCountryCount = new Set(
    personEvents.map((event) => event.data._computed.country?.id),
  ).size;

  return {
    ...people,
    data: {
      ...people.data,
      _computed: {
        speakingCount: personEventsAsSpeakerCount,
        fullDayEventsOrganizingCount: personFullDayEventsAsOrganizerCount,
        meetupOrganizingCount: personMeetupsAsOrganizerCount,
        visitedCountryCount: personEventsCountryCount,
      },
    },
  };
}

export async function getPeopleWithComputed(people: CollectionEntry<"people">) {
  return await peopleWithComputed(people);
}

export const getPeopleFromCountry = (
  people: Array<CollectionEntry<"people">>,
  countryId: CollectionEntry<"countries">["id"],
) => {
  return people.filter((person) => person.data.country?.id === countryId);
};
