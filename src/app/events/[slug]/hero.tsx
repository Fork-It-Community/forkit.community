import { Button } from "@/components/ui/button";
import { Event } from "@/content/collections";
import { formatDateTime, shouldDisplayTicketButton } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const MAX_PRIMARY_BUTTONS = 2;
const buttonPrimaryClassName = "w-full min-w-[20ch] sm:w-auto";
const buttonSecondaryClassName = "-mx-4";
export function Hero(
  props: Readonly<{
    event: Event;
  }>,
) {
  const isProspectusActive = !!(
    props.event.prospectus?.href &&
    (!props.event.prospectus.endDate ||
      new Date().getTime() <= props.event.prospectus.endDate.getTime())
  );
  const isTicketsActive = !!props.event.tickets?.href;
  const isCfpActive = !!(
    props.event.cfp?.href &&
    (!props.event.cfp.endDate ||
      new Date().getTime() <= props.event.cfp.endDate.getTime())
  );
  const date = props.event.date ? formatDateTime(props.event.date) : undefined;
  return (
    <div className="relative isolate overflow-hidden">
      {props.event.image && (
        <Image
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-5"
          src={props.event.image?.src ?? ""}
          width={1000}
          height={1000}
          alt={props.event.image?.alt}
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
            <span className="text-primary">{date}</span> {props.event.name}
          </h1>
          <p className="text-md mt-6 text-gray-400">{props.event.excerpt}</p>
          <div className="mx-8 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            {shouldDisplayTicketButton(props.event) && (
              <Button asChild>
                <a
                  href={props.event.tickets?.href}
                  target="_blank"
                  rel="noreferer"
                  className={buttonPrimaryClassName}
                >
                  Get tickets
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            {isProspectusActive && (
              <Button variant="outline" asChild>
                <a
                  href={props.event.prospectus?.href}
                  target="_blank"
                  rel="noreferer"
                  className={buttonPrimaryClassName}
                >
                  {props.event.prospectus?.title ?? "Sponsoring prospectus"}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            {isCfpActive && (
              <Button
                asChild
                variant={
                  [isProspectusActive, isTicketsActive].filter(Boolean)
                    .length >= MAX_PRIMARY_BUTTONS
                    ? "linkWhite"
                    : undefined
                }
              >
                <a
                  href={props.event.cfp?.href}
                  target="_blank"
                  rel="noreferer"
                  className={
                    [isProspectusActive, isTicketsActive].filter(Boolean)
                      .length < MAX_PRIMARY_BUTTONS
                      ? buttonPrimaryClassName
                      : buttonSecondaryClassName
                  }
                >
                  Call For Paper
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
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
