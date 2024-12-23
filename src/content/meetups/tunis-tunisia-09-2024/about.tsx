import type { Meetup } from "@/content/meetups/meetups";
import { formatDateTime } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import LocationImage from "/public/meetups/tunis-tunisia-09-2024.jpg";
import { Button } from "@/oldcomponents/ui/button";

export function About(
  props: Readonly<{
    meetup: Omit<Meetup, "date"> & { date?: string };
  }>,
) {
  return (
    <div id="venue" className="relative bg-gray-900">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="flex-col lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <img
              className="absolute inset-0 h-full w-full bg-gray-950 object-cover object-left"
              src={LocationImage.src}
              width={1000}
              height={500}
              alt=""
            />
          </div>
          <p className="py-4 text-center text-sm">@ghaziihammami</p>
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
                      Join us in Comwork&apos;s offices to share experiences and
                      network.
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
                      Come enjoy two conferences and a networking cocktail to
                      wrap up September on a high note.
                    </span>
                  </li>
                )}
              </ul>
              <p>
                Comwork is a service company specialized in application
                development and consulting for cloud deployment automation / SRE
                / DevOps and production infrastructure outsourcing, and
                publisher of software solutions to accelerate the automation of
                these deployments in a host-agnostic way.
              </p>
              <Button variant="default" asChild className="w-fit">
                <a href="https://www.comwork.io" target="_blank">
                  Visit Comwork website
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
