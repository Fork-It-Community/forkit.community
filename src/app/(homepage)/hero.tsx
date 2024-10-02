import { Button } from "@/components/ui/button";
import Image from "next/image";
import ImgForkItLogo from "@/../public/forkit-medium.svg";
import HeroImage from "./hero.jpg";
import { ExternalLink, MailIcon } from "lucide-react";
import { formatDateTime, getHref } from "@/lib/utils";
import Link from "next/link";
import { getNextEvent, getNextMeetup } from "@/lib/server";
import { NEWSLETTER_HREF } from "@/lib/constants";

export async function Hero() {
  const nextEvent = await getNextEvent();
  const nextMeetup = await getNextMeetup();

  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-12 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <Image className="w-40" src={ImgForkItLogo} alt="Fork it!" />

            <h1 className="mt-20 text-balance font-heading text-4xl font-medium uppercase sm:mt-10 sm:text-6xl">
              Global
              <br /> Developer
              <br /> Conferences
            </h1>
            <p className="mt-4 max-w-[40ch] text-balance text-lg text-gray-400">
              <strong className="font-medium text-white">
                Fork it! Community
              </strong>
              ’s mission is to share computer science knowledge through
              worldwide events.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <a href={getHref(nextMeetup, nextEvent)}>
                  {nextEvent || nextMeetup ? "Next events" : "Past events"}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto"
              >
                <a href={NEWSLETTER_HREF} target="_blank">
                  <MailIcon size="1em" className="mr-2" />
                  Keep in touch
                </a>
              </Button>
            </div>
            {nextEvent?.tickets && (
              <div className="pt-12">
                <div className="relative max-w-lg rounded-xl border-2 border-gray-800 p-5">
                  <h2 className="font-heading text-3xl uppercase tracking-tight text-primary sm:text-4xl">
                    {nextEvent.title}
                  </h2>
                  <small className="text-lg">Tickets available</small>
                  <p className="mx-auto mt-6 max-w-xl text-lg">
                    {nextEvent?.date ? (
                      <>
                        <span role="img" aria-label="ticket">
                          🎟️
                        </span>{" "}
                        Get your tickets for the {nextEvent.name} conference{" "}
                        {formatDateTime(nextEvent?.date)}!
                      </>
                    ) : (
                      <>
                        <span role="img" aria-label="ticket">
                          🎟️
                        </span>{" "}
                        Get your tickets for the {nextEvent.name} conference!
                      </>
                    )}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <Button asChild size="sm">
                      <Link
                        href={`/events/${nextEvent.metadata.slug}`}
                        title="Homepage of the event"
                      >
                        Learn more
                      </Link>
                    </Button>
                    <Button variant={"link"} className="text-white">
                      <a
                        href={nextEvent.tickets.href}
                        target="_blank"
                        rel="noreferer"
                      >
                        Get tickets
                      </a>
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="logo-mask relative m-auto lg:absolute lg:inset-0 lg:left-1/2 lg:mr-0">
          <Image
            priority
            className="aspect-[3/2] w-full bg-primary object-cover text-gray-900 lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            src={HeroImage}
            alt="Speaker giving a tech talk in from of attendees"
            sizes="(max-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </div>
  );
}
