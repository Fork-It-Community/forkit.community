import { ROUTES } from "@/routes.gen";
import { lunalink } from "@bearstudio/lunalink";
import type { FC } from "react";
import {
  MdHomeFilled,
  MdEvent,
  MdInfo,
  MdFeed,
  MdPodcasts,
  MdBadge,
  MdOutlineChildCare,
  MdOndemandVideo,
  MdMic,
  // MdBadge,
  // MdHandshake,
  // MdLocalActivity,
} from "react-icons/md";

type MainMenuScope = "all" | "mobile" | "desktop";
type MainMenuLevel = "primary" | "secondary";

const MAIN_MENU: Array<{
  icon: FC;
  label: string;
  href: string;
  exact?: boolean;
  scope: MainMenuScope;
  level: MainMenuLevel;
}> = [
  {
    label: "Home",
    href: lunalink(ROUTES.__path, {}),
    exact: true,
    icon: MdHomeFilled,
    scope: "mobile",
    level: "primary",
  },
  {
    label: "Events",
    href: lunalink(ROUTES.events.__path, {}),
    icon: MdEvent,
    scope: "all",
    level: "primary",
  },
  {
    label: "Podcasts",
    href: lunalink(ROUTES.podcasts.__path, {}),
    icon: MdPodcasts,
    scope: "all",
    level: "primary",
  },
  {
    label: "News",
    href: lunalink(ROUTES.news.__path, {}),
    icon: MdFeed,
    scope: "all",
    level: "primary",
  },
  {
    label: "Videos",
    href: lunalink(ROUTES.resources.videos.__path, {}),
    icon: MdOndemandVideo,
    scope: "all",
    level: "secondary",
  },
  {
    label: "Community members",
    href: lunalink(ROUTES.people.__path, {}),
    icon: MdBadge,
    scope: "all",
    level: "secondary",
  },
  {
    label: "Conferences",
    href: lunalink(ROUTES.conferences.__path, {}),
    icon: MdMic,
    scope: "all",
    level: "secondary",
  },
  // {
  //   label: "Partners",
  //   href: "/partners",
  //   icon: MdHandshake,
  //   scope: "all",
  //   level: "secondary",
  // },
  // {
  //   label: "Organize an event",
  //   href: "/organize-event",
  //   icon: MdLocalActivity,
  //   scope: "all",
  //   level: "secondary",
  // },
  {
    label: "For Kids",
    href: lunalink(ROUTES.fr.events["for-kids"].__path, {}),
    icon: MdOutlineChildCare,
    scope: "all",
    level: "secondary",
  },
  {
    label: "About Fork it!",
    href: lunalink(ROUTES.about.__path, {}),
    icon: MdInfo,
    scope: "all",
    level: "secondary",
  },
];

export function getMainMenuMobileItems(level: MainMenuLevel) {
  return MAIN_MENU.filter(
    (item) =>
      (item.scope === "all" || item.scope === "mobile") && item.level === level,
  );
}

export function getMainMenuDesktopItems(level: MainMenuLevel) {
  return MAIN_MENU.filter(
    (item) =>
      (item.scope === "all" || item.scope === "desktop") &&
      item.level === level,
  );
}

export function getMainMenuItems() {
  return MAIN_MENU;
}
