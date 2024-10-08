import type { CollectionEntry } from "astro:content";
import type { Event } from "@/content/events/events";
import { cn } from "@/lib/utils";

type BreakCardProps = {
  schedule: Event["schedule"][number];
  sponsors: CollectionEntry<"sponsors">[];
};

export const BreakCard = (props: Readonly<BreakCardProps>) => {
  const sponsor = props.sponsors.find(
    (s) => s.slug === props.schedule.sponsorSlug,
  )?.data;

  if (!props?.schedule) {
    return;
  }

  return (
    <div>
      <div className="flex w-full flex-[4] flex-row justify-between gap-2 rounded-lg border-2 border-neutral-700 bg-neutral-800 px-4 py-4">
        <div className="flex flex-col justify-center">
          <p className="text-xl font-semibold">{props?.schedule?.name}</p>
          {props.schedule.description && <p>{props.schedule.description}</p>}
        </div>
        {sponsor?.image && (
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
