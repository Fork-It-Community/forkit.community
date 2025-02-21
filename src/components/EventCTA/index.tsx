import { Button, buttonVariants } from "@/components/ui/button";
import type { EventCtaType } from "@/lib/events";
import { cn } from "@/lib/utils-client";
import type { Event } from "@/schemas/events";
import type { ComponentProps } from "react";
import { MdArrowForward } from "react-icons/md";
import { match } from "ts-pattern";

export type EventMetadataForCta = Pick<
  Event,
  "cfp" | "tickets" | "date" | "status" | "prospectus"
>;
type Props = {
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
  buttonType: EventCtaType | null;
  eventMetadata: EventMetadataForCta;
  className?: string;
  onClick?: () => void;
};

export const EventCTA = (props: Props) => {
  const buttonProps = {
    className: cn(
      buttonVariants({ size: props.size, variant: props.variant }),
      "group gap-2",
      props.className,
    ),
    onClick: props.onClick,
  };

  return match(props.buttonType)
    .with(null, () => null)
    .with("tickets", () => (
      <a
        {...buttonProps}
        href={props.eventMetadata.tickets?.href}
        target="_blank"
        rel="noreferrer"
      >
        Get Your Ticket
        <MdArrowForward className="transition group-hover:translate-x-1" />
      </a>
    ))
    .with("prospectus", () => (
      <a
        {...buttonProps}
        href={props.eventMetadata.prospectus?.href}
        target="_blank"
        rel="noreferrer"
      >
        Become a Sponsor
      </a>
    ))
    .with("cfp", () => (
      <a
        {...buttonProps}
        href={props.eventMetadata.cfp?.href}
        target="_blank"
        rel="noreferrer"
      >
        Call For Paper
      </a>
    ))
    .with("after-event", () => (
      <a {...buttonProps} href="#after-event">
        After Event Insights
      </a>
    ))
    .exhaustive();
};
