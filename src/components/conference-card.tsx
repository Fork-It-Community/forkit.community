import { useState } from "react";
import type { ReactNode } from "react";
import type { Event } from "@/content/events/events";
import { cn, formatTime } from "@/lib/utils";
import { LocationBadge } from "@/components/location-badge";
import { LanguageBadge } from "@/components/language-badge";
import { FavoriteButton } from "@/components/favorite-button";
import { getCollection } from "astro:content"; 

type ConferenceCardProps = {
  activity: Event["schedule"][number];
  event: Event;
};

const getTalkBySlug = async (slug: string) => {
  const talks = await getCollection("talks");
  return talks.find(talk => talk.slug === slug);
};

const ConferenceCard = (props: Readonly<ConferenceCardProps>) => {
  const [speakerSlug, setSpeakerSlug] = useState<{ [key: string]: any }>({});

  const fetchSpeakers = async () => {
    try {
      const speakerPromises = props.event.map(async (activity: any) => {
        const talk = await getTalkBySlug(activity.slug);
        console.log("Talk fetched:", talk?.data);
        return { slug: activity.slug, speakers: talk ? talk.data.speakers : [] };
      });

      const speakersArray = await Promise.all(speakerPromises);
      console.log("Speakers fetched:", speakersArray);
      const speakersMap = speakersArray.reduce((acc, { slug, speakers }) => {
        acc[slug] = speakers;
        return acc;
      }, {});

      setSpeakerSlug(speakersMap);
      console.log("Speakers fetched and set:", speakersMap);
      console.log("Speakers state:", speakerSlug);
    } catch (error) {
      console.error("Error fetching speakers:", error);
    }
  };

  fetchSpeakers();

  return (
    <div className="flex flex-col gap-4 bg-current p-8 lg:gap-8">
      {props.event.map((activity: any) => {
        console.log('Activity slug:', activity.slug);
        console.log('speakerSlug', speakerSlug)
        const activitySpeakers = speakerSlug[activity.slug];
        console.log('Speakers:', activitySpeakers);

        return (
          <a
            key={activity.slug}
            href={`/events/${activity.slug}`}
            className={cn(
              "flex w-full flex-[4] gap-2 rounded-lg border-2 border-neutral-600 bg-neutral-900 p-4",
              activity.type === "break" && "bg-neutral-800",
            )}
          >
            <div className="flex w-full">
              <div className="flex w-full flex-col gap-4">
                <div className="flex flex-row justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="font-heading text-lg font-semibold leading-6">
                      {activity.name || "Conference Name"}
                    </p>
                    {activity.description && (
                      <p className="text-sm font-semibold text-gray-300">
                        {activity.description}
                      </p>
                    )}
                    {activity.job && (
                      <p className="text-sm text-gray-300">{activity.job}</p>
                    )}
                    {activity.company && (
                      <p className="mt-1 font-medium">{activity.company.title}</p>
                    )}
                    {activitySpeakers && activitySpeakers.length > 0 && (
                      <p className="text-sm text-gray-300">
                        Speakers: {activitySpeakers.join(', ')}
                      </p>
                    )}
                  </div>
                  {(activity.type === "conference" || activity.type === "roundtable") && (
                    <div className="grid grid-cols-2 gap-2">
                      {[...Array(5)].map((_, index) => (
                        <div
                          key={index}
                          className={cn(
                            "h-12 w-12 rounded-sm bg-gray-200",
                            index === 4 && "col-span-2 justify-self-end",
                          )}
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {(activity.type === "conference" || activity.type === "roundtable") && (
                  <div>
                    <div className="flex flex-row justify-between">
                      <div className="flex self-end">
                        <LanguageBadge
                          // language={talk.language}
                        />
                      </div>
                      <div>
                        <FavoriteButton
                          // talkSlug={talk.metadata.slug}
                          isIconButton
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

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

export const EventProgram = (props: Readonly<{ event: Event }>) => {
  console.log('EventProgram props:', props);
  return (
    <div className="flex flex-col gap-8">
      <ConferenceCard
        activity={props.event.schedule}
        event={props.event.schedule}
      />
    </div>
  );
};

export default ConferenceCard;