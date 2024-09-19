import { Button } from "@/components/ui/button";
import { Event } from "@/content/collections";
import { cn, formatDateTime } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

type EventCardProps = { event: Event; className?: string };

export const EventCard = ({ className, ...props }: EventCardProps) => {
  return (
    <article
      className={cn(
        "flex flex-col rounded-lg border-2 border-gray-700 bg-gray-900 p-6 md:p-8",
        className,
      )}
    >
      <div className="flex flex-col justify-between gap-6 sm:flex-row">
        <div className="flex flex-col gap-6">
          <h3 className="flex flex-col font-heading text-3xl text-primary">
            {props.event.title}
          </h3>
          <div className="flex flex-col gap-4">
            {props.event.date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 flex-none" aria-hidden="true" />
                <time dateTime={props.event.date.toISOString()}>
                  {formatDateTime(props.event.date)}
                </time>
              </div>
            )}
            {props.event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 flex-none" aria-hidden="true" />
                {props.event.location?.name}
              </div>
            )}
          </div>
          <div className="flex flex-row gap-4">
            <Button asChild>
              <span>Learn more</span>
            </Button>
          </div>
        </div>

        {props.event.image && (
          <div className="logo-mask my-auto sm:min-w-48">
            <Image
              priority
              className="aspect-[3/2] h-[200px] w-[300px] bg-primary object-cover text-gray-900"
              src={props.event.image?.src ?? ""}
              width={300}
              height={300}
              alt={props.event.image?.alt}
            />
          </div>
        )}
      </div>
    </article>
  );
};
