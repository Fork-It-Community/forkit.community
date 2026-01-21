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
import BadgeIcon from "@/components/CustomIcons/BadgeIcons";

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
    <TooltipProvider>
      <div className="flex gap-2">
        {achievements.map((achievement, index) => (
          <Tooltip key={`${achievement.slug}-${index}`}>
            <TooltipTrigger asChild>
              <div className="relative">
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
