import {
  getEntry,
  type CollectionEntry,
  type ReferenceDataEntry,
} from "astro:content";
import { getPersonEvents } from "./events";
import { Octokit } from "octokit";
import { GITHUB_ACCESS_TOKEN } from "astro:env/server";

const octokit = new Octokit({
  auth: GITHUB_ACCESS_TOKEN,
});

type Contributors = {
  login: string;
  contributions: number;
}[];

let contributorsCache: Contributors | null;

async function getAllGithubContributors() {
  if (contributorsCache) {
    return contributorsCache;
  }

  try {
    const contributors = await octokit.paginate(
      octokit.rest.repos.listContributors,
      {
        owner: "Fork-It-Community",
        repo: "forkit.community",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    contributorsCache = contributors.map((c) => ({
      login: c.login ?? "",
      contributions: c.contributions ?? 0,
    }));

    return contributorsCache;
  } catch {
    return [];
  }
}

export async function getPeopleFromReference(
  people: Array<ReferenceDataEntry<"people">>,
) {
  return Promise.all(
    people.map(async (organizer) => await getEntry(organizer)),
  );
}

export async function peopleWithComputed<
  People extends CollectionEntry<"people">,
>(people: People, contributors?: Contributors) {
  const personEvents = await getPersonEvents(people);

  const personEventsAsSpeakerCount = personEvents.filter((event) =>
    event.data._computed.speakers.some((speaker) => speaker.id === people.id),
  ).length;

  const personFullDayEventsAsOrganizerCount = personEvents.filter(
    (event) =>
      event.data._computed.organizers?.some(
        (organizer) => organizer.id === people.id,
      ) && event.data.type === "event",
  ).length;

  const personMeetupsAsOrganizerCount = personEvents.filter(
    (event) =>
      event.data._computed.organizers?.some(
        (organizer) => organizer.id === people.id,
      ) && event.data.type === "meetup",
  ).length;

  const personEventsCountryCount = new Set(
    personEvents
      .map((event) => event.data._computed.country?.id)
      .filter((id) => !!id),
  ).size;

  const handle = getPeopleGithubHandle(people);

  const allContributors = contributors ?? (await getAllGithubContributors());

  const personGithubContributionsCount = handle
    ? getPersonGithubContributionsCountWithHandle(handle, allContributors)
    : 0;

  return {
    ...people,
    data: {
      ...people.data,
      _computed: {
        speakingCount: personEventsAsSpeakerCount,
        fullDayEventsOrganizingCount: personFullDayEventsAsOrganizerCount,
        meetupOrganizingCount: personMeetupsAsOrganizerCount,
        visitedCountryCount: personEventsCountryCount,
        githubContributionCount: personGithubContributionsCount,
      },
    },
  };
}

export const getPeopleWithComputed = async (
  people: CollectionEntry<"people">,
) => {
  return await peopleWithComputed(people);
};

export const getPeopleListWithComputed = async (
  peopleList: Array<CollectionEntry<"people">>,
) => {
  const contributors = await getAllGithubContributors();

  return Promise.all(
    peopleList.map((person) => peopleWithComputed(person, contributors)),
  );
};

const getPeopleGithubHandle = (people: CollectionEntry<"people">) => {
  const href = people.data.socials?.find((s) => s.type === "github")?.href;
  if (!href) return;

  try {
    const url = new URL(href);
    return url.pathname.replace("/", "");
  } catch {
    return undefined;
  }
};

const getPersonGithubContributionsCountWithHandle = (
  handle: string,
  contributors: Contributors,
) => {
  return (
    contributors.find((contributor) => contributor.login === handle)
      ?.contributions ?? 0
  );
};

export type PersonWithComputed = Awaited<
  ReturnType<typeof peopleWithComputed<CollectionEntry<"people">>>
>;

export const getPeopleFromCountry = (
  people: Array<CollectionEntry<"people">>,
  countryId: CollectionEntry<"countries">["id"],
) => {
  return people.filter((person) => person.data.country?.id === countryId);
};
