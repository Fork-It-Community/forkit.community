import { Logo } from "@/components/Logo/Logo";
import { LogoIcon } from "@/components/Logo/LogoIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CollectionEntry } from "astro:content";
import { LuArrowUpRight } from "react-icons/lu";

export const ExploreTheCommunity = (props: {
  logoUrl: string;
  backUrl?: string;
  event?: CollectionEntry<"events">;
}) => {
  return (
    <div className="bg-background-blur mx-auto flex h-12 max-w-screen-lg items-center justify-between rounded-md">
      <a
        href={props.logoUrl}
        className="group flex min-w-0 flex-1 items-center gap-3 pe-2 ps-5 text-sm tracking-wide"
      >
        {props.event ? (
          <>
            <LogoIcon className="w-[18px] text-primary" />
            <span className="line-clamp-1 flex gap-0 font-heading text-xs font-medium uppercase leading-none opacity-60 group-hover:opacity-100 max-sm:flex-col sm:gap-1">
              <span>
                {props.event?.data.city}
                <span className="max-sm:hidden">,</span>{" "}
              </span>
              <span className="max-sm:text-2xs">
                {props.event?.data.country},{" "}
                {props.event?.data.date?.getFullYear()}
              </span>
            </span>
          </>
        ) : (
          <Logo className="h-3" />
        )}
      </a>
      <div className="flex items-center justify-center pe-3">
        <Button asChild size="xs" variant="ghost">
          <a href="/" className="flex gap-1">
            <span className={cn(!!props.event?.data.name && "max-xs:sr-only")}>
              Explore The
            </span>
            Community
            <LuArrowUpRight className="text-lg" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  );
};
