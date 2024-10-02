import type { ReactNode } from "react";
import type { Event } from "@/content/events/events";
import type { Talk } from "@/content/talks/talks";
import type { Speaker } from "@/content/speakers/speaker";
import type { Sponsor } from "@/content/sponsors/sponsors";
import { cn, formatTime } from "@/lib/utils";
import { LocationBadge } from "@/components/location-badge";
import { BreakCard } from "@/components/break-card";
import { ConferenceCard } from "@/components/conference-card";
import { FavoritesContextProvider } from "@/context/FavoritesContext";

type EventProgramProps = {
  event: Event;
  talks: TalkStateProps[];
  speakers: SpeakerStateProps[];
  sponsors: SponsorStateProps[];
};

type TalkStateProps = {
  id: string;
  collection: string;
  body: string;
  slug: string;
  data: Talk;
};

type SponsorStateProps = {
  id: string;
  collection: string;
  body: string;
  slug: string;
  data: Sponsor;
};

type SpeakerStateProps = {
  id: string;
  collection: string;
  body: string;
  slug: string;
  data: Speaker;
};

function TimeAndDuration(props: {
  startTime?: Date | undefined;
  duration?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    props.startTime && (
      <div
        className={cn(
          "flex flex-row gap-2 text-sm text-gray-300",
          props.className,
        )}
      >
        <time dateTime={props.startTime.toISOString()}>
          {formatTime(props.startTime)}
        </time>
        {props.duration && (
          <p className="font-heading text-sm text-neutral-400">
            {props.duration} minutes
          </p>
        )}
        {props.children}
      </div>
    )
  );
}

export const EventProgram = (props: EventProgramProps) => {
  const schedules = [...props.event.schedule].sort(
    (a, b) => (a?.startTime?.valueOf() ?? 0) - (b?.startTime?.valueOf() ?? 0),
  );

  return (
    <div className="flex flex-col gap-8">
      <FavoritesContextProvider eventSlug={props.event}>
        {schedules.map((schedule) => {
          return (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <TimeAndDuration
                  startTime={schedule?.startTime}
                  duration={Number(schedule?.duration)}
                  className="flex flex-wrap font-heading text-sm"
                />
                <LocationBadge>{schedule.location}</LocationBadge>
              </div>
              <div>
                {(schedule.type === "conference" ||
                  schedule.type === "roundtable") && (
                  <ConferenceCard
                    schedule={schedule}
                    talks={props.talks}
                    speakers={props.speakers}
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
          );
        })}
      </FavoritesContextProvider>
    </div>
  );
};
