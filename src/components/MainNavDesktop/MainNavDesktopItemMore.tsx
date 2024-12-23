import {
  MdBadge,
  MdHandshake,
  MdLocalActivity,
  MdMoreHoriz,
} from "react-icons/md";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

const MainNavMobileItemMore = (props: { currentPathname: string }) => {
  return (
    <Drawer autoFocus>
      <DrawerTrigger className="flex items-center justify-center gap-2 py-3 opacity-60">
        <span className="text-lg">
          <MdMoreHoriz />
        </span>
        <span className="text-base tracking-wide">More</span>
      </DrawerTrigger>
      <DrawerContent className="pb-8">
        <DrawerHeader>
          <DrawerTitle className="sr-only">More</DrawerTitle>
          <DrawerDescription className="sr-only"></DrawerDescription>
        </DrawerHeader>
        <MoreNavItem
          href="/speakers"
          currentPathname={props.currentPathname}
          icon={MdBadge}
        >
          Speakers
        </MoreNavItem>
        <MoreNavItem
          href="/partners"
          currentPathname={props.currentPathname}
          icon={MdHandshake}
        >
          Partners
        </MoreNavItem>
        <MoreNavItem
          href="/organize-event"
          currentPathname={props.currentPathname}
          icon={MdLocalActivity}
        >
          Organize an event
        </MoreNavItem>
      </DrawerContent>
    </Drawer>
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
      className={cn(
        "flex items-center gap-3 px-8 py-3",
        !isActive && "opacity-50",
        isActive && "text-white",
      )}
    >
      <span className="text-2xl">
        <Icon />
      </span>
      <span>{props.children}</span>
    </a>
  );
};

export default MainNavMobileItemMore;
