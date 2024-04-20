"use client";
import { cn, formatDateTime } from "@/lib/utils";
import Link from "next/link";
import useMeasure from "react-use-measure";
import { Event } from "@/content/collections";

export function Banner(
  props: Readonly<{
    nextEvent: Event;
  }>,
) {
  const [ref, { height }] = useMeasure();
  return (
    <>
      <div
        ref={ref}
        className={cn(
          "fixed z-10 w-full gap-x-6 px-6 py-2.5 sm:px-3.5 sm:before:flex-1",
          !props.nextEvent.tickets && "bg-gray-950 text-white",
          !!props.nextEvent.tickets && "bg-primary text-gray-950",
        )}
      >
        <p className="text-sm leading-6">
          <Link href={`/events/${props.nextEvent.metadata.slug}`}>
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
          </Link>
        </p>
      </div>
      <div style={{ height: height + "px" }} />
    </>
  );
}
