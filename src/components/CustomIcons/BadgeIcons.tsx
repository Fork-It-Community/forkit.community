import type { AchievementLevel, AchievementSlug } from "@/lib/achievements";

type BadgeIconProps = {
  level: AchievementLevel["label"] | null;
  slug: AchievementSlug;
  className?: string;
  size?: number;
};

export const BadgeIcon = ({
  level,
  slug,
  className,
  size = 40,
}: BadgeIconProps) => {
  if (!level) {
    return null;
  }

  return (
    <div className={className}>
      <img
        src={`/badge-icons/${level}_${slug}.png`}
        alt={`${level} ${slug} badge`}
        width={size}
        height={size}
      />
    </div>
  );
};
