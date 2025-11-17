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
    event.data._computed.speakers.map((speaker) => speaker.id === people.id),
  ).length;

  const personEventsAsOrganizerCount = personEvents.filter((event) =>
    event.data.organizers?.map((organizer) => organizer.id === people.id),
  ).length;

  return {
    ...people,
    data: {
      ...people.data,
      _computed: {
        speakingCount: personEventsAsSpeakerCount,
        organizingCount: personEventsAsOrganizerCount,
      },
    },
  };
}

export async function getPeopleWithComputed(people: CollectionEntry<"people">) {
  return await peopleWithComputed(people);
}
