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
  FaMastodon,
} from "react-icons/fa6";
import { LuMail, LuMessageCircle } from "react-icons/lu";
import { SiForgejo, SiOpenstreetmap } from "react-icons/si";

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
    label: "Instagram",
    href: "https://www.instagram.com/forkit.community",
    icon: FaInstagram,
    level: "primary",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/forkit.community",
    icon: FaFacebook,
    level: "primary",
  },
  {
    label: "BlueSky",
    href: "https://bsky.app/profile/forkit.community",
    icon: FaBluesky,
    level: "secondary",
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
  mastodon: FaMastodon,
  source: SiForgejo,
  openstreetmap: SiOpenstreetmap,
} satisfies Record<SocialType, FC>;

export const GLOBAL_NEWSLETTER_LINK =
  "https://7dca2c80.sibforms.com/serve/MUIFACNrQwiH7V08ltOYZJGzrh-InrxkJyIqX--5MK_ju3OUx4e9obvACfjo6B1h3HciGVkC6ksErKgvwQHrdLfLpLCq73srDU5vUrCPubh3UaD10lTNebVYU7Dv-8X6QBUM5V9qgLyEcz8EKgYqd3zSCINpfcymQJcI7KwNAVZsoIKEtlEuLqwc0zOdNs-AdoFZemFS7ZS0HplO";

export const FOR_KIDS_NEWSLETTER_LINK =
  "https://7dca2c80.sibforms.com/serve/MUIFAF4lBlcqY1YSNjXGicH9V4mlM17ZJJukvfyws_lpby7sSIZDRjR7GQgoWki1Xsympeji8jMEaEyi5Z0qlWrLlgJfGdlZAcsTySeZCHz5LNpiOE-s4jw0pBpPp8AvKhy10zDJtJi8HB0jQHIqbqPeftorZYxkFs65gNwk1Y47gpNu8jtqLwY9-oVuKXLjKghVsUgqU-gyBI8R";

export const FOR_KIDS_WHATSAPP_LINK =
  "https://chat.whatsapp.com/BcXf26yAcg27dGcTXyYvfl?mode=wwt";

export const CHANNELS_TYPE_MAP = {
  newsletter: LuMail,
  whatsapp: LuMessageCircle,
} satisfies Record<Channel["type"], FC>;
