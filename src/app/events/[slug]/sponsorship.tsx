import { Button } from "@/components/ui/button";
import { Event } from "@/content/collections";
import { ExternalLink, Mail } from "lucide-react";

export function Sponsorship(props: Readonly<{ event: Event }>) {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Want to become a sponsor?
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 lg:mt-0 lg:flex-shrink-0">
          <Button asChild>
            <a
              href={props.event.prospectus?.href}
              title={props.event.prospectus?.title}
              target="_blank"
              rel="noreferer"
            >
              Sponsoring Prospectus
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>

          <Button variant="link" asChild>
            <a
              href={`mailto:rudy@forkit.community?subject=${props.event.date?.getFullYear()} ${
                props.event.name
              } Sponsorship`}
            >
              Contact Us <Mail className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
