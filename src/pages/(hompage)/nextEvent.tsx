import { Button } from "@/components/ui/button";
import type { Event } from "@/content/events/events";
import { formatDateTimeShort } from "@/lib/utils";

export const NextEvent = (
  props: Readonly<{
    event: Event;
  }>,
) => {
  return (
    <div className="flex flex-col px-4">
      {/* Todo : add tag */}
      {props.event.date && (
        <p className="my-0 font-heading text-3xl font-medium text-white">
          {formatDateTimeShort(props.event.date)}
        </p>
      )}
      <p className="my-0 font-heading text-2xl font-medium text-white">
        {props.event.name}
      </p>
      <div className="mt-6 flex items-center">
        <Button>
          <a
            href={props.event.tickets?.href}
            target="_blank"
            className="text-black no-underline"
          >
            Tickets Available
          </a>
        </Button>
      </div>
    </div>
  );
};
