import collections from "@/content/collections";
import { cn, formatDateTime } from "@/lib/utils";
import Link from "next/link";

export async function Banner() {
  const nextEvent = (await collections.event.getAll())
    .sort(
      (event1, event2) =>
        (event1.date?.valueOf() ?? 0) - (event2.date?.valueOf() ?? 0),
    )
    .find(
      (event) =>
        event.published &&
        event.date &&
        event.date.valueOf() > new Date().valueOf(),
    );

  if (!nextEvent) {
    return null;
  }

  return (
    <div
      className={cn(
        "gap-x-6 px-6 py-2.5 sm:px-3.5 sm:before:flex-1",
        !nextEvent?.tickets && "bg-gray-950 text-white",
        !!nextEvent?.tickets && "bg-primary text-gray-950",
      )}
    >
      <p className="text-sm leading-6">
        <Link href={`/events/${nextEvent?.metadata.slug}`}>
          {nextEvent?.tickets && (
            <>
              <span role="img" aria-label="ticket">
                🎟️
              </span>{" "}
              Tickets available:{" "}
            </>
          )}
          <strong className="font-semibold">{nextEvent?.name}</strong>
          <svg
            viewBox="0 0 2 2"
            className="fill-current mx-2 inline h-0.5 w-0.5"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          {!nextEvent?.date && (
            <>Learn more about the event on the dedicated page</>
          )}
          {nextEvent?.date && (
            <>
              Join us in {formatDateTime(nextEvent?.date)} to enjoy a day of
              real experiences&nbsp;
              <span aria-hidden="true">&rarr;</span>
            </>
          )}
        </Link>
      </p>
    </div>
  );
}
