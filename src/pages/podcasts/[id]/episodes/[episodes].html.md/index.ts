import { getPodcastsEpisodesCollection } from "@/lib/podcasts";
import { ROUTES } from "@/routes.gen";
import { type ExtractParams } from "@bearstudio/lunalink";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import dayjs from "dayjs";

export const GET: APIRoute<
  ExtractParams<
    (typeof ROUTES.podcasts)[":id"]["episodes"][":episode"]["__path"]
  >
> = async ({ params: { id = "", episodes = "" } }) => {
  return new Response(
    `${await displayTitle(id, episodes)}

${await displayParagraph(id, episodes)}

${await displayDescription(id, episodes)}

${await displayTag(id, episodes)}

${await displayPlateform(id, episodes)}

${await displayHost(id, episodes)}

${await displayGuest(id, episodes)}`,
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
};

export async function getStaticPaths() {
  const podcasts = await getPodcastsEpisodesCollection();

  return podcasts.map((podcast) => ({
    params: {
      id: podcast.id.split("/").at(0) ?? "",
      episodes: podcast.id.split("/").at(2) ?? "",
    },
  }));
}

const displayTitle = async (id: string, episodeId: string) => {
  const podcasts = await getPodcastsEpisodesCollection();

  const podcast = podcasts.find(
    (p) => p.id.split("/").at(0) === id && p.id.split("/").at(2) === episodeId,
  );

  return `# ${podcast?.data.title}`;
};

const displayParagraph = async (id: string, episodeId: string) => {
  const podcasts = await getPodcastsEpisodesCollection();

  const podcast = podcasts.find(
    (p) => p.id.split("/").at(0) === id && p.id.split("/").at(2) === episodeId,
  );

  if (!podcast?.data.title) return "";

  const paragraphDate = () => {
    return `${podcast?.data.releaseDate ? `was released on ${dayjs(podcast?.data.releaseDate).format("MMM DD, YYYY")}` : ""}`;
  };

  const paragraphLanguage = () => {
    return `${podcast?.data.language ? `, and was produced in ${podcast?.data.language}` : ""}`;
  };

  return `\`\`\`
The episode ${podcast?.data.title} ${paragraphDate()}${paragraphLanguage()}.
\`\`\``;
};

const displayDescription = async (id: string, episodeId: string) => {
  const podcasts = await getPodcastsEpisodesCollection();

  const podcast = podcasts.find(
    (p) => p.id.split("/").at(0) === id && p.id.split("/").at(2) === episodeId,
  );

  if (!podcast?.data.description) return "";

  return `## Description
\`\`\`
${podcast?.data.description}\`\`\``;
};

const displayTag = async (id: string, episodeId: string) => {
  const podcasts = await getPodcastsEpisodesCollection();

  const podcast = podcasts.find(
    (p) => p.id.split("/").at(0) === id && p.id.split("/").at(2) === episodeId,
  );

  if (!podcast?.data.tags) return "";

  return `## Tags
- ${podcast?.data.tags?.join("\n- ")}`;
};

const displayPlateform = async (id: string, episodeId: string) => {
  const podcasts = await getPodcastsEpisodesCollection();

  const podcast = podcasts.find(
    (p) => p.id.split("/").at(0) === id && p.id.split("/").at(2) === episodeId,
  );

  if (!podcast?.data.urls) return "";

  return `## Plateforms
${podcast?.data.urls
  ?.map((url) => {
    return `- [${url.platform}](${url.url})`;
  })
  ?.join("\n")}`;
};

const displayHost = async (id: string, episodeId: string) => {
  const podcasts = await getPodcastsEpisodesCollection();

  const podcast = podcasts.find(
    (p) => p.id.split("/").at(0) === id && p.id.split("/").at(2) === episodeId,
  );

  if (!podcast?.data.hosts) return "";

  const people = await getCollection("people");

  const hosts = podcast.data.hosts
    .map((host) => {
      const person = people.find((p) => p.id === host.id);
      return `- [${person?.data.name}](${person?.filePath})`;
    })
    .join("\n");

  return `## Hosts
${hosts}`;
};

const displayGuest = async (id: string, episodeId: string) => {
  const podcasts = await getPodcastsEpisodesCollection();

  const podcast = podcasts.find(
    (p) => p.id.split("/").at(0) === id && p.id.split("/").at(2) === episodeId,
  );
  if (!podcast?.data.guests) return "";

  const people = await getCollection("people");

  const guests = podcast.data.guests
    .map((guest) => {
      const person = people.find((p) => p.id === guest.id);
      return `- [${person?.data.name}](${person?.filePath})`;
    })
    .join("\n");

  return `## Guests
${guests}`;
};
