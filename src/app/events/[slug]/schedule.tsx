import { Button } from "@/components/ui/button";
import collections, { Event, Talk } from "@/content/collections";
import { cn, formatConfTime, formatDateTime } from "@/lib/utils";
import { Mail } from "lucide-react";
import Link from "next/link";

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

async function CardConference(props: { talk: Talk; event: Event }) {
  const speakers = await Promise.all(
    props.talk.speakers.map(
      async (speaker) => await collections.speaker.getBySlug(speaker),
    ),
  );
  return (
    <div className="flex gap-4 lg:gap-10">
      {props.talk.startTime && formatConfTime(props.talk.startTime)}
      <Link
        href={`${props.event.metadata.slug}/talks/${props.talk.metadata.slug}`}
        className={cn(
          "flex h-32 w-auto flex-1 items-start gap-2  rounded-lg border-2 border-gray-500 bg-gray-900 px-6 py-4",
          props.talk.duration === 30 && "h-40 lg:h-32",
          props.talk.duration === 45 && "h-52 lg:h-40",
        )}
      >
        <div>
          <p>{props.talk.title}</p>
          <p>by {speakers.map((speaker) => speaker.name).join(", ")}</p>
        </div>
      </Link>
    </div>
  );
}

export async function Schedule(props: Readonly<{ event: Event }>) {
  const talks = props.event.talks
    ? await Promise.all(
        props.event.talks.map(
          async (talkSlug) => await collections.talk.getBySlug(talkSlug),
        ),
      )
    : undefined;
  talks?.sort(
    (talk1, talk2) =>
      (talk1.startTime?.valueOf() ?? 0) - (talk2.startTime?.valueOf() ?? 0),
  );
  if (props.event.schedulePublished && props.event.talks) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col gap-4 bg-gray-950 px-6 py-24 sm:py-32 lg:px-8">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Programmation
        </h2>
        <p className="max-w-xl">
          Doors open at 8:00 AM. Swing by to get a good seat and a brief
          welcome. At 8:30 AM, we dive straight into the heart of the matter
          with a session that’s all about substance, no fluff. We&apos;ve got
          back-to-back talks from people who get to the point. Breaks are quick,
          so we can focus on what you came for - solid content and meaningful
          dialogue. We close the day with a networking event where you can
          connect with speakers and peers. Stick around, the good stuff isn’t
          only in the sessions.
        </p>
        <div className="gap flex flex-col gap-4">
          {talks?.map((talk) => (
            <CardConference
              talk={talk}
              event={props.event}
              key={talk.metadata.slug}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-950">
        <ScheduleComingSoon event={props.event} />
      </div>
    );
  }
}
