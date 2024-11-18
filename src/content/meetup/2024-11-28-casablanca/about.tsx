import { MeetupFrontmatter } from "@/content/collections";
import { formatDateTime } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import LocationImage from "/public/meetups/2024-11-28-casablanca.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function About(
  props: Readonly<{
    meetup: Omit<MeetupFrontmatter, "date"> & { date?: string };
  }>,
) {
  return (
    <div id="venue" className="relative bg-gray-900">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="flex-col lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <Image
              className="absolute inset-0 h-full w-full bg-gray-950 object-cover object-left"
              src={LocationImage}
              width={1000}
              height={500}
              alt="Docaposte Maroc"
            />
          </div>
          <p className="py-4 text-center text-sm">@mougrapher</p>
        </div>
        <div className="px-6 lg:contents">
          <div className="mx-auto flex max-w-2xl flex-col gap-8 pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              When? Where?
            </h2>
            <div className="flex max-w-xl flex-col gap-8 text-base leading-7 lg:max-w-none">
              <ul className="space-y-8 text-gray-200">
                {props.meetup.location && (
                  <li className="flex gap-x-3">
                    <MapPin
                      className="mt-1 h-5 w-5 flex-none text-primary"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-primary">
                        {props.meetup.location.name},{" "}
                        {props.meetup.location.address}.
                      </strong>{" "}
                      Join us.
                    </span>
                  </li>
                )}
                {props.meetup.date && (
                  <li className="flex gap-x-3">
                    <Calendar
                      className="mt-1 h-5 w-5 flex-none text-primary"
                      aria-hidden="true"
                    />
                    <span>
                      <time
                        dateTime={props.meetup.date}
                        className="font-semibold text-primary"
                      >
                        {formatDateTime(props.meetup.date)}.
                      </time>{" "}
                      Come enjoy conferences and a networking cocktail.
                    </span>
                  </li>
                )}
              </ul>
              {props.meetup.tickets?.href && (
                <Button variant="default" asChild className="w-fit">
                  <Link href={props.meetup.tickets?.href} target="_blank">
                    {props.meetup.isFree ? "Register for free" : "Get tickets"}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
