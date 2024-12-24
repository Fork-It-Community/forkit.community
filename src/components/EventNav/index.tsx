import { Logo } from "@/components/Logo/Logo";
import type { CollectionEntry } from "astro:content";
import { useWindowScroll, useWindowSize } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";

export const EventNav = (props: { event: CollectionEntry<"events"> }) => {
  const [{ y }] = useWindowScroll();
  const { height } = useWindowSize();
  return (
    <div
      className={cn(
        "bg-background-blur fixed left-0 right-0 top-0 z-30 flex h-14 -translate-y-full transition-transform duration-500",
        height && (y ?? 0) >= height * 0.9 && "translate-y-0",
      )}
    >
      <div className="mx-auto flex w-full max-w-screen-lg">
        <a
          href={`/events/${props.event.id}`}
          className="group flex flex-col justify-center gap-1 px-4"
        >
          <Logo className="w-28" />
          <span className="font-heading text-xs font-medium uppercase leading-tight opacity-60 group-hover:opacity-100">
            {props.event.data.name}
          </span>
        </a>
      </div>
    </div>
  );
};
