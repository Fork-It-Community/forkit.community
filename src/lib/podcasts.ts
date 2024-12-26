import { getCollection } from "astro:content";
import dayjs from "dayjs";

type Params = {
  limit?: number;
};

export async function getPodcastsCollection({
  limit = undefined,
}: Params = {}) {
  const podcasts =
    (await getCollection("podcast", ({ data }) =>
      import.meta.env.PROD ? dayjs().isAfter(data.releaseDate) : true,
    )) ?? [];

  if (limit) {
    return podcasts.slice(0, limit);
  }

  return podcasts;
}
