import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ACHIEVEMENT_DESCRIPTIONS,
  type AchievementLevel,
  type AchievementSlug,
} from "@/lib/achievements";
import { BadgeIcon } from "@/components/CustomIcons/BadgeIcons";

type AchievementBadgesProps = {
  slug: AchievementSlug;
  level: AchievementLevel["label"] | null;
  count: number;
};

const AchievementBadge = ({
  achievement,
}: {
  achievement: AchievementBadgesProps;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="relative"
          onClick={() => setOpen((prev) => !prev)}
        >
          <BadgeIcon level={achievement.level} slug={achievement.slug} />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {ACHIEVEMENT_DESCRIPTIONS[achievement.slug]}: {achievement.count}
      </TooltipContent>
    </Tooltip>
  );
};

export const AchievementBadges = ({
  achievements,
}: {
  achievements: Array<AchievementBadgesProps>;
}) => {
  return (
    <TooltipProvider>
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
    </TooltipProvider>
  );
};
