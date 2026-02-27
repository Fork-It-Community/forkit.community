import type { PersonWithComputed } from "./people";

export type AchievementSlug = keyof PersonWithComputed["data"]["_computed"];

export type AchievementLevel = {
  label: string;
  limit: number;
};

type Achievement = {
  slug: AchievementSlug;
  achievementLevels?: AchievementLevel[];
};

export const ACHIEVEMENT_DESCRIPTIONS: Record<AchievementSlug, string> = {
  speakingCount: "Talks given",
  fullDayEventsOrganizingCount: "Full day events organized",
  meetupOrganizingCount: "Meetups organized",
  visitedCountryCount: "Countries visited",
  githubContributionCount: "GitHub contributions",
};

const DEFAULT_ACHIEVEMENT_LEVELS = [
  { label: "wood", limit: 1 },
  { label: "stone", limit: 2 },
  { label: "silver", limit: 5 },
  { label: "gold", limit: 10 },
];

const ACHIEVEMENTS: Achievement[] = [
  { slug: "speakingCount" },
  { slug: "fullDayEventsOrganizingCount" },
  { slug: "meetupOrganizingCount" },
  { slug: "visitedCountryCount" },
  {
    slug: "githubContributionCount",
    achievementLevels: [
      { label: "wood", limit: 1 },
      { label: "stone", limit: 10 },
      { label: "silver", limit: 50 },
      { label: "gold", limit: 100 },
    ],
  },
];

export const getPersonAchievements = (personComputed: PersonWithComputed) => {
  return ACHIEVEMENTS.map((achievement) => {
    const value = personComputed.data._computed[achievement.slug] ?? 0;

    const levels = achievement.achievementLevels ?? DEFAULT_ACHIEVEMENT_LEVELS;

    const reachedLevel =
      [...levels]
        .sort((a, b) => b.limit - a.limit)
        .find((level) => value >= level.limit)?.label ?? null;

    return {
      slug: achievement.slug,
      level: reachedLevel,
      count: value,
    };
  });
};
