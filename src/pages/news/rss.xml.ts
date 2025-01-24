import { getNewsCollection } from "@/lib/news";
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
    items: news.map((article) => ({
      title: article.data.title,
      description: article.data.excerpt,
      link: `${context.site}news/article/${article.id}`,
      pubDate: article.data.date,
      categories: article.data.tags,
    })),
    customData: `<language>en-EN</language>`,
  });
};
