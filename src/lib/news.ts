import type { News } from "@/schemas/news";
import { getCollection, type CollectionEntry } from "astro:content";
import dayjs from "dayjs";

type Params = {
  limit?: number;
};

export type NewsEntry = CollectionEntry<"news"> & { data: News };

export async function getNewsCollection({ limit = undefined }: Params = {}) {
  const news = (await getCollection("news"))
    .filter((post) => post.data.state === "published" || !import.meta.env.PROD)
    .sort(
      (post1, post2) =>
        (post2.data.date?.valueOf() ?? 0) - (post1.data.date?.valueOf() ?? 0),
    );

  if (limit) {
    return news.slice(0, limit);
  }

  return news;
}

export async function getPersonArticles(
  person: CollectionEntry<"people">,
  { limit }: Params = {},
) {
  return (
    await getCollection("news", (episode) =>
      episode.data.authors?.some((author) => author.id === person.id),
    )
  )
    .sort((a, b) => dayjs(b.data.date).diff(a.data.date))
    .slice(0, limit);
}
