import type { PersonWithComputed } from "./people";

type AchievementSlug = keyof PersonWithComputed["data"]["_computed"];

type AchievementLevel = {
  label: string;
  limit: number;
};

type Achievement = {
  slug: AchievementSlug;
  achievementLevels?: AchievementLevel[];
};

export const DEFAULT_ACHIEVEMENT_LEVELS = [
  { label: "stone", limit: 1 },
  { label: "bronze", limit: 2 },
  { label: "silver", limit: 5 },
  { label: "gold", limit: 10 },
];

export const ACHIEVEMENTS: Achievement[] = [
  { slug: "speakingCount" },
  { slug: "fullDayEventsOrganizingCount" },
  { slug: "meetupOrganizingCount" },
  { slug: "visitedCountryCount" },
  {
    slug: "githubContributionCount",
    achievementLevels: [
      { label: "stone", limit: 1 },
      { label: "bronze", limit: 10 },
      { label: "silver", limit: 50 },
      { label: "gold", limit: 100 },
    ],
  },
];
