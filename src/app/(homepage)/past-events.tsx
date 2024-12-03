import collections from "@/content/collections";
import Link from "next/link";
import { isDateInThePast } from "@/lib/utils";
import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { MeetupCard } from "@/components/meetup-card";

export const PastEvents = async () => {
  const allEvents = await collections.event.getAll();
  const allMeetups = await collections.meetup.getAll();
  const pastEvents = allEvents.filter((event) => isDateInThePast(event.date));
  const pastMeetups = allMeetups
    .filter(
      (meetup) =>
        isDateInThePast(meetup.date) && meetup.status !== "EventCancelled",
    )
    .reverse();
  return (
    <section
      className="relative overflow-hidden bg-gray-950 py-24 sm:py-32"
      id="past-events"
    >
      <div className="relative mx-auto flex max-w-4xl flex-col gap-16 px-6">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
          <span className="text-primary">Fork it! Community</span> past events
        </h2>

        {pastMeetups.map((meetup) => (
          <div key={meetup.name} className="gap-0">
            <Link
              href={`/meetups/${meetup.metadata.slug}`}
              title="Homepage of the event"
            >
              <MeetupCard meetup={meetup} />
            </Link>
          </div>
        ))}
        {pastEvents.map((event) => (
          <div key={event.name} className="gap-0">
            <Link
              href={`/events/${event.metadata.slug}`}
              title="Homepage of the event"
            >
              <EventCard event={event} className="rounded-b-none" />
            </Link>
            <div className="flex gap-4 rounded-b-lg border-2 border-t-0 border-gray-700 bg-gray-900 p-6">
              <Button asChild>
                <a
                  href="https://www.youtube.com/playlist?list=PLnfCgE11xujteT3e9wpbecCiXp446UIlK"
                  target="_blank"
                >
                  VODs
                </a>
              </Button>
              <Button asChild>
                <a
                  href="https://drive.google.com/drive/folders/1GHA6-P3wSJti1IZxL32bQcYm6-8owEKQ"
                  target="_blank"
                >
                  Explore all the photos
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
