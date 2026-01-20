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
import BadgeIcon from "../CustomIcons/BadgeIcons";

type AchievementBadgesProps = {
  slug: AchievementSlug;
  level: AchievementLevel["label"] | null;
  count: number;
}[];

export const AchievementBadges = ({
  achievements,
}: {
  achievements: AchievementBadgesProps;
}) => {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="relative z-50 flex gap-2">
        {achievements.map((achievement, index) => (
          <Tooltip key={`${achievement.slug}-${index}`}>
            <TooltipTrigger asChild>
              <div className="relative z-50">
                <BadgeIcon level={achievement.level} slug={achievement.slug} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {ACHIEVEMENT_DESCRIPTIONS[achievement.slug]}: {achievement.count}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};
