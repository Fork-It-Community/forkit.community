import { Button } from "@/components/ui/button";
import { Event } from "@/content/collections";
import { Mail } from "lucide-react";

function ScheduleComingSoon(props: Readonly<{ event: Event }>) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Schedule is coming soon !
      </h2>

      <Button asChild>
        <a
          href={`mailto:rudy@forkit.community?subject=${props.event.date?.getFullYear()} ${
            props.event.name
          } Sponsorship`}
          className="mt-6"
        >
          Contact Us <Mail className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}
export function Schedule(props: Readonly<{ event: Event }>) {
  return (
    <div className="bg-gray-900">
      <ScheduleComingSoon event={props.event} />
    </div>
  );
}
