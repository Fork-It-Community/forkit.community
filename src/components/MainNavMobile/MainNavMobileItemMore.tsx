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
        <DrawerHeader className="sr-only">
          <DrawerTitle>More</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="pt-4">
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
        </div>
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
        "flex items-center gap-3 px-6 py-3 opacity-50",
        isActive && "opacity-100",
      )}
    >
      <span className="text-xl">
        <Icon />
      </span>
      <span className="text-sm tracking-wide">{props.children}</span>
    </a>
  );
};

export default MainNavMobileItemMore;
