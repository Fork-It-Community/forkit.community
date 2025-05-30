import type { FC } from "react";

import { type CollectionEntry, getCollection } from "astro:content";
import dayjs from "dayjs";
import {
  FaDeezer,
  FaDownload,
  FaPodcast,
  FaSpotify,
  FaYoutube,
} from "react-icons/fa6";
import { SiPodcastindex } from "react-icons/si";

import type { Platform } from "@/schemas/podcasts";

type Params = {
  limit?: number;
};

export async function getPodcastsEpisodesCollection({
  limit = undefined,
}: Params = {}) {
  const episodes = (
    (await getCollection("episodes", ({ data }) =>
      import.meta.env.PROD ? dayjs().isAfter(data.releaseDate) : true,
    )) ?? []
  ).sort((a, b) => dayjs(a.data.releaseDate).diff(b.data.releaseDate));

  if (limit) {
    return episodes.slice(0, limit);
  }

  return episodes;
}

export const PLATFORMS: Record<
  Platform,
  {
    icon: FC;
    label: string;
  }
> = {
  "apple-podcast": {
    label: "Apple Podcast",
    icon: FaPodcast,
  },
  youtube: {
    label: "Youtube",
    icon: FaYoutube,
  },
  deezer: { label: "Deezer", icon: FaDeezer },
  spotify: { label: "Spotify", icon: FaSpotify },
  "link-to-download": { label: "Download", icon: FaDownload },
  "podcast-index": { label: "Podcast Index", icon: SiPodcastindex },
};

export function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const remainingSecondsAfterHours = seconds % 3600;
  const minutes = Math.floor(remainingSecondsAfterHours / 60);
  const remainingSeconds = remainingSecondsAfterHours % 60;

  let durationParts = "PT";

  if (hours > 0) {
    durationParts += `${hours}H`;
  }
  if (minutes > 0) {
    durationParts += `${minutes}M`;
  }
  if (remainingSeconds > 0) {
    durationParts += `${remainingSeconds}S`;
  }

  return durationParts;
}

export async function getPersonEpisodes(
  person: CollectionEntry<"people">,
  { limit }: Params = {},
) {
  return (
    await getCollection(
      "episodes",
      (episode) =>
        episode.data.hosts?.some((host) => host.id === person.id) ||
        episode.data.guests?.some((guest) => guest.id === person.id),
    )
  )
    .sort((a, b) => dayjs(b.data.releaseDate).diff(a.data.releaseDate))
    .slice(0, limit);
}
