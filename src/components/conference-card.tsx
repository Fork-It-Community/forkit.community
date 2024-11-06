// import type { CollectionEntry } from "astro:content";
import type { Event } from "@/content/events/events";
import type { Talk } from "@/content/talks/talks";
import type { Person } from "@/content/people/people";
import { cn } from "@/lib/utils";
import { LanguageBadge } from "@/components/language-badge";
import { FavoriteButton } from "@/components/favorite-button";

type ConferenceCardProps = {
  schedule: Event["schedule"][number];
  talk: Talk;
  people: Person[];
};

export const ConferenceCard = (props: Readonly<ConferenceCardProps>) => {
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
                {props.talk.title || "Conference Name"}
              </p>
              {props.people?.length > 0 && (
                <div>
                  {props.people.map((person, index) => (
                    <p
                      key={index}
                      className="text-sm font-semibold text-gray-300"
                    >
                      {person.name || "Unknown Speaker"}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {(props.schedule.type === "conference" ||
              props.schedule.type === "roundtable") &&
              props.people?.length > 0 && (
                <div className="grid h-fit w-fit grid-cols-2 gap-2">
                  {props.people.map((speaker, index) => (
                    <div
                      key={speaker.name}
                      className={cn(
                        "h-12 w-12 overflow-hidden rounded-sm bg-gray-200",
                        props.people.length % 2 !== 0 &&
                          index === props.people.length - 1 &&
                          "col-start-2",
                      )}
                    >
                      <img
                        src={speaker.avatar}
                        alt={speaker.name}
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
                {props.talk.language && (
                  <LanguageBadge language={props.talk.language} />
                )}
              </div>
              <div>
                <FavoriteButton talkSlug={props.talk} isIconButton size="sm" />
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
