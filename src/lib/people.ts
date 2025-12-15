import {
  getEntry,
  type CollectionEntry,
  type ReferenceDataEntry,
} from "astro:content";

export async function getPeopleFromReference(
  people: Array<ReferenceDataEntry<"people">>,
) {
  return Promise.all(
    people.map(async (organizer) => await getEntry(organizer)),
  );
}

export const getWorldwideOrganizers = (
  people: Array<CollectionEntry<"people">>,
) => {
  return people.filter(
    (org) => org.id === "rudy-baer" || org.id === "aziz-ouertani",
  );
};

export const getPeopleFromCountry = (
  people: Array<CollectionEntry<"people">>,
  countryId: CollectionEntry<"countries">["id"],
) => {
  return people.filter((person) => person.data.country?.id === countryId);
};
