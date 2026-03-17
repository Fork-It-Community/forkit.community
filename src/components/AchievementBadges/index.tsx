import { useState } from "react";
import {
  ResponsiveDrawer,
  ResponsiveDrawerContent,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
  ResponsiveDrawerTrigger,
} from "@/components/ResponsiveDrawer";
import {
  ACHIEVEMENT_DESCRIPTIONS,
  ACHIEVEMENTS,
  DEFAULT_ACHIEVEMENT_LEVELS,
  type AchievementLevel,
  type AchievementSlug,
} from "@/lib/achievements";
import { BadgeIcon } from "@/components/CustomIcons/BadgeIcons";
import { cn } from "@/lib/utils-client";

type AchievementBadgesProps = {
  slug: AchievementSlug;
  level: AchievementLevel["label"] | null;
  count: number;
};

function getLevelsForSlug(slug: AchievementSlug): AchievementLevel[] {
  const achievement = ACHIEVEMENTS.find((a) => a.slug === slug);
  return achievement?.achievementLevels ?? DEFAULT_ACHIEVEMENT_LEVELS;
}

function isLevelUnlocked(
  levels: AchievementLevel[],
  currentLevel: string | null,
  targetLevel: string,
): boolean {
  if (!currentLevel) return false;
  const order = levels.map((level) => level.label);
  return order.indexOf(currentLevel) >= order.indexOf(targetLevel);
}

const AchievementBadge = ({
  achievement,
}: {
  achievement: AchievementBadgesProps;
}) => {
  const [open, setOpen] = useState(false);
  const levels = getLevelsForSlug(achievement.slug);

  return (
    <ResponsiveDrawer open={open} onOpenChange={setOpen}>
      <ResponsiveDrawerTrigger
        type="button"
        aria-label={`${ACHIEVEMENT_DESCRIPTIONS[achievement.slug]}: ${achievement.count}`}
        className="relative"
        onClick={() => setOpen(true)}
      >
        <BadgeIcon level={achievement.level} slug={achievement.slug} />
      </ResponsiveDrawerTrigger>
      <ResponsiveDrawerContent className="max-w-sm sm:mx-auto">
        <ResponsiveDrawerHeader>
          <ResponsiveDrawerTitle>
            {ACHIEVEMENT_DESCRIPTIONS[achievement.slug]}
          </ResponsiveDrawerTitle>
        </ResponsiveDrawerHeader>
        <div className="flex items-center justify-center gap-4 py-4">
          <BadgeIcon
            level={achievement.level}
            slug={achievement.slug}
            size={80}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 px-4 pb-6">
          {levels.map((level) => {
            const unlocked = isLevelUnlocked(
              levels,
              achievement.level,
              level.label,
            );
            return (
              <div
                key={level.label}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3",
                  unlocked ? "" : "opacity-40 grayscale",
                )}
              >
                <BadgeIcon level={level.label} slug={achievement.slug} />
                <div className="flex flex-col">
                  <span className="text-sm font-medium capitalize">
                    {level.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {level.limit}+
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ResponsiveDrawerContent>
    </ResponsiveDrawer>
  );
};

export const AchievementBadges = ({
  achievements,
}: {
  achievements: Array<AchievementBadgesProps>;
}) => {
  return (
    <div className="flex gap-2">
      {achievements.map(
        (achievement) =>
          achievement.level && (
            <AchievementBadge
              key={achievement.slug}
              achievement={achievement}
            />
          ),
      )}
    </div>
  );
};
