// import type { CollectionEntry } from "astro:content";
import type { Event } from "@/content/events/events";
import type { Person } from "@/content/people/people";
import { cn } from "@/lib/utils";
import { LanguageBadge } from "@/components/language-badge";
import type { CollectionEntry } from "astro:content";

type ConferenceCardProps = {
  schedule: Event["schedule"][number];
  talk: CollectionEntry<"talks">;
  people: Person[];
};

export const ConferenceCard = (props: Readonly<ConferenceCardProps>) => {
  return (
    <div>
      {/* // TODO: Update the href attribute once the target redirect page is finalized. */}
      <a
        href="/"
        className="flex w-full gap-2 rounded-lg border-2 border-neutral-600 bg-neutral-900 p-4"
      >
        <div className="flex w-full flex-col gap-4">
          <div className="flex-start flex justify-between gap-4">
            <div className="flex w-2/3 flex-col gap-1">
              <h1 className="font-heading text-lg font-medium leading-6 text-neutral-100">
                {props.talk.data.title}
              </h1>
              {props.people.map((person, index) => (
                <p
                  key={index}
                  className="text-sm font-semibold text-neutral-100"
                >
                  {person.name}
                </p>
              ))}
            </div>
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
          </div>
          <div>
            <div className="flex flex-row justify-between">
              <div className="flex self-end">
                <LanguageBadge language={props.talk.data.language} />
              </div>
              {/* <FavoriteButton
                talkSlug={props.talk.slug}
                isIconButton
                size="sm"
                className="border-neutral-700"
              /> */}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
