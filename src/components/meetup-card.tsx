import { Button } from "@/components/ui/button";
import { Meetup } from "@/content/collections";
import { formatDateTime } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

type MeetupCardProps = { meetup: Meetup };

export const MeetupCard = (props: MeetupCardProps) => {
  return (
    <article className="flex flex-col rounded-lg border-2 border-gray-700 bg-gray-900 p-6 md:p-8">
      <div className="flex flex-col justify-between gap-6 sm:flex-row">
        <div className="flex flex-col gap-6">
          <h3 className="flex flex-col font-heading text-3xl text-primary">
            {props.meetup.title}
          </h3>
          <div className="flex flex-col gap-4">
            {props.meetup.date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 flex-none" aria-hidden="true" />
                <time dateTime={props.meetup.date.toISOString()}>
                  {formatDateTime(props.meetup.date)}
                </time>
              </div>
            )}
            {props.meetup.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 flex-none" aria-hidden="true" />
                {props.meetup.location?.name}
              </div>
            )}
          </div>
          <div className="flex flex-row gap-4">
            <Button asChild>
              <span>Learn more</span>
            </Button>
          </div>
        </div>

        {props.meetup.image && (
          <div className="logo-mask my-auto sm:min-w-48">
            <Image
              priority
              className="aspect-[3/2] h-[200px] w-[300px] bg-primary object-cover text-gray-900"
              src={props.meetup.image?.src ?? ""}
              width={300}
              height={300}
              alt={props.meetup.image?.alt}
            />
          </div>
        )}
      </div>
    </article>
  );
};
