import { getPodcastsEpisodesCollection } from "@/lib/podcasts";
import { toXml } from "@/lib/xml";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async function get(context) {
  const podcasts = await getPodcastsEpisodesCollection();
  return rss({
    title: "Fork it! Community | Podcasts",
    description: "Listen to the Fork it! Community",
    site: context.site! + "/podcasts",
    trailingSlash: false,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    items: podcasts.map((podcast) => ({
      title: podcast.data.title,
      description: podcast.data.description,
      link: `${context.site}podcasts/${podcast.id}`,
      pubDate: podcast.data.releaseDate,
      categories: podcast.data.tags,
    })),
    customData: toXml({
      language: "en",
      "atom:link": {
        _attrs: {
          href: `${context.site}podcasts/rss.xml`,
          rel: "self",
          type: "application/rss+xml",
        },
      },
    }),
  });
};
