import { getCollection } from "astro:content";
import dayjs from "dayjs";

type Params = {
  limit?: number;
};

export async function getNewsCollection({ limit = undefined }: Params = {}) {
  const news = (await getCollection("news"))
    .filter((post) => dayjs().isAfter(post.data.date))
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
