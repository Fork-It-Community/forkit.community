import { MdMoreHoriz } from "react-icons/md";
import type { FC, ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getMainMenuDesktopItems } from "@/content/menus";

const MainNavMobileItemMore = (props: { currentPathname: string }) => {
  const secondaryContent = getMainMenuDesktopItems("secondary");

  if (secondaryContent.length === 0) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center gap-2 rounded px-3 py-2 opacity-50 transition hover:bg-black/30 hover:opacity-100">
        <span className="text-lg">
          <MdMoreHoriz />
        </span>
        <span className="text-sm tracking-wide">More</span>
      </PopoverTrigger>
      <PopoverContent
        className="w-56 px-2 py-2"
        align="end"
        alignOffset={-20}
        sideOffset={8}
      >
        {secondaryContent.map((item, index) => (
          <MoreNavItem
            key={index}
            icon={item.icon}
            href={item.href}
            exact={item.exact ?? false}
            currentPathname={props.currentPathname}
          >
            {item.label}
          </MoreNavItem>
        ))}
      </PopoverContent>
    </Popover>
  );
};

const MoreNavItem = (props: {
  children: ReactNode;
  icon: FC;
  href: string;
  exact?: boolean;
  currentPathname: string;
}) => {
  const Icon = props.icon;
  const isActive = props.exact
    ? props.href === props.currentPathname
    : props.currentPathname.startsWith(props.href);
  return (
    <a
      href={props.href}
      className={`flex items-center gap-3 rounded px-3 py-2.5 text-white transition hover:bg-black/30 hover:opacity-100 ${isActive ? "opacity-100" : "opacity-50"}`}
    >
      <span className="text-xl">
        <Icon />
      </span>
      <span className="text-sm tracking-wide">{props.children}</span>
    </a>
  );
};

export default MainNavMobileItemMore;
