import { formatTime } from "@/lib/utils";
import type { Event } from "@/schemas/events";
import { LuMapPin } from "react-icons/lu";

export const MeetupCard = (props: Readonly<{ event: Event }>) => {
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
            {props.event.date && (
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <time dateTime={props.event.date.toISOString()}>
                  {formatTime(props.event.date)}
                </time>
              </div>
            )}
            {props.event.location && (
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <LuMapPin className="h-5 w-5 flex-none" aria-hidden="true" />
                {props.event.location?.name}
              </div>
            )}
          </div>
          <p className="font-heading text-secondary flex flex-col text-base font-medium">
            {props.event.name}
          </p>
        </div>
      </div>
    </article>
  );
};
