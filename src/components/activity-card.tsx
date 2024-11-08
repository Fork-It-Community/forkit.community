import type { Event } from "@/content/events/events";
import type { Meetup } from "@/content/meetups/meetups";
import { formatTime } from "@/lib/utils";
import { MapPin } from "lucide-react";

const EventCard = (props: Readonly<{ activity: Event }>) => {
  const event = props.activity;

  return (
    <article
      className="relative flex flex-col rounded-lg bg-cover bg-center p-4 md:p-6"
      style={{
        backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0) 39.76%, rgba(0, 0, 0, 0.8) 100%), url(${event.image?.src})`,
      }}
    >
      <div
        className="absolute inset-0 left-0 h-full w-full rounded-lg"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 50%)",
          backdropFilter: "blur(10px)",
          maskImage: "linear-gradient(90deg, black 30%, transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            <div className="flex items-center gap-1 text-sm text-neutral-400">
              {event.date && (
                <time dateTime={event.date.toISOString()}>
                  {formatTime(event.date)}
                </time>
              )}
              {/* TODO : update when we have event.endDate */}
              {/* {event.cfp?.endDate && (
                  <time dateTime={event.cfp.endDate.toISOString()}>
                    - {formatTime(event.cfp.endDate)}
                  </time>
                )} */}
            </div>
          </div>
          <div className="flex flex-col font-heading text-base font-medium text-secondary">
            {event.title}
          </div>
          <div>
            {event.location && (
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <MapPin className="h-5 w-5 flex-none" aria-hidden="true" />
                {event.location?.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

const MeetupCard = (props: Readonly<{ activity: Meetup }>) => {
  const meetup = props.activity;

  return (
    <article
      className="relative flex flex-col rounded-lg border border-neutral-700 bg-neutral-900 p-4 md:p-6"
      style={{
        backgroundImage: "none",
      }}
    >
      <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            {meetup.startDate && (
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <time dateTime={meetup.startDate.toISOString()}>
                  {formatTime(meetup.startDate)}
                </time>
              </div>
            )}
            {meetup.location && (
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <MapPin className="h-5 w-5 flex-none" aria-hidden="true" />
                {meetup.location?.name}
              </div>
            )}
          </div>
          <p className="flex flex-col font-heading text-base font-medium text-secondary">
            {meetup.title}
          </p>
        </div>
      </div>
    </article>
  );
};

export { EventCard, MeetupCard };
