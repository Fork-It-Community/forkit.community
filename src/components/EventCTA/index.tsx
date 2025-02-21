import {
  ResponsiveDrawer,
  ResponsiveDrawerContent,
  ResponsiveDrawerDescription,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
  ResponsiveDrawerTrigger,
} from "@/components/ResponsiveDrawer";
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
    .with("tickets", () => {
      // TODO change condition (!==)
      if (typeof props.eventMetadata.tickets?.href === "string") {
        const { onClick: _, ...buttonPropsWithoutOnClick } = buttonProps;
        return (
          <ResponsiveDrawer>
            <ResponsiveDrawerTrigger asChild>
              <Button {...buttonPropsWithoutOnClick}>
                Get Your Ticket
                <MdArrowForward className="transition group-hover:translate-x-1" />
              </Button>
            </ResponsiveDrawerTrigger>
            <ResponsiveDrawerContent className="gap-0 p-0 max-md:pb-8 md:max-w-md">
              <ResponsiveDrawerHeader className="p-4">
                <ResponsiveDrawerTitle>
                  Get your ticket on...
                </ResponsiveDrawerTitle>
                <ResponsiveDrawerDescription>
                  We offer multiple ways to book your ticket
                </ResponsiveDrawerDescription>
              </ResponsiveDrawerHeader>
              <a
                href={props.eventMetadata.tickets?.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-3 border-t border-black p-4 transition hover:bg-black/20 xs:flex-row xs:items-center"
              >
                <div className="flex flex-col xs:flex-1">
                  <h4 className="font-heading text-base tracking-wide transition group-hover:text-primary">
                    lu.ma
                  </h4>
                  <p className="text-xs tracking-wide opacity-60">
                    Recommended for international payment
                  </p>
                </div>
                <Button variant="secondary" asChild>
                  <span>Book on lu.ma</span>
                </Button>
              </a>
              <a
                href={props.eventMetadata.tickets?.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col gap-3 border-t border-black p-4 transition hover:bg-black/20 xs:flex-row xs:items-center"
              >
                <div className="flex flex-col xs:flex-1">
                  <h4 className="font-heading text-base tracking-wide transition group-hover:text-primary">
                    Tunis/Events
                  </h4>
                  <p className="text-xs tracking-wide opacity-60">
                    Recommended for tunisians
                  </p>
                </div>
                <Button variant="secondary" asChild>
                  <span>Book on Tunis/Events</span>
                </Button>
              </a>
              <div className="flex flex-col gap-3 border-t border-black p-4 transition">
                <div className="flex flex-col xs:flex-1">
                  <h4 className="font-heading text-base tracking-wide">
                    Cash only?
                  </h4>
                  <p className="text-xs tracking-wide opacity-60">
                    Contact us by phone 0000000000
                  </p>
                </div>
              </div>
            </ResponsiveDrawerContent>
          </ResponsiveDrawer>
        );
      }
      return (
        <a
          {...buttonProps}
          href={props.eventMetadata.tickets?.href}
          target="_blank"
          rel="noreferrer"
        >
          Get Your Ticket
          <MdArrowForward className="transition group-hover:translate-x-1" />
        </a>
      );
    })
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
