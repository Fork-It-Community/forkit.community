import type { Event } from "@/content/events/events";
import { cn } from "@/lib/utils";
import type { CollectionEntry } from "astro:content";

export function Sponsors(
  props: Readonly<{
    meetup: Event;
    sponsors: CollectionEntry<"sponsors">[];
  }>,
) {
  return (
    <div className="" id="sponsors">
      <div className="">
        <div className="mx-auto pb-4">
          <h2 className="text-xl">Sponsors</h2>
          <hr className="mb-4 mt-2 border border-neutral-800" />
        </div>

        {props.meetup.sponsoringLevels?.map((level) => {
          const levelSponsors =
            props.sponsors.filter((sponsor) =>
              props.meetup.sponsors?.some(
                (s) => s.slug === sponsor.slug && s.level === level,
              ),
            ) ?? [];
          return (
            <div key={level} className="pt-2 md:pt-4">
              <div className="max-w-7xl">
                <h3 className="mb-4 font-heading text-2xl font-bold capitalize tracking-tight text-white">
                  {level.toLocaleLowerCase()}
                </h3>
                <div
                  className={cn(
                    "grid grid-cols-2 gap-4 sm:mx-0 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8",
                    level === "SILVER" && "sm:grid-cols-2 lg:grid-cols-3",
                  )}
                >
                  {levelSponsors.map((sponsor) => (
                    <a
                      href={sponsor.data.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={sponsor.slug}
                      className=""
                    >
                      <img
                        src={sponsor.data.image.src}
                        alt={sponsor.data.image.alt}
                        className="w-full"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
