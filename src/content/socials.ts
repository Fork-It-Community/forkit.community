import { IconLuma } from "@/components/CustomIcons/IconLuma";
import type { Channel } from "@/schemas/channel";
import type { SocialType } from "@/schemas/utils";
import type { FC } from "react";
import {
  FaBluesky,
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa6";
import type { IconType } from "react-icons/lib";
import { LuMail, LuMessageCircle } from "react-icons/lu";

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

export const SOCIALS_TYPE_MAP = {
  bluesky: FaBluesky,
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  facebook: FaFacebook,
} satisfies Record<SocialType, FC>;

export const GLOBAL_NEWSLETTER_LINK =
  "https://7dca2c80.sibforms.com/serve/MUIFACNrQwiH7V08ltOYZJGzrh-InrxkJyIqX--5MK_ju3OUx4e9obvACfjo6B1h3HciGVkC6ksErKgvwQHrdLfLpLCq73srDU5vUrCPubh3UaD10lTNebVYU7Dv-8X6QBUM5V9qgLyEcz8EKgYqd3zSCINpfcymQJcI7KwNAVZsoIKEtlEuLqwc0zOdNs-AdoFZemFS7ZS0HplO";

export const channels: Array<{
  type: Channel["type"];
  icon: IconType;
}> = [
  {
    type: "newsletter",
    icon: LuMail,
  },
  {
    type: "whatsapp",
    icon: LuMessageCircle,
  },
];
