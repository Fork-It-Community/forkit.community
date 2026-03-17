export const prerender = true;

export type SearchResponse = Array<{
  title: string;
  type: string;
  slug: string;
}>;

import type { APIRoute } from "astro";
import { getEventsCollection } from "@/lib/events";
import { getNewsCollection } from "@/lib/news";
import { getPodcastsEpisodesCollection } from "@/lib/podcasts";
import { ROUTES } from "@/routes.gen";
import { lunalink } from "@bearstudio/lunalink";
import { getCollection } from "astro:content";
import dayjs from "dayjs";

export const GET: APIRoute = async () => {
  const [
    eventsCollection,
    newsCollection,
    podcastsCollection,
    peopleCollection,
  ] = await Promise.all([
    getEventsCollection(),
    getNewsCollection(),
    getPodcastsEpisodesCollection(),
    getCollection("people"),
  ]);

  const events = eventsCollection.map((event) => ({
    slug: lunalink(ROUTES.events[":id"].__path, { id: event.id }),
    title: `${event.data._computed.name} - ${dayjs(event.data.date).format("MMMM DD, YYYY")}`,
    type: "events",
  }));

  const news = newsCollection.map((n) => ({
    slug: lunalink(ROUTES.news.article[":id"].__path, { id: n.id }),
    title: n.data.title,
    type: "news",
  }));

  const podcasts = podcastsCollection.map((episode) => ({
    slug: lunalink(
      ROUTES.podcasts[":id"].__path,
      { id: episode.id },
      { encodeURIComponent: (v) => String(v) },
    ),
    title: episode.data.title,
    type: "podcasts",
  }));

  const people = peopleCollection.map((item) => ({
    slug: lunalink(ROUTES.people[":id"].__path, { id: item.id }),
    title: item.data.name,
    type: "people",
  }));

  return new Response(
    JSON.stringify([...events, ...news, ...podcasts, ...people]),
    { headers: { "Content-Type": "application/json" } },
  );
};
