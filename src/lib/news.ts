import { getCollection } from "astro:content";
import dayjs from "dayjs";

export async function getNewsCollection() {
  return (await getCollection("news"))
    .filter((post) => dayjs().isAfter(post.data.date))
    .filter((post) => post.data.state === "published" || !import.meta.env.PROD)
    .sort(
      (post1, post2) =>
        (post2.data.date?.valueOf() ?? 0) - (post1.data.date?.valueOf() ?? 0),
    );
}