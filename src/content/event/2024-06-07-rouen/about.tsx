import { Event } from "@/content/collections";
import { formatDateTime } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import LeVillageByCA from "./le-village-by-ca.jpg";
import Link from "next/link";

export function About(
  props: Readonly<{ event: Omit<Event, "date"> & { date?: string } }>,
) {
  return (
    <div id="venue" className="relative bg-gray-900">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <Image
              className="absolute inset-0 h-full w-full bg-gray-950 object-cover object-left"
              src={LeVillageByCA}
              width={1000}
              height={500}
              alt=""
            />
          </div>
        </div>
        <div className="px-6 lg:contents">
          <div className="mx-auto flex max-w-2xl flex-col gap-8 pb-24 pt-16 sm:pb-32 sm:pt-20 lg:ml-8 lg:mr-0 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              When? Where?
            </h2>
            <div className=" flex max-w-xl flex-col gap-8 text-base leading-7 lg:max-w-none">
              <ul className=" space-y-8 text-gray-200">
                {props.event.location && (
                  <li className="flex gap-x-3">
                    <MapPin
                      className="mt-1 h-5 w-5 flex-none text-primary"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-primary">
                        {props.event.location.name},{" "}
                        {props.event.location.address}.
                      </strong>{" "}
                      Join us in that awesome location. Enjoy the Seine river
                      from the heart of Rouen.
                    </span>
                  </li>
                )}
                {props.event.date && (
                  <li className="flex gap-x-3">
                    <Calendar
                      className="mt-1 h-5 w-5 flex-none text-primary"
                      aria-hidden="true"
                    />
                    <span>
                      <time
                        dateTime={props.event.date}
                        className="font-semibold text-primary"
                      >
                        {formatDateTime(props.event.date)}.
                      </time>{" "}
                      Come enjoy the last spring days, entertaind with awesome
                      conferences.
                    </span>
                  </li>
                )}
              </ul>
              <p>
                The Rouen 2024 conference, set at Le Village By CA Vallée de
                Seine in Rouen, will bring together around 200 participants and
                a dozen speakers. This event is designed to facilitate the
                sharing of concrete experiences and practical know-how within
                Rouen’s diverse tech community, encompassing engineers and
                C-level professionals. The goal is to foster direct and relevant
                exchanges that enrich all attendees. We are also proud to offer
                conferences in multiple languages, catering to our international
                audience and enhancing the accessibility and inclusiveness of
                our discussions.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-heading text-lg font-semibold ">
                Practical information
              </h4>
              <div>
                <Link
                  href="/events/2024-06-07-rouen/weekend"
                  className="underline"
                >
                  Plan your weekend!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
