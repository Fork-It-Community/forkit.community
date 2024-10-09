import type { Event } from "@/content/events/events";
import type { Meetup } from "@/content/meetups/meetups";
import { cn, formatTime } from "@/lib/utils";
import { MapPin } from "lucide-react";

type EventCardProps = {
  event: Event | Meetup;
};

export const EventCard = (props: EventCardProps) => {
  const eventType = "cfp" in props.event ? "event" : "meetup";

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-lg p-4 md:p-6",
        eventType === "event"
          ? "bg-cover bg-center"
          : "border border-neutral-700 bg-neutral-900",
      )}
      style={{
        backgroundImage:
          eventType === "event"
            ? `linear-gradient(270deg, rgba(0, 0, 0, 0) 39.76%, rgba(0, 0, 0, 0.8) 100%), url(${props.event.image?.src})`
            : "none",
      }}
    >
      {eventType === "event" && (
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
        {eventType === "event" ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-4">
              <div className="flex items-center gap-1 text-sm text-neutral-400">
                {props.event.date && (
                  <time dateTime={props.event.date.toISOString()}>
                    {formatTime(props.event.date)}
                  </time>
                )}
                {"cfp" in props.event && props.event.cfp?.endDate && (
                  <time dateTime={props.event.cfp.endDate.toISOString()}>
                    - {formatTime(props.event.cfp.endDate)}
                  </time>
                )}
              </div>
            </div>
            <div className="flex flex-col font-heading text-base font-medium text-secondary">
              {props.event.title}
            </div>
            <div>
              {props.event.location && (
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <MapPin className="h-5 w-5 flex-none" aria-hidden="true" />
                  {props.event.location?.name}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-4">
              {props.event.date && (
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <time dateTime={props.event.date.toISOString()}>
                    {formatTime(props.event.date)}
                  </time>
                </div>
              )}
              {props.event.location && (
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <MapPin className="h-5 w-5 flex-none" aria-hidden="true" />
                  {props.event.location?.name}
                </div>
              )}
            </div>
            <p className="flex flex-col font-heading text-base font-medium text-secondary">
              {props.event.title}
            </p>
          </div>
        )}
      </div>
    </article>
  );
};
