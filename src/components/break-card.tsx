import type { Event } from "@/schemas/events";

import { cn } from "@/lib/utils";
import type { CollectionEntry } from "astro:content";

type BreakCardProps = {
  schedule: Event["schedule"][number];
  sponsor?: CollectionEntry<"partners">["data"];
};

export const BreakCard = (props: Readonly<BreakCardProps>) => {
  return (
    <div>
      <div className="border-neutral-700 bg-neutral-800 flex w-full flex-[4] flex-row justify-between gap-2 rounded-lg border-2 px-4 py-4">
        <div className="flex flex-col justify-center">
          <p className="text-xl font-semibold">{props.schedule.name}</p>
          {props.schedule.description && <p>{props.schedule.description}</p>}
        </div>
        {props.sponsor && (
          <div className="flex flex-col gap-2">
            <p className="text-neutral-400 text-xs">Sponsored by</p>
            <div
              className={cn(
                "w-20 overflow-hidden rounded-md border-2 border-gray-100",
                {
                  "hover:border-gray-200": !!props.sponsor.href,
                },
              )}
            >
              {/* Image sponsor */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
