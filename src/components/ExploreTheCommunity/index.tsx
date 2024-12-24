import { LogoIcon } from "@/components/Logo/LogoIcon";
import { Button } from "@/components/ui/button";
import { LuArrowUpRight } from "react-icons/lu";

export const ExploreTheCommunity = () => {
  return (
    <div className="bg-background-blur mx-auto flex h-12 max-w-screen-lg justify-between rounded-md">
      <a
        href="/"
        className="0 flex items-center justify-center px-5 text-sm tracking-wide"
      >
        <LogoIcon className="w-[18px] text-primary" />
      </a>
      <Button asChild size="xs" className="m-3" variant="ghost">
        <a href="/" className="flex gap-1">
          Explore the community
          <LuArrowUpRight className="text-lg" aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
};
