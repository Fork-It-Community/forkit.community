import type { Platform } from "@/schemas/podcasts";
import { getCollection } from "astro:content";
import dayjs from "dayjs";
import type { FC } from "react";
import {
  FaDeezer,
  FaDownload,
  FaPodcast,
  FaSpotify,
  FaYoutube,
} from "react-icons/fa6";
import { SiPodcastindex } from "react-icons/si";

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