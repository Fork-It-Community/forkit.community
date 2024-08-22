import collections from "@/content/collections";
import Link from "next/link";
import { isDateInThePast } from "@/lib/utils";
import { MeetupCard } from "@/components/meetup-card";

export const UpcomingMeetups = async () => {
  const allMeetups = await collections.meetup.getAll();
  const upcomingMeetups = allMeetups.filter(
    (meetup) => !isDateInThePast(meetup.date),
  );

  return (
    <section className="relative overflow-hidden bg-gray-950 py-24 sm:py-32">
      <div className="relative mx-auto flex max-w-4xl flex-col gap-16 px-6">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
          <span className="text-primary">Fork it! Community</span> upcoming
          meetups
        </h2>
        {upcomingMeetups.map((meetup) => (
          <Link
            href={`/meetups/${meetup.metadata.slug}`}
            title={`Homepage of the ${meetup.name} meetup`}
            key={meetup.name}
          >
            <MeetupCard meetup={meetup} />
          </Link>
        ))}
      </div>
    </section>
  );
};
