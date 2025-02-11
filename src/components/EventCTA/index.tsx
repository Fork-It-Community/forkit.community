import { buttonVariants } from "@/components/ui/button";
import type { EventCtaType } from "@/lib/events";
import { cn } from "@/lib/utils-client";
import type { CollectionEntry } from "astro:content";
import { MdArrowForward } from "react-icons/md";
import { match } from "ts-pattern";

type EventCTAProps = {
  variant: "default" | "secondary";
  buttonType: EventCtaType | null;
  event: CollectionEntry<"events">;
};

export const EventCTA = (props: EventCTAProps) => {
  return match(props.buttonType)
    .with(null, () => null)
    .with("tickets", () => (
      <a
        href={props.event.data.tickets?.href}
        className={cn(
          buttonVariants({ size: "lg", variant: props.variant }),
          "group gap-2",
        )}
      >
        Get Your Ticket
        <MdArrowForward className="transition group-hover:translate-x-1" />
      </a>
    ))
    .with("prospectus", () => (
      <a
        href={props.event.data.prospectus?.href}
        className={buttonVariants({ size: "lg", variant: props.variant })}
      >
        Become a Sponsor
      </a>
    ))
    .with("cfp", () => (
      <a
        href={props.event.data.cfp?.href}
        className={buttonVariants({ size: "lg", variant: props.variant })}
      >
        Call For Paper
      </a>
    ))
    .with("after-event", () => (
      <a
        href="#after-event"
        className={cn(
          buttonVariants({ size: "lg", variant: props.variant }),
          "gap-2",
        )}
      >
        After Event Insights
      </a>
    ))
    .exhaustive();
};
