import { Button } from "@/components/ui/button";
import collections, { Meetup } from "@/content/collections";
import { cn, formatTime } from "@/lib/utils";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DefaultImg from "@/../public/speakers/speaker-default.jpg";
import { match } from "ts-pattern";
import { LanguageBadge } from "@/components/language-badge";
import { LocationBadge } from "@/components/location-badge";
import { FeedbackCTA } from "@/components/feedback-cta";
import { ReactNode } from "react";

function ScheduleComingSoon(props: Readonly<{ meetup: Meetup }>) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:justify-between lg:px-8">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Schedule is coming soon !
      </h2>

      <Button asChild>
        <a
          href={`mailto:rudy@forkit.community?subject=${props.meetup.date?.getFullYear()} ${
            props.meetup.name
          } Sponsorship`}
          className="mt-6"
        >
          Contact Us <Mail className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}

function TimeAndDuration(props: {
  startTime?: Date;
  duration?: number;
  className?: string;
  children?: ReactNode;
}) {
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
        {props.children}
      </div>
    )
  );
}

async function CardConference(
  props: Readonly<{
    activity: NonNullable<Meetup["schedule"]>[number];
    meetup: Meetup;
  }>,
) {
  if (!props.activity.slug) {
    return;
  }
  const talk = await collections.talk.getBySlug(props.activity.slug);
  const speakers = await Promise.all(
    talk.speakers.map(
      async (speaker) => await collections.speaker.getBySlug(speaker),
    ),
  );
  const hosts = await Promise.all(
    (talk.hosts ?? []).map(
      async (host) => await collections.speaker.getBySlug(host),
    ),
  );

  return (
    <div className="flex flex-row gap-4 lg:gap-8">
      <div className="hidden gap-2 md:flex md:flex-1 md:flex-col">
        <TimeAndDuration
          duration={props.activity.duration}
          startTime={props.activity.startTime}
          className="flex flex-col"
        >
          {props.activity.type === "roundtable" && <>Roundtable</>}
        </TimeAndDuration>
        {!!props.activity.location && (
          <LocationBadge>{props.activity.location}</LocationBadge>
        )}
      </div>

      <Link
        href={`/meetups/${props.meetup.metadata.slug}/talks/${talk.metadata.slug}`}
        className={cn(
          "flex w-full flex-[4] gap-2 rounded-lg border-2 border-gray-600 bg-gray-900 p-2 px-6 py-4 hover:border-gray-500 hover:bg-gray-800",
          props.activity.type === "roundtable" &&
            "bg-gray-950 hover:bg-gray-900",
        )}
      >
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-1 flex-col gap-2 md:hidden">
              <TimeAndDuration
                duration={props.activity.duration}
                startTime={props.activity.startTime}
                className="flex flex-wrap md:hidden"
              >
                <>{props.activity.type === "roundtable" && <>Roundtable</>}</>
              </TimeAndDuration>
              {!!props.activity.location && (
                <LocationBadge>{props.activity.location}</LocationBadge>
              )}{" "}
            </div>

            <p className="text-xl font-semibold">{talk.title}</p>
            <div className="flex flex-col gap-2">
              {hosts?.map((host) => (
                <div className="flex flex-row gap-2" key={host.name}>
                  <Image
                    className="aspect-square rounded-sm"
                    src={host.imageUrl ?? DefaultImg}
                    alt={host.name}
                    width={40}
                    height={40}
                    sizes="40px"
                  />
                  <div className="flex flex-col">
                    <p className="font-heading">{host.name}</p>
                    <p className="text-xs font-semibold">Roundtable host</p>
                  </div>
                </div>
              ))}
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
          <div className="flex flex-row items-center justify-between">
            <LanguageBadge language={talk.language} />
          </div>
        </div>
      </Link>
    </div>
  );
}

async function CardBreak(
  props: Readonly<{
    break: NonNullable<Meetup["schedule"]>[number];
  }>,
) {
  const sponsor = props.break.sponsorSlug
    ? await collections.sponsor.getBySlug(props.break.sponsorSlug)
    : undefined;
  return (
    <div className="flex flex-row gap-4 lg:gap-8">
      <div className="hidden md:flex md:flex-1 md:flex-col md:gap-2">
        <TimeAndDuration
          duration={props.break.duration}
          startTime={props.break.startTime}
          className="hidden md:flex md:flex-col"
        />
        {!!props.break.location && (
          <LocationBadge>{props.break.location}</LocationBadge>
        )}
      </div>

      <div className="flex w-full flex-[4] flex-col gap-2 rounded-lg border-2 border-gray-600 bg-gray-800 px-6 py-4">
        <div className="flex flex-col gap-1 md:hidden">
          <TimeAndDuration
            duration={props.break.duration}
            startTime={props.break.startTime}
            className="flex flex-wrap"
          />
          {!!props.break.location && (
            <LocationBadge>{props.break.location}</LocationBadge>
          )}
        </div>
        <p className="text-xl font-semibold">{props.break.name}</p>
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          {props.break.description && <p>{props.break.description}</p>}
          {sponsor && (
            <div className="flex flex-col gap-2">
              <p className="text-sm">Sponsored by</p>
              <div
                className={cn(
                  "w-40 overflow-hidden rounded-md border-2 border-gray-100",
                  {
                    "hover:border-gray-200": !!sponsor.href,
                  },
                )}
              >
                <Image
                  className="w-full"
                  src={sponsor.image.src}
                  alt={sponsor.image.alt}
                  width={1000}
                  height={500}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function Schedule(props: Readonly<{ meetup: Meetup }>) {
  if (!props.meetup.schedule) {
    return (
      <div className="bg-gray-950">
        <ScheduleComingSoon meetup={props.meetup} />
      </div>
    );
  }

  const activities = [...props.meetup.schedule].sort(
    (talk1, talk2) =>
      (talk1.startTime?.valueOf() ?? 0) - (talk2.startTime?.valueOf() ?? 0),
  );

  return (
    <div className="flex flex-col gap-4">
      {activities.map((activity) =>
        match(activity.type)
          .with("conference", "roundtable", () => (
            <CardConference
              activity={activity}
              meetup={props.meetup}
              key={activity.slug}
            />
          ))
          .with("break", () => (
            <CardBreak break={activity} key={activity.name} />
          ))
          .otherwise(() => null),
      )}
    </div>
  );
}

export const ScheduleSection = (props: Readonly<{ meetup: Meetup }>) => {
  return (
    <div className="bg-gray-950">
      <div
        className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-24 sm:py-32 lg:px-8"
        id="schedule"
      >
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Schedule
        </h2>
        <Schedule meetup={props.meetup} />

        {props.meetup.schedule && (
          <p className="text-center">
            You can find a{" "}
            <Link
              href={`/meetups/${props.meetup.metadata.slug}/schedule`}
              className="underline hover:no-underline"
            >
              dedicated schedule page
            </Link>{" "}
            for easier consultation for the big day.
          </p>
        )}
        {props.meetup.feedback && (
          <FeedbackCTA href={props.meetup.feedback.link} />
        )}
      </div>
    </div>
  );
};
