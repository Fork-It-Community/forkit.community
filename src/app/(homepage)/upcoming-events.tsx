import collections from "@/content/collections";
import Link from "next/link";
import { isDateInThePast } from "@/lib/utils";
import { EventCard } from "@/components/event-card";

export const UpcomingEvents = async () => {
  const allEvents = await collections.event.getAll();
  const upcomingEvents = allEvents.filter(
    (event) => !isDateInThePast(event.date),
  );

  return (
    <section
      className="relative overflow-hidden bg-gray-950 py-24 sm:py-32"
      id="upcoming-events"
    >
      <div className="relative mx-auto flex max-w-4xl flex-col gap-16 px-6">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
          <span className="text-primary">Fork it! Community</span> upcoming
          events
        </h2>
        {upcomingEvents.map((event) => (
          <Link
            href={`/events/${event.metadata.slug}`}
            title={`Homepage of the ${event.name} event`}
            key={event.name}
          >
            <EventCard event={event} />
          </Link>
        ))}
      </div>
    </section>
  );
};
