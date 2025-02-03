import { Logo } from "@/components/Logo";
import { LogoIcon } from "@/components/LogoIcon";
import { Button } from "@/components/ui/button";
import { MdArrowOutward } from "react-icons/md";

export const ExploreTheCommunity = (props: {
  logoUrl: string;
  eventCity?: string;
  eventCountry?: string;
  eventDate?: Date;
}) => {
  return (
    <div className="bg-background-blur max-w-(--breakpoint-lg) relative z-10 mx-auto flex h-12 items-center justify-between rounded-md">
      <a
        href={props.logoUrl}
        className="group flex min-w-0 flex-1 items-center gap-3 pe-2 ps-5 text-sm tracking-wide"
      >
        {props.eventCity ? (
          <>
            <LogoIcon className="text-primary w-[18px]" />
            <span className="font-heading line-clamp-1 flex gap-0 text-xs font-medium uppercase leading-none opacity-60 group-hover:opacity-100 max-sm:flex-col sm:gap-1">
              <span>
                {props.eventCity}
                <span className="max-sm:hidden">,</span>{" "}
              </span>
              <span className="max-sm:text-2xs">
                {props.eventCountry}, {props.eventDate?.getFullYear()}
              </span>
            </span>
          </>
        ) : (
          <Logo className="h-3" />
        )}
      </a>
      <div className="flex items-center justify-center pe-3">
        <Button asChild size="xs" variant="secondary-dark">
          <a href="/" className="group flex gap-1">
            Community Hub
            <MdArrowOutward className="text-lg transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Button>
      </div>
    </div>
  );
};
