import type { CollectionEntry } from "astro:content";
import dayjs from "dayjs";
import { match } from "ts-pattern";

import { getPersonEvents } from "./events";
import { getPersonArticles } from "./news";
import { getPersonEpisodes } from "./podcasts";

export async function getAppearances(
  person: CollectionEntry<"people">,
  limit: number = 3,
) {
  const events = await getPersonEvents(person, { limit });
  const podcastsEpisodes = await getPersonEpisodes(person, { limit });
  const articles = await getPersonArticles(person, { limit });

  return [...events, ...podcastsEpisodes, ...articles]
    .map((item) => ({
      ...item,
      sortDate: match(item)
        .with({ collection: "events" }, (i) => i.data.date)
        .with({ collection: "news" }, (i) => i.data.date)
        .with({ collection: "episodes" }, (i) => i.data.releaseDate)
        .exhaustive(),
    }))
    .sort((a, b) => dayjs(b.sortDate).diff(a.sortDate))
    .slice(0, limit);
}
