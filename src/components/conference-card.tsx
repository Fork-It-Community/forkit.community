import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Event } from "@/content/events/events";
import type { Talk } from "@/content/talks/talks";
import type { Speaker } from "@/content/speakers/speaker";
import type { Sponsor } from "@/content/sponsors/sponsors";
import { cn, formatTime } from "@/lib/utils";
import { LocationBadge } from "@/components/location-badge";
import { LanguageBadge } from "@/components/language-badge";
import { FavoriteButton } from "@/components/favorite-button";
import { getEntry } from "astro:content";
import { FavoritesContextProvider } from "@/context/FavoritesContext";

type ConferenceCardProps = {
  activity: Event["schedule"][number];
  event: Event;
};

type BreakCardProps = {
  break: Event["schedule"][number];
  event: Event;
};

function TimeAndDuration(props: {
  startTime?: Date | undefined;
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
        {props.duration && (
          <p className="font-heading text-sm text-neutral-400">
            {props.duration} minutes
          </p>
        )}
        {props.children}
      </div>
    )
  );
}

type SpeakerStateProps = {
  id: string;
  collection: string;
  body: string;
  slug: string;
  data: Speaker;
}

const ConferenceCard = (props: Readonly<ConferenceCardProps>) => {
  const [talk, setTalk] = useState<Talk>();
  const [speakers, setSpeakers] = useState<SpeakerStateProps[]>([]);
  

  if (!props.activity.slug) {
    return;
  }

  const fetchTalk = async () => {
    try {
      if (props.activity.slug) {
        const fetchedTalk = await getEntry("talks", props.activity.slug);
        setTalk(fetchedTalk?.data);

        if (fetchedTalk?.data.speakers) {
          const fetchedSpeakers = await Promise.all(
            fetchedTalk.data.speakers.map(async (speaker: string) => {
              return await getEntry("speakers", speaker);
            }),
          );
          setSpeakers(fetchedSpeakers);
        }
      }
    } catch (error) {
      console.error("Failed to fetch talk data:", error);
    }
  };

  useEffect(() => {
    fetchTalk();
  }, [props.activity.slug]);

  return (
    <div className="flex flex-col gap-4">
      <a
        href="/"
        className={cn(
          "flex w-full flex-[4] gap-2 rounded-lg border-2 border-neutral-600 bg-neutral-900 p-4",
          props.activity.type === "break" && "bg-neutral-800",
        )}
      >
        <div className="flex w-full">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-row justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="font-heading text-lg font-medium leading-6">
                  {talk?.title || "Conference Name"}
                </p>
                {talk?.speakers && (
                  <div className="text-sm font-semibold text-gray-300">
                    {talk?.speakers.map((speakerSlug, index) => (
                      <p key={index}>
                        {speakers?.find(
                          (speaker) => speaker.slug === speakerSlug,
                        )?.data?.name || "Unknown Speaker"}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              {(props.activity.type === "conference" ||
                props.activity.type === "roundtable") &&
                speakers.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {talk?.speakers.map(
                      (speakerSlug: string, index: number) => {
                        const speaker = speakers.find(
                          (s) => s.slug === speakerSlug,
                        );
                        return speaker ? (
                          <div
                            key={speaker.id}
                            className={cn(
                              "h-12 w-12 overflow-hidden rounded-sm bg-gray-200",
                              speakers.length % 2 !== 0 &&
                                index === speakers.length - 1 &&
                                "col-start-2",
                            )}
                          >
                            <img
                              src={speaker?.data?.imageUrl}
                              alt={speaker?.data?.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : null;
                      },
                    )}
                  </div>
                )}
            </div>
            <div>
              <div className="flex flex-row justify-between">
                <div className="flex self-end">
                  {talk?.language && (
                    <LanguageBadge  
                      language={talk?.language}
                    />
                  )}
                </div>
                <div>
                  <FavoriteButton
                    talkSlug={talk}
                    isIconButton
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const BreakCard = (props: Readonly<BreakCardProps>) => {
  const [sponsor, setSponsor] = useState<Sponsor>();

  const fetchSponsor = async () => {
    try {
      if (props?.break?.sponsorSlug) {
        const fetchedSponsor = await getEntry(
          "sponsors",
          props.break.sponsorSlug,
        );
        setSponsor(fetchedSponsor?.data);
      }
    } catch (error) {
      console.error("Failed to fetch sponsor data:", error);
    }
  };

  useEffect(() => {
    if (props?.break?.sponsorSlug) {
      fetchSponsor();
    }
  }, [props?.break?.sponsorSlug]);

  if (!props?.break) {
    return;
  }

  return (
    <div className="flex flex-row gap-4 lg:gap-8">
      <div className="flex w-full flex-[4] flex-row justify-between gap-2 rounded-lg border-2 border-neutral-700 bg-neutral-800 px-6 py-4">
        <div className="flex flex-col justify-center">
          <p className="text-xl font-semibold">{props?.break?.name}</p>
          {props?.break?.description && <p>{props?.break?.description}</p>}
        </div>
        {sponsor && (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-neutral-400">Sponsored by</p>
            <div
              className={cn(
                "w-20 overflow-hidden rounded-md border-2 border-gray-100",
                {
                  "hover:border-gray-200": !!sponsor?.href,
                },
              )}
            >
              <img
                src={sponsor?.image?.src}
                alt={sponsor?.image?.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const EventProgram = (props: Readonly<{ event: Event }>) => {
  const activities = [...props.event.schedule].sort(
    (a, b) => (a?.startTime?.valueOf() ?? 0) - (b?.startTime?.valueOf() ?? 0),
  );

  return (
    <div className="flex flex-col gap-8">
      <FavoritesContextProvider eventSlug={props.event} >
        {activities.map((activities) => {
          return (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <TimeAndDuration
                  startTime={activities?.startTime}
                  duration={Number(activities?.duration)}
                  className="flex flex-wrap font-heading text-sm"
                />
                <LocationBadge>{activities.location}</LocationBadge>
              </div>
              <div>
                {(activities.type === "conference" ||
                  activities.type === "roundtable") && (
                  <ConferenceCard
                    activity={activities}
                    event={props.event}
                    key={activities.slug}
                  />
                )}
                {activities.type === "break" && (
                  <BreakCard
                    break={activities}
                    event={props.event}
                    key={activities.slug}
                  />
                )}
              </div>
            </div>
          );
        })}
      </FavoritesContextProvider>
    </div>
  );
};
