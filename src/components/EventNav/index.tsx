import { Logo } from "@/components/Logo";
import { useWindowScroll, useWindowSize } from "@uidotdev/usehooks";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdArrowForward, MdArrowOutward, MdMenu } from "react-icons/md";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

import type { Event } from "@/schemas/events";

export const EventNav = (props: {
  eventName: ReactNode;
  eventId: string;
  eventMetadata: Pick<
    Event,
    "cfp" | "tickets" | "date" | "status" | "prospectus"
  >;
  items: Array<{ href: string; label: ReactNode }>;
  shouldShowTicketsButton: boolean;
  shouldShowCFPButton: boolean;
  shouldShowProspectusButton: boolean;
}) => {
  const [{ y }] = useWindowScroll();
  const { height } = useWindowSize();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`bg-background-blur fixed left-0 right-0 top-0 z-30 flex h-14 transition-transform duration-500 ${height && (y ?? 0) >= height * 0.7 ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      style={{
        right: "var(--removed-body-scroll-bar-size, 0)",
      }}
    >
      <div className="max-w-(--breakpoint-lg) mx-auto flex w-full justify-between">
        <a
          href={`/events/${props.eventId}#`}
          className="group flex flex-col justify-center gap-1 px-6"
        >
          <Logo className="w-28" />
          <span className="font-heading text-2xs line-clamp-1 font-medium uppercase leading-tight tracking-wide opacity-60 group-hover:opacity-100">
            {props.eventName}
          </span>
        </a>

        <div className="flex items-center gap-1">
          {props.shouldShowTicketsButton && (
            <Button size="xs" asChild>
              <a
                href={props.eventMetadata.tickets?.href}
                className="max-xs:hidden group gap-2"
              >
                Get Your Ticket
              </a>
            </Button>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="self-stretch px-6 opacity-60 hover:opacity-100"
                aria-label="Open menu"
              >
                <MdMenu className="text-2xl" />
              </button>
            </SheetTrigger>
            <SheetContent className="flex flex-col p-0">
              <SheetHeader>
                <SheetTitle className="sr-only">
                  {props.eventName} navigation
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Quick access to the {props.eventName} content
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-1 flex-col">
                <a
                  href={`/events/${props.eventId}#`}
                  onClick={() => setOpen(false)}
                  className="group flex flex-col justify-center gap-1 px-6 py-4"
                >
                  <Logo className="w-28" />
                  <span className="font-heading text-2xs line-clamp-1 font-medium uppercase leading-tight tracking-wide opacity-60 group-hover:opacity-100">
                    {props.eventName}
                  </span>
                </a>
                <div className="relative flex-1">
                  <div className="absolute inset-0 overflow-auto">
                    {props.items.map((item, index) => (
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-6 py-3 tracking-wide opacity-80 transition hover:bg-black/20 hover:opacity-100"
                        key={index}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-20 w-full bg-white opacity-15 blur-3xl" />
                <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 p-6 pb-8">
                  {props.shouldShowTicketsButton && (
                    <Button asChild size="lg">
                      <a
                        href={props.eventMetadata.tickets?.href}
                        className="group flex-1 gap-2"
                        onClick={() => setOpen(false)}
                      >
                        Get Your Ticket
                        <MdArrowForward className="transition group-hover:translate-x-1" />
                      </a>
                    </Button>
                  )}
                  {props.shouldShowCFPButton &&
                    props.eventMetadata.cfp?.href && (
                      <Button asChild size="lg" variant="secondary">
                        <a
                          href={props.eventMetadata.cfp.href}
                          className="flex-1"
                          onClick={() => setOpen(false)}
                        >
                          Call for Paper
                        </a>
                      </Button>
                    )}
                  {props.shouldShowProspectusButton &&
                    props.eventMetadata.prospectus?.href && (
                      <Button asChild size="lg" variant="secondary">
                        <a
                          href={props.eventMetadata.prospectus.href}
                          className="flex-1"
                          onClick={() => setOpen(false)}
                        >
                          Become a Sponsor
                        </a>
                      </Button>
                    )}

                  <Button asChild size="lg" variant="secondary">
                    <a
                      href="/"
                      className="group flex w-full gap-2"
                      onClick={() => setOpen(false)}
                    >
                      Community Hub
                      <MdArrowOutward className="text-lg transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
