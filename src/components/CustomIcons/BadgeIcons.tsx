import type { AchievementLevel, AchievementSlug } from "@/lib/achievements";

type BadgeIconProps = {
  level: AchievementLevel["label"] | null;
  slug: AchievementSlug;
  className?: string;
};

const BadgeIcon = ({ level, slug, className }: BadgeIconProps) => {
  if (!level) {
    return;
  }

  return (
    <div className={className}>
      <img
        src={`/badge-icons/${level}_${slug}.svg`}
        alt={`${level} ${slug} badge`}
        className="h-10 w-10"
      />
    </div>
  );
};

export default BadgeIcon;
