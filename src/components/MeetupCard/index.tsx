import { formatTime } from "@/lib/utils";
import type { Event } from "@/schemas/events";
import { LuMapPin } from "react-icons/lu";

export const MeetupCard = (props: Readonly<{ event: Event }>) => {
  return (
    <article
      className="border-neutral-700 bg-neutral-900 relative flex flex-col rounded-lg border p-4 md:p-6"
      style={{
        backgroundImage: "none",
      }}
    >
      <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            {props.event.date && (
              <div className="text-neutral-400 flex items-center gap-2 text-sm">
                <time dateTime={props.event.date.toISOString()}>
                  {formatTime(props.event.date)}
                </time>
              </div>
            )}
            {props.event.location && (
              <div className="text-neutral-400 flex items-center gap-2 text-sm">
                <LuMapPin className="h-5 w-5 flex-none" aria-hidden="true" />
                {props.event.location?.name}
              </div>
            )}
          </div>
          <p className="flex flex-col font-heading text-base font-medium text-secondary">
            {props.event.name}
          </p>
        </div>
      </div>
    </article>
  );
};
