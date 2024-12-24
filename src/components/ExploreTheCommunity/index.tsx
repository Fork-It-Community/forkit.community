import { Logo } from "@/components/Logo/Logo";
import { LogoIcon } from "@/components/Logo/LogoIcon";
import { Button } from "@/components/ui/button";
import type { CollectionEntry } from "astro:content";
import { LuArrowUpRight } from "react-icons/lu";

export const ExploreTheCommunity = (props: {
  logoUrl: string;
  backUrl?: string;
  event?: CollectionEntry<"events">;
}) => {
  return (
    <div className="bg-background-blur mx-auto flex h-12 max-w-screen-lg justify-between rounded-md">
      <a
        href={props.logoUrl}
        className="group flex items-center justify-center gap-3 px-5 text-sm tracking-wide"
      >
        {props.event ? (
          <>
            <LogoIcon className="w-[18px] text-primary" />

            <span className="font-heading text-xs font-medium uppercase leading-tight opacity-60 group-hover:opacity-100">
              {props.event?.data.name}
            </span>
          </>
        ) : (
          <Logo className="h-3" />
        )}
      </a>
      <div className="flex items-center justify-center px-3">
        <Button asChild size="xs" variant="ghost">
          <a href="/" className="flex gap-1">
            Explore the community
            <LuArrowUpRight className="text-lg" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  );
};
