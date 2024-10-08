import type { CollectionEntry } from "astro:content";
import type { Event } from "@/content/events/events";
import type { Talk } from "@/content/talks/talks";
import { cn } from "@/lib/utils";
import { LanguageBadge } from "@/components/language-badge";
import { FavoriteButton } from "@/components/favorite-button";

type ConferenceCardProps = {
  schedule: Event["schedule"][number];
  talks: CollectionEntry<"talks">[];
  people: CollectionEntry<"people">[];
};

export const ConferenceCard = (props: Readonly<ConferenceCardProps>) => {
  const talk: Talk = props.talks.find(
    (talk) => talk.slug === props.schedule.slug,
  )?.data;
  const speakers = talk?.speakers.map((t) =>
    props.people.find((s) => t === s.slug),
  );

  if (!props.schedule) {
    return;
  }

  return (
    <div>
      <a
        href="/"
        className={cn(
          "flex w-full flex-[4] gap-2 rounded-lg border-2 border-neutral-600 bg-neutral-900 p-4",
          props.schedule.type === "break" && "bg-neutral-800",
        )}
      >
        <div className="flex w-full flex-col gap-4">
          <div className="flex-start flex justify-between gap-4">
            <div className="flex w-8/12 flex-col gap-1">
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
                      {speakers?.find(
                        (speaker) => speaker?.slug === speakerSlug,
                      )?.data.name || "Unknown Speaker"}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {(props.schedule.type === "conference" ||
              props.schedule.type === "roundtable") &&
              speakers && (
                <div className="grid h-fit w-fit grid-cols-2 gap-2">
                  {speakers.map((speaker, index) => (
                    <div
                      key={speaker?.id}
                      className={cn(
                        "h-12 w-12 overflow-hidden rounded-sm bg-gray-200",
                        speakers.length % 2 !== 0 &&
                          index === speakers.length - 1 &&
                          "col-start-2",
                      )}
                    >
                      <img
                        src={speaker?.data.avatar}
                        alt={speaker?.data.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
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
