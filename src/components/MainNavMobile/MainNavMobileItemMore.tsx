import { MdMoreHoriz } from "react-icons/md";
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
import { getMainMenuMobileItems } from "@/content/menus";

const MainNavMobileItemMore = (props: { currentPathname: string }) => {
  return (
    <Drawer autoFocus>
      <DrawerTrigger className="flex flex-1 flex-col items-center justify-center py-3 opacity-60">
        <span className="text-2xl">
          <MdMoreHoriz />
        </span>
        <span className="text-[0.6rem] tracking-wide">More</span>
      </DrawerTrigger>
      <DrawerContent className="pb-8">
        <DrawerHeader>
          <DrawerTitle className="sr-only">More</DrawerTitle>
          <DrawerDescription className="sr-only"></DrawerDescription>
        </DrawerHeader>
        {getMainMenuMobileItems("secondary").map((item, index) => (
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
        "flex items-center gap-3 px-8 py-3 opacity-50",
        isActive && "opacity-100",
      )}
    >
      <span className="text-2xl">
        <Icon />
      </span>
      <span className="tracking-wide">{props.children}</span>
    </a>
  );
};

export default MainNavMobileItemMore;
