import { Button } from "@/components/ui/button";
import { Event } from "@/content/collections";
import { ExternalLink } from "lucide-react";

export function Sponsorship(props: { event: Event }) {
  return (
    <div id="sponsors" className="bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Want to become a sponsor?
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          {props.event.prospectus && (
            <Button asChild>
              <a
                href={props.event.prospectus?.href}
                title={props.event.prospectus?.title}
              >
                Sponsoring Prospectus
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          <a
            href={`mailto:rudy@forkit.community?subject=${props.event.date?.getFullYear()} ${
              props.event.name
            } Sponsorship`}
            className="text-sm font-semibold leading-6 text-white"
          >
            Contact Us <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
