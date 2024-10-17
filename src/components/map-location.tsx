import type { EventsSubPages } from "@/content/eventsSubPages/eventsSubPages";
import { cn } from "@/lib/utils";

const MapLocation = (
  props: Readonly<{
    eventsSubPages: EventsSubPages;
    mapUri: string;
    className?: string;
  }>,
) => {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex flex-col">
        <p className="my-0">{props.eventsSubPages.title}</p>
        {props.eventsSubPages.description && (
          <p className="my-0 text-neutral-400">
            {props.eventsSubPages.description}
          </p>
        )}
      </div>
      <Map mapUri={props.mapUri} className={String(props.className)} />
    </div>
  );
};

const Map = (
  props: Readonly<{
    mapUri: string;
    className?: string;
  }>,
) => {
  return (
    <iframe
      src={props.mapUri}
      style={{ border: "1px solid black" }}
      className={cn("h-43 w-full rounded-lg", props.className)}
    />
  );
};

export { MapLocation, Map };
