import { useEffect, useState } from "react";
import type { Event } from "@/content/events/events";
import type { Talk } from "@/content/talks/talks";
import type { Speaker } from "@/content/speakers/speaker";
import { cn } from "@/lib/utils";
import { LanguageBadge } from "@/components/language-badge";
import { FavoriteButton } from "@/components/favorite-button";

type ConferenceCardProps = {
  schedule: Event["schedule"][number];
  talks: TalkStateProps[];
  speakers: SpeakerStateProps[];
};

type SpeakerStateProps = {
  id: string;
  collection: string;
  body: string;
  slug: string;
  data: Speaker;
};
type TalkStateProps = {
  id: string;
  collection: string;
  body: string;
  slug: string;
  data: Talk;
};

export const ConferenceCard = (props: Readonly<ConferenceCardProps>) => {
  const [talk, setTalk] = useState<Talk>();
  const [speakers, setSpeakers] = useState<SpeakerStateProps[]>([]);

  if (!props.schedule) {
    return;
  }

  useEffect(() => {
    if (props.schedule.slug) {
      const foundTalk = props.talks.find(
        (talk) => talk.slug === props.schedule.slug,
      );
      if (foundTalk) {
        setTalk(foundTalk.data);
        if (foundTalk.data?.speakers.length > 0) {
          const foundSpeakers: SpeakerStateProps[] = [];
          foundTalk.data.speakers.map((talkSpeaker) => {
            const foundSpeaker = props.speakers.find(
              (speaker) => talkSpeaker === speaker.slug,
            );
            if (foundSpeaker) foundSpeakers.push(foundSpeaker);
          });
          setSpeakers(foundSpeakers);
        }
      }
    }
  }, [props.schedule.slug]);

  return (
    <div className="flex flex-col gap-4">
      <a
        href="/"
        className={cn(
          "flex w-full flex-[4] gap-2 rounded-lg border-2 border-neutral-600 bg-neutral-900 p-4",
          props.schedule.type === "break" && "bg-neutral-800",
        )}
      >
        <div className="flex w-full flex-col gap-4">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-heading text-lg font-medium leading-6">
                {talk?.title || "Conference Name"}
              </p>
              {talk?.speakers && (
                <div>
                  {talk?.speakers.map((speakerSlug, index) => (
                    <p
                      key={index}
                      className="text-sm font-semibold text-gray-300"
                    >
                      {speakers?.find((speaker) => speaker.slug === speakerSlug)
                        ?.data?.name || "Unknown Speaker"}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {(props.schedule.type === "conference" ||
              props.schedule.type === "roundtable") &&
              speakers.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {talk?.speakers.map((speakerSlug: string, index: number) => {
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
                  })}
                </div>
              )}
          </div>
          <div>
            <div className="flex flex-row justify-between">
              <div className="flex self-end">
                {talk?.language && <LanguageBadge language={talk?.language} />}
              </div>
              <div>
                <FavoriteButton talkSlug={talk} isIconButton size="sm" />
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
