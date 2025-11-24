import type { CollectionEntry } from "astro:content";
import { getPersonArticles } from "./news";
import { getPersonEvents, type EventComputed } from "./events";
import { getPersonEpisodes } from "./podcasts";
import {
  getPersonForKids,
  type ForKidsEventComputed,
} from "@/lib/forKidsEvents";
import { match } from "ts-pattern";
import dayjs from "dayjs";

type Appearance =
  | CollectionEntry<"episodes">
  | CollectionEntry<"news">
  | EventComputed
  | ForKidsEventComputed;

type AppearanceWithSort = Appearance & { sortDate: Date };

export async function getAppearances(
  person: CollectionEntry<"people">,
  limit: number = 3,
) {
  const events = await getPersonEvents(person, { limit });
  const podcastsEpisodes = await getPersonEpisodes(person, { limit });
  const articles = await getPersonArticles(person, { limit });
  const forKids = await getPersonForKids(person, { limit });

  return [...events, ...podcastsEpisodes, ...articles, ...forKids]
    .map((item) => ({
      ...item,
      sortDate: match(item)
        .with({ collection: "events" }, (i) => i.data.date)
        .with({ collection: "news" }, (i) => i.data.date)
        .with({ collection: "episodes" }, (i) => i.data.releaseDate)
        .with({ collection: "forKidsEvent" }, (i) => i.data.date)
        .exhaustive(),
    }))
    .sort((a, b) => dayjs(b.sortDate).diff(a.sortDate))
    .slice(0, limit) as AppearanceWithSort[];
}
