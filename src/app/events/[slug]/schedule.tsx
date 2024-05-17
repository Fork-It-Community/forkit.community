import { Button } from "@/components/ui/button";
import collections, { Event } from "@/content/collections";
import { cn, formatTime } from "@/lib/utils";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DefaultImg from "@/../public/speakers/speaker-default.jpg";
import { match } from "ts-pattern";
import { LanguageBadge } from "@/components/language-badge";
import { FavoritesContextProvider } from "@/app/events/[slug]/contexts/FavoritesContext";
import { FavoriteButton } from "@/components/favorite-button";

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

function TimeAndDuration(props: {
  startTime?: Date;
  duration?: number;
  className?: string;
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
      </div>
    )
  );
}

async function CardConference(
  props: Readonly<{
    activity: {
      type: string;
      sponsorSlug?: string;
      description?: string;
      name?: string;
      slug?: string;
      startTime?: Date;
      duration?: number;
    };
    event: Event;
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

  return (
    <div className="flex flex-row gap-4 lg:gap-10">
      <TimeAndDuration
        duration={props.activity.duration}
        startTime={props.activity.startTime}
        className="hidden flex-1 md:block"
      />
      <Link
        href={`/events/${props.event.metadata.slug}/talks/${talk.metadata.slug}`}
        className={
          "flex w-full flex-[4] gap-2 rounded-lg border-2 border-gray-600 bg-gray-900 p-2 px-6 py-4 hover:border-gray-500 hover:bg-gray-800"
        }
      >
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-2">
            <TimeAndDuration
              duration={props.activity.duration}
              startTime={props.activity.startTime}
              className="md:hidden"
            />
            <p className="text-xl font-semibold">{talk.title}</p>
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
          <div className="flex flex-row items-center justify-between">
            <LanguageBadge language={talk.language} />
            <FavoriteButton talkSlug={talk.metadata.slug} isIconButton />
          </div>
        </div>
      </Link>
    </div>
  );
}

async function CardBreak(
  props: Readonly<{
    break: {
      type: string;
      sponsorSlug?: string;
      description?: string;
      name?: string;
      slug?: string;
      startTime?: Date;
      duration?: number;
    };
  }>,
) {
  const sponsor = props.break.sponsorSlug
    ? await collections.sponsor.getBySlug(props.break.sponsorSlug)
    : undefined;
  return (
    <div className="flex flex-row gap-4 lg:gap-10">
      <TimeAndDuration
        duration={props.break.duration}
        startTime={props.break.startTime}
        className="hidden flex-1 md:block"
      />
      <div className="flex w-full flex-[4] flex-col gap-2 rounded-lg border-2 border-gray-600 bg-gray-800 px-6 py-4">
        <TimeAndDuration
          duration={props.break.duration}
          startTime={props.break.startTime}
          className="md:hidden"
        />
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

export async function Schedule(props: Readonly<{ event: Event }>) {
  if (!props.event.schedule) {
    return (
      <div className="bg-gray-950">
        <ScheduleComingSoon event={props.event} />
      </div>
    );
  }

  const activities = [...props.event.schedule].sort(
    (talk1, talk2) =>
      (talk1.startTime?.valueOf() ?? 0) - (talk2.startTime?.valueOf() ?? 0),
  );

  return (
    <div className="flex flex-col gap-4">
      <FavoritesContextProvider eventSlug={props.event.metadata.slug}>
        {activities.map((activity) =>
          match(activity.type)
            .with("conference", () => (
              <CardConference
                activity={activity}
                event={props.event}
                key={activity.slug}
              />
            ))
            .with("break", () => (
              <CardBreak break={activity} key={activity.name} />
            ))
            .otherwise(() => null),
        )}
      </FavoritesContextProvider>
    </div>
  );
}

export const ScheduleSection = (props: Readonly<{ event: Event }>) => {
  return (
    <div className="bg-gray-950">
      <div
        className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-24 sm:py-32 lg:px-8"
        id="schedule"
      >
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Schedule
        </h2>
        <Schedule event={props.event} />
        <Link
          href={`/events/${props.event.metadata.slug}/schedule`}
          className="justify-end text-right underline"
        >
          Dedicated schedule page
        </Link>
      </div>
    </div>
  );
};
