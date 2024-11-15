"use client";
import { cn, formatDateTime } from "@/lib/utils";
import Link from "next/link";
import useMeasure from "react-use-measure";
import { Event, Meetup } from "@/content/collections";

export function Banner(
  props: Readonly<{
    nextEvent: Event;
  }>,
) {
  const [ref, { height }] = useMeasure();
  return (
    <>
      <Link href={`/events/${props.nextEvent.metadata.slug}`}>
        <div
          ref={ref}
          className={cn(
            "fixed z-10 w-full gap-x-6 px-6 py-2.5 sm:px-3.5 sm:before:flex-1",
            !props.nextEvent.tickets && "bg-gray-950 text-white",
            !!props.nextEvent.tickets && "bg-primary text-gray-950",
          )}
        >
          <p className="text-sm leading-6">
            {props.nextEvent.tickets && (
              <>
                <span role="img" aria-label="ticket">
                  🎟️
                </span>{" "}
                Tickets available:{" "}
              </>
            )}
            <strong className="font-semibold">{props.nextEvent.name}</strong>
            <svg
              viewBox="0 0 2 2"
              className="fill-current mx-2 inline h-0.5 w-0.5"
              aria-hidden="true"
            >
              <circle cx={1} cy={1} r={1} />
            </svg>
            {!props.nextEvent?.date && (
              <>Learn more about the event on the dedicated page</>
            )}
            {props.nextEvent?.date && (
              <>
                Join us in {formatDateTime(props.nextEvent?.date)} to enjoy a
                day of real experiences&nbsp;
                <span aria-hidden="true">&rarr;</span>
              </>
            )}
          </p>
        </div>
      </Link>
      <div style={{ height: height + "px" }} />
    </>
  );
}
export function CanceledBanner(
  props: Readonly<{
    cancelledEvent: Event | Meetup;
  }>,
) {
  const [ref, { height }] = useMeasure();
  return (
    <>
      <a href="https://linktr.ee/forkit.community" target="_blank">
        <div
          ref={ref}
          className={cn(
            "fixed z-10 w-full gap-x-6 px-6 py-2.5 sm:px-3.5 sm:before:flex-1",
            "bg-gray-950 text-white",
            "bg-primary text-gray-950",
          )}
        >
          <p className="text-sm leading-6">
            <strong className="font-semibold">
              {props.cancelledEvent.name} is cancelled
            </strong>
            <svg
              viewBox="0 0 2 2"
              className="fill-current mx-2 inline h-0.5 w-0.5"
              aria-hidden="true"
            >
              <circle cx={1} cy={1} r={1} />
            </svg>

            <>
              We’ll be back in next year! Follow Fork It! on social media for
              updates and announcements on our future events.
            </>

            <span aria-hidden="true">&rarr;</span>
          </p>
        </div>
      </a>
      <div style={{ height: height + "px" }} />
    </>
  );
}
