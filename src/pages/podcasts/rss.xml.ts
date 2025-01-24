import { getPodcastsEpisodesCollection } from "@/lib/podcasts";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async function get(context) {
  const podcasts = await getPodcastsEpisodesCollection();
  return rss({
    title: "Fork it! Community podcasts",
    description: "Listen to the Fork it! Community",
    site: context.site! + "/podcasts",
    trailingSlash: false,
    items: podcasts.map((podcast) => ({
      title: podcast.data.title,
      description: podcast.data.description,
      link: `${context.site}podcasts/${podcast.id}`,
      pubDate: podcast.data.releaseDate,
      categories: podcast.data.tags,
    })),
  });
};
