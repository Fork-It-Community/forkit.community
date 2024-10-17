import type { ReactNode } from "react";
import type { CollectionEntry } from "astro:content";
import type { Event } from "@/content/events/events";
import { cn, formatTime } from "@/lib/utils";
import { LocationBadge } from "@/components/location-badge";
import { BreakCard } from "@/components/break-card";
import { ConferenceCard } from "@/components/conference-card";
import { FavoritesContextProvider } from "@/context/FavoritesContext";

type EventProgramProps = {
  event: Event;
  talks: CollectionEntry<"talks">[];
  people: CollectionEntry<"people">[];
  sponsors: CollectionEntry<"sponsors">[];
};

function TimeAndDuration(props: {
  type: Event["schedule"][number]["type"];
  startTime: Date;
  duration?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-row gap-2 text-sm text-gray-300",
        props.className,
      )}
    >
      <time dateTime={`${props.startTime}`}>{formatTime(props.startTime)}</time>
      {props.type === "roundtable" ? (
        <p className="font-heading text-sm text-neutral-400">Roundtable</p>
      ) : (
        <p className="font-heading text-sm text-neutral-400">
          {props.duration} minutes
        </p>
      )}
      {props.children}
    </div>
  );
}

export const EventProgram = (props: EventProgramProps) => {
  const schedules = [...props.event.schedule].sort(
    (a, b) => (a?.startTime?.valueOf() ?? 0) - (b?.startTime?.valueOf() ?? 0),
  );

  return (
    <div className="flex flex-col gap-8">
      <FavoritesContextProvider eventSlug={props.event}>
        {schedules.map((schedule) => (
          <div
            className="flex flex-col gap-4"
            key={schedule.slug || schedule.name}
          >
            <div className="flex flex-row justify-between">
              {schedule.startTime && (
                <TimeAndDuration
                  type={schedule.type}
                  startTime={schedule.startTime}
                  duration={Number(schedule.duration)}
                  className="flex flex-wrap font-heading text-sm"
                />
              )}
              <LocationBadge>{schedule.location}</LocationBadge>
            </div>
            <div>
              {(schedule.type === "conference" ||
                schedule.type === "roundtable") && (
                <ConferenceCard
                  schedule={schedule}
                  talks={props.talks}
                  people={props.people}
                  key={schedule.slug}
                />
              )}
              {schedule.type === "break" && (
                <BreakCard
                  schedule={schedule}
                  sponsors={props.sponsors}
                  key={schedule.slug}
                />
              )}
            </div>
          </div>
        ))}
      </FavoritesContextProvider>
    </div>
  );
};
