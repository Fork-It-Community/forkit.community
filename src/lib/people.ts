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
    personEvents.map((event) => event.data._computed.country?.id),
  ).size;

  const handle = getPeopleGithubHandle(people);

  const personGithubContributionsCount =
    handle && (await getPersonGithubContributionsCountWithHandle(handle));

  return {
    ...people,
    data: {
      ...people.data,
      _computed: {
        speakingCount: personEventsAsSpeakerCount,
        fullDayEventsOrganizingCount: personFullDayEventsAsOrganizerCount,
        meetupOrganizingCount: personMeetupsAsOrganizerCount,
        visitedCountryCount: personEventsCountryCount,
        githubContributionCount: personGithubContributionsCount ?? 0,
      },
    },
  };
}

export const getPeopleWithComputed = async (
  people: CollectionEntry<"people">,
) => {
  return await peopleWithComputed(people);
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

const getPersonGithubContributionsCountWithHandle = async (handle: string) => {
  try {
    const contributors = await octokit.request(
      "GET /repos/{owner}/{repo}/contributors",
      {
        owner: "Fork-It-Community",
        repo: "forkit.community",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
    return contributors.data.find((contributor) => contributor.login === handle)
      ?.contributions;
  } catch {
    return 0;
  }
};

export const getPeopleFromCountry = (
  people: Array<CollectionEntry<"people">>,
  countryId: CollectionEntry<"countries">["id"],
) => {
  return people.filter((person) => person.data.country?.id === countryId);
};
