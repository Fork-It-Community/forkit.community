import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";

export const ExploreTheCommunity = (props: Readonly<{ title: string }>) => {
  return (
    <div className="flex flex-row justify-between items-center min-h-10 gap-1 p-2 pl-4 bg-[#171717] bg-opacity-40 rounded-md">
      <p className="text-xs font-medium">
        {props.title}
      </p>
      <Button size="sm" className="max-h-6 text-xs">
        Explore the community
        <ArrowUpRight
          className="w-3.5 h-3.5 ml-1 inline-block"
          aria-hidden="true"
        />
      </Button>
    </div>
  );
}