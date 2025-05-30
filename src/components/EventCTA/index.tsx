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
import { MdArrowOutward } from "react-icons/md";
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
      if (!props.eventMetadata.tickets?.link) return null;

      if (typeof props.eventMetadata.tickets.link !== "string") {
        const { onClick: _, ...buttonPropsWithoutOnClick } = buttonProps;
        return (
          <ResponsiveDrawer>
            <ResponsiveDrawerTrigger asChild>
              <Button {...buttonPropsWithoutOnClick}>
                Get Your Ticket
                <MdArrowOutward className="transition group-hover:translate-x-1" />
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
              {props.eventMetadata.tickets.link.map((ticket, index) => {
                if (ticket.href) {
                  return (
                    <a
                      href={ticket.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col gap-3 border-t border-black p-4 transition hover:bg-black/20 xs:flex-row xs:items-center"
                      key={ticket.href}
                    >
                      <div className="flex flex-col xs:flex-1">
                        {ticket.title && (
                          <h4 className="font-heading text-base tracking-wide transition group-hover:text-primary">
                            {ticket.title}
                          </h4>
                        )}
                        {ticket.description && (
                          <p className="text-xs tracking-wide opacity-60">
                            {ticket.description}
                          </p>
                        )}
                      </div>
                      {ticket.title && (
                        <Button
                          variant={index === 0 ? "default" : "secondary"}
                          asChild
                        >
                          <span>Book on {ticket.title}</span>
                        </Button>
                      )}
                    </a>
                  );
                }

                return (
                  <div
                    key={ticket.title}
                    className="flex flex-col gap-3 border-t border-black p-4 transition"
                  >
                    <div className="flex flex-col xs:flex-1">
                      <h4 className="font-heading text-base tracking-wide">
                        {ticket.title}
                      </h4>
                      {!!ticket.description && (
                        <p className="text-xs tracking-wide opacity-60">
                          {ticket.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </ResponsiveDrawerContent>
          </ResponsiveDrawer>
        );
      }

      return (
        <a
          {...buttonProps}
          href={props.eventMetadata.tickets?.link}
          target="_blank"
          rel="noreferrer"
        >
          Get Your Ticket
          <MdArrowOutward className="transition group-hover:translate-x-1" />
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
    .with("tickets-soon", () => {
      return (
        <a
          {...buttonProps}
          onClick={() => {
            const element = document.getElementById("stay-tuned");
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }}
        >
          Get Your Ticket
          <MdArrowOutward className="transition group-hover:translate-x-1" />
        </a>
      );
    })
    .exhaustive();
};
