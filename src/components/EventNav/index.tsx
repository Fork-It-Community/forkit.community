import { Logo } from "@/components/Logo/Logo";
import { useWindowScroll, useWindowSize } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdMenu } from "react-icons/md";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LuArrowUpRight } from "react-icons/lu";

export const EventNav = (props: {
  eventName: ReactNode;
  eventId: string;
  items: Array<{ href: string; label: ReactNode }>;
}) => {
  const [{ y }] = useWindowScroll();
  const { height } = useWindowSize();
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "bg-background-blur fixed left-0 right-0 top-0 z-30 flex h-14 -translate-y-full transition-transform duration-500",
        height && (y ?? 0) >= height * 0.7 && "translate-y-0",
      )}
      style={{
        right: "var(--removed-body-scroll-bar-size, 0)",
      }}
    >
      <div className="mx-auto flex w-full max-w-screen-lg justify-between">
        <a
          href={`/events/${props.eventId}#`}
          className="group flex flex-col justify-center gap-1 px-6"
        >
          <Logo className="w-28" />
          <span className="line-clamp-1 font-heading text-2xs font-medium uppercase leading-tight tracking-wide opacity-60 group-hover:opacity-100">
            {props.eventName}
          </span>
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="px-6 opacity-60 hover:opacity-100">
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
                <span className="line-clamp-1 font-heading text-2xs font-medium uppercase leading-tight tracking-wide opacity-60 group-hover:opacity-100">
                  {props.eventName}
                </span>
              </a>
              <div className="relative flex-1">
                <div className="absolute inset-0 overflow-auto">
                  {props.items.map((item) => (
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-6 py-3 tracking-wide opacity-80 transition hover:bg-black/20 hover:opacity-100"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-20 w-full bg-white opacity-15 blur-3xl" />
              <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 p-6">
                <Button asChild size="sm">
                  <a
                    href="#"
                    className="flex-[2]"
                    onClick={() => setOpen(false)}
                  >
                    Get Your Ticket
                  </a>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <a href="#" className="flex-1" onClick={() => setOpen(false)}>
                    CFP
                  </a>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <a
                    href="/"
                    className="flex w-full gap-1"
                    onClick={() => setOpen(false)}
                  >
                    Explore The Community
                    <LuArrowUpRight className="text-lg" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
