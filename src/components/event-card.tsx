import type { Event } from "@/content/events/events";
import { cn, formatTime } from "@/lib/utils";
import { MapPin } from "lucide-react";

type EventCardProps = {
  title: Event["title"];
  eventType: "conference" | "meetup";
  date?: Event["date"];
  endDate?: Event["date"];
  location?: Event["location"];
  image?: Event["image"];
};

export const EventCard = (props: EventCardProps) => {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-lg p-4 md:p-6",
        props.eventType === "conference"
          ? "bg-cover bg-center"
          : "border border-neutral-700 bg-neutral-900",
      )}
      style={{
        backgroundImage:
          props.eventType === "conference"
            ? `linear-gradient(270deg, rgba(0, 0, 0, 0) 39.76%, rgba(0, 0, 0, 0.8) 100%), url(${props.image?.src})`
            : "none",
      }}
    >
      {props.eventType === "conference" && (
        <div
          className="absolute inset-0 left-0 h-full w-full rounded-lg"
          style={{
            background:
              "linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 50%)",
            backdropFilter: "blur(10px)",
            maskImage: "linear-gradient(90deg, black 30%, transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row">
        {props.eventType === "conference" ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-4">
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                {props.date && (
                  <time dateTime={props.date.toISOString()}>
                    {formatTime(props.date)}
                  </time>
                )}
                {props.endDate && (
                  <time dateTime={props.endDate.toISOString()}>
                    - {formatTime(props.endDate)}
                  </time>
                )}
              </div>
            </div>
            <div className="flex flex-col font-heading text-base text-secondary">
              {props.title}
            </div>
            <div>
              {props.location && (
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <MapPin className="h-5 w-5 flex-none" aria-hidden="true" />
                  {props.location?.name}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-4">
              {props.date && (
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <time dateTime={props.date.toISOString()}>
                    {formatTime(props.date)}
                  </time>
                </div>
              )}
              {props.location && (
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <MapPin className="h-5 w-5 flex-none" aria-hidden="true" />
                  {props.location?.name}
                </div>
              )}
            </div>
            <div className="flex flex-col font-heading text-base text-secondary">
              {props.title}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
