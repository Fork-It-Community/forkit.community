import { IconLuma } from "@/components/CustomIcons/IconLuma";
import type { FC } from "react";
import {
  FaBluesky,
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

type SocialsLevel = "primary" | "secondary";

const SOCIALS: Array<{
  icon: FC;
  label: string;
  href: string;
  level: SocialsLevel;
}> = [
  {
    label: "Lu.ma",
    href: "https://lu.ma/forkit.community",
    icon: IconLuma,
    level: "primary",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/fork-it-community",
    icon: FaLinkedin,
    level: "primary",
  },
  {
    label: "BlueSky",
    href: "https://bsky.app/profile/forkit.community",
    icon: FaBluesky,
    level: "primary",
  },
  {
    label: "X Twitter",
    href: "https://twitter.com/ForkitCommunity",
    icon: FaXTwitter,
    level: "primary",
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com/channel/UCgV5zuiFWCMl7IvuZ5KbJOw",
    icon: FaYoutube,
    level: "primary",
  },
  {
    label: "Discord",
    href: "https://discord.gg/MEJ6TfJC2H",
    icon: FaDiscord,
    level: "secondary",
  },
  {
    label: "GitHub",
    href: "https://github.com/Fork-It-Community",
    icon: FaGithub,
    level: "secondary",
  },
];

export function getSocialsItems(level?: SocialsLevel) {
  if (!level) return SOCIALS;
  return SOCIALS.filter((item) => item.level === level);
}
