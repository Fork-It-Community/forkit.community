import type { CollectionEntry } from "astro:content";
import { ICONS } from "./icons";
import { cn } from "@/lib/utils";

const SpeakerDetail = (
  props: Readonly<{ speaker: CollectionEntry<"people">["data"] }>,
) => {
  return (
    <div className="flex h-fit w-fit flex-col gap-2">
      <div className="mx-auto aspect-square overflow-hidden rounded-lg">
        <img
          src={props.speaker.avatar}
          alt={`${props.speaker.name} profile picture`}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold leading-6 tracking-tight text-white md:text-xl">
            {props.speaker.name}
          </h2>
          {!!props.speaker.job && (
            <p className="text-neutral-400">{props.speaker.job}</p>
          )}
          {!!props.speaker.company && (
            <div>
              {!!props.speaker.company.href ? (
                <a
                  href={props.speaker.company.href}
                  target="_blank"
                  className="text-sm leading-5 text-neutral-400 underline transition hover:text-primary"
                >
                  {props.speaker.company.title}
                </a>
              ) : (
                <p className="text-sm leading-5 text-gray-400">
                  {props.speaker.company.title}
                </p>
              )}
            </div>
          )}
        </div>
        {!!props.speaker.socials && (
          <ul className="flex gap-x-2">
            {props.speaker.socials.map((social) => (
              <li key={social.type}>
                <a
                  href={social.href}
                  className="text-gray-400 transition hover:text-primary"
                  target="_blank"
                >
                  <span className="sr-only">{social.type}</span>
                  {ICONS[social.type]}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Speakers = (
  props: Readonly<{
    speakers: CollectionEntry<"people">[];
    className?: string;
  }>,
) => {
  return (
    <div className="sm:col-span-1 md:col-span-1" id="speakers">
      <h2>Speakers</h2>
      <hr className="mb-4 mt-2 w-full border border-neutral-800" />
      <div className={cn("grid grid-cols-2 gap-4 lg:gap-8", props.className)}>
        {props.speakers.map((speaker) => (
          <SpeakerDetail speaker={speaker.data} key={speaker.slug} />
        ))}
      </div>
    </div>
  );
};

const SpeakerCarousel = (
  props: Readonly<{
    speakers: CollectionEntry<"people">[];
    className?: string;
  }>,
) => {
  return (
    <div
      className={cn(
        "relative z-0 grid auto-cols-[11.25rem] grid-flow-col gap-4 overflow-x-auto pt-2",
        props.className,
      )}
    >
      {props.speakers.map((speaker) => (
        <div className="group col-span-1" key={speaker.slug}>
          <SpeakerDetail speaker={speaker.data} />
        </div>
      ))}
    </div>
  );
};

export { SpeakerDetail, Speakers, SpeakerCarousel };
