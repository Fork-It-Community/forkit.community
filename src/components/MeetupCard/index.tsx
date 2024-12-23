import type { Meetup } from "@/content/meetups/meetups";
import { formatTime } from "@/lib/utils";
import { LuMapPin } from "react-icons/lu";

export const MeetupCard = (props: Readonly<{ activity: Meetup }>) => {
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
            {meetup.date && (
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <time dateTime={meetup.date.toISOString()}>
                  {formatTime(meetup.date)}
                </time>
              </div>
            )}
            {meetup.location && (
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <LuMapPin className="h-5 w-5 flex-none" aria-hidden="true" />
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
