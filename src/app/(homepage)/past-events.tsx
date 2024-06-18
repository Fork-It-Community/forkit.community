import collections from "@/content/collections";
import Link from "next/link";
import { hasEventPassed } from "@/lib/utils";
import { EventCard } from "@/components/event-card";

export const PastEvents = async () => {
  const pastEvents = (await collections.event.getAll()).filter((event) =>
    hasEventPassed(event),
  );

  return (
    <section className="relative overflow-hidden bg-gray-950 py-24 sm:py-32">
      <div className="relative mx-auto flex max-w-4xl flex-col gap-16 px-6">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
          <span className="text-primary">Fork it! Community</span> past events
        </h2>
        {pastEvents.map((event) => (
          <Link
            href={`/events/${event.metadata.slug}`}
            title="Homepage of the event"
            key={event.name}
          >
            <EventCard event={event} />
          </Link>
        ))}
      </div>
    </section>
  );
};
