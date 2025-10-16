import { getEventsCollection } from "@/lib/events";
import { getNewsCollection } from "@/lib/news";
import { getPodcastsEpisodesCollection } from "@/lib/podcasts";
import { ROUTES } from "@/routes.gen";
import { lunalink } from "@bearstudio/lunalink";
import { defineAction } from "astro:actions";

export const server = {
  search: defineAction({
    handler: async () => {
      const eventsCollection = await getEventsCollection();
      const newsCollection = await getNewsCollection();
      const podcastsCollection = await getPodcastsEpisodesCollection();

      const events = await Promise.all(
        eventsCollection.map(async (event) => {
          return {
            slug: lunalink(ROUTES.events[":id"].__path, { id: event.id }),
            title: event.data._computed.name,
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
            metadata: {
              date: news.data.date,
            },
          };
        }),
      );

      const podcasts = await Promise.all(
        podcastsCollection.map(async (episode) => {
          return {
            slug: lunalink(ROUTES.podcasts[":id"].__path, { id: episode.id }),
            title: episode.data.title,
            metadata: {
              date: episode.data.releaseDate,
            },
          };
        }),
      );

      return {
        events,
        news,
        podcasts,
      };
    },
  }),
};
