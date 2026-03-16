import { getNewsCollection } from "@/lib/news";
import { toXml } from "@/lib/xml";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async function get(context) {
  const news = await getNewsCollection();
  return rss({
    title: "Fork it! Community | News",
    description:
      "All the news about Fork it! Community. Conferences feedback, real life experience, we share it all.",
    site: context.site! + "/news",
    trailingSlash: false,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    items: news.map((article) => ({
      title: article.data.title,
      description: article.data.excerpt,
      link: `${context.site}news/article/${article.id}`,
      pubDate: article.data.date,
      categories: article.data.tags,
    })),
    customData: toXml({
      language: "en-EN",
      "atom:link": {
        _attrs: {
          href: `${context.site}news/rss.xml`,
          rel: "self",
          type: "application/rss+xml",
        },
      },
    }),
  });
};
