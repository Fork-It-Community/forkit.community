import { getEventsCollection } from "@/lib/events";
import { getNewsCollection } from "@/lib/news";
import { getPodcastsEpisodesCollection } from "@/lib/podcasts";
import { ROUTES } from "@/routes.gen";
import { lunalink } from "@bearstudio/lunalink";
import { getCollection } from "astro:content";
import dayjs from "dayjs";

export const search = async () => {
  const eventsCollection = await getEventsCollection();
  const newsCollection = await getNewsCollection();
  const podcastsCollection = await getPodcastsEpisodesCollection();
  const peopleCollection = await getCollection("people");

  const events = await Promise.all(
    eventsCollection.map(async (event) => {
      return {
        slug: lunalink(ROUTES.events[":id"].__path, { id: event.id }),
        title: `${event.data._computed.name} - ${dayjs(event.data.date).format("MMMM DD,  YYYY")}`,
        type: "events",
        metadata: {
          date: event.data.date,
        },
      };
    }),
  );

  const news = await Promise.all(
    newsCollection.map(async (news) => {
      return {
        slug: lunalink(ROUTES.news.article[":id"].__path, { id: news.id }),
        title: news.data.title,
        type: "news",
        metadata: {
          date: news.data.date,
        },
      };
    }),
  );

  const podcasts = await Promise.all(
    podcastsCollection.map(async (episode) => {
      return {
        slug: lunalink(
          ROUTES.podcasts[":id"].__path,
          { id: episode.id },
          { encodeURIComponent: (v) => String(v) },
        ),
        title: episode.data.title,
        type: "podcasts",
        metadata: {
          date: episode.data.releaseDate,
        },
      };
    }),
  );

  const people = await Promise.all(
    peopleCollection.map(async (item) => {
      return {
        slug: lunalink(ROUTES.people[":id"].__path, { id: item.id }),
        title: item.data.name,
        type: "people",
        metadata: {
          avatar: item.data.avatar,
        },
      };
    }),
  );

  return [...events, ...news, ...podcasts, ...people];
};
