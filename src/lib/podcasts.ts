import { getCollection } from "astro:content";
import dayjs from "dayjs";

type Params = {
  limit?: number;
};

export async function getPodcastsEpisodesCollection({
  limit = undefined,
}: Params = {}) {
  const episodes =
    (await getCollection("episodes", ({ data }) =>
      import.meta.env.PROD ? dayjs().isAfter(data.releaseDate) : true,
    )) ?? [];

  if (limit) {
    return episodes.slice(0, limit);
  }

  return episodes;
}
