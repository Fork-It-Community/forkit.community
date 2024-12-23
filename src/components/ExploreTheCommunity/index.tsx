import { Button } from "@/components/ui/button";
import { LuArrowUpRight } from "react-icons/lu";

export const ExploreTheCommunity = (
  props: Readonly<{ title?: string; href?: string }>,
) => {
  return (
    <div className="flex min-h-10 flex-row items-center justify-between gap-1 rounded-lg bg-neutral-900 bg-opacity-40 p-2 pl-4">
      <p className="text-xs font-medium">
        {props?.title || "Fork it! Community"}
      </p>
      <Button asChild size="sm" className="max-h-6 px-2 text-xs">
        <a href={props?.href || "/"}>
          Explore the community
          <LuArrowUpRight
            className="ml-1 inline-block h-3.5 w-3.5"
            aria-hidden="true"
          />
        </a>
      </Button>
    </div>
  );
};
