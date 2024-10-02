import { Button } from "@/components/ui/button";
import { Meetup } from "@/content/collections";
import { formatDateTime, shouldDisplayTicketButton } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const MAX_PRIMARY_BUTTONS = 2;

const buttonSecondaryClassName = "-mx-4";

export function Hero(
  props: Readonly<{
    meetup: Meetup;
  }>,
) {
  const isTicketsActive = !!props.meetup.tickets?.href;

  const date = props.meetup.date
    ? formatDateTime(props.meetup.date)
    : undefined;
  return (
    <div className="relative isolate overflow-hidden">
      {props.meetup.image && (
        <Image
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-5"
          src={props.meetup.image?.src ?? ""}
          width={1000}
          height={1000}
          alt={props.meetup.image?.alt}
        />
      )}

      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary-foreground opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10">
            Conference sharing real feedbacks for real people
          </div>
        </div>
        <div className="mx-8 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-6xl">
            <span className="text-primary">{date}</span> {props.meetup.name}
          </h1>
          <p className="text-md mt-6 text-gray-400">{props.meetup.excerpt}</p>
          <div className="mx-8 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            {shouldDisplayTicketButton(props.meetup) && (
              <div className="flex flex-col items-center gap-y-8">
                <Button asChild variant="default">
                  <a
                    href={props.meetup.tickets?.href}
                    target="_blank"
                    rel="noreferer"
                  >
                    {props.meetup.isFree ? "Register for free" : "Get tickets"}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                {props.meetup.partnerOrganizerLogo && (
                  <Image
                    src={props.meetup.partnerOrganizerLogo}
                    alt="French tech malaysia"
                    width={100}
                    height={100}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-primary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
