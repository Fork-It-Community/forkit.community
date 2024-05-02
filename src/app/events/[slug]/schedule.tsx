import { Button } from "@/components/ui/button";
import collections, { Event, Talk } from "@/content/collections";
import { cn, formatTime } from "@/lib/utils";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DefaultImg from "@/../public/speakers/speaker-default.jpg";

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

function TimeAndDuration(
  props: Pick<Talk, "startTime" | "duration"> & { className?: string },
) {
  return (
    props.startTime && (
      <div
        className={cn(
          "flex flex-row gap-2 text-sm text-gray-300",
          props.className,
        )}
      >
        <time dateTime={props.startTime.toISOString()}>
          {formatTime(props.startTime)}
        </time>
        <span className="md:hidden">·</span>{" "}
        {props.duration && <p>{props.duration} minutes</p>}
      </div>
    )
  );
}

async function CardConference(props: Readonly<{ talk: Talk; event: Event }>) {
  const speakers = await Promise.all(
    props.talk.speakers.map(
      async (speaker) => await collections.speaker.getBySlug(speaker),
    ),
  );

  return (
    <div className="flex flex-row gap-4 lg:gap-10">
      <TimeAndDuration
        duration={props.talk.duration}
        startTime={props.talk.startTime}
        className="hidden flex-1 md:block"
      />
      <Link
        href={`${props.event.metadata.slug}/talks/${props.talk.metadata.slug}`}
        className={
          "flex w-full flex-[4] gap-2 rounded-lg border-2 border-gray-600 bg-gray-900 p-2 hover:border-gray-500 hover:bg-gray-800"
        }
      >
        <div className="flex flex-col gap-2">
          <TimeAndDuration
            duration={props.talk.duration}
            startTime={props.talk.startTime}
            className="md:hidden"
          />
          <p className="text-xl font-semibold">{props.talk.title}</p>
          <div className="flex flex-col gap-2">
            {speakers.map((speaker) => (
              <div className="flex flex-row gap-2" key={speaker.name}>
                <Image
                  className="aspect-square rounded-sm"
                  src={speaker.imageUrl ?? DefaultImg}
                  alt={speaker.name}
                  width={40}
                  height={40}
                  sizes="40px"
                />
                <p className="font-heading">{speaker.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export async function Schedule(props: Readonly<{ event: Event }>) {
  const talks = props.event.talks
    ? (
        await Promise.all(
          props.event.talks.map(
            async (talkSlug) => await collections.talk.getBySlug(talkSlug),
          ),
        )
      ).sort(
        (talk1, talk2) =>
          (talk1.startTime?.valueOf() ?? 0) - (talk2.startTime?.valueOf() ?? 0),
      )
    : undefined;

  if (!props.event.schedulePublished || !talks) {
    return (
      <div className="bg-gray-950">
        <ScheduleComingSoon event={props.event} />
      </div>
    );
  }

  return (
    <div
      className="mx-auto flex max-w-7xl flex-col gap-4 bg-gray-950 px-6 py-24 sm:py-32 lg:px-8"
      id="schedule"
    >
      <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Schedule
      </h2>
      <div className="flex flex-col gap-4">
        {talks.map((talk) => (
          <CardConference
            talk={talk}
            event={props.event}
            key={talk.metadata.slug}
          />
        ))}
      </div>
    </div>
  );
}
