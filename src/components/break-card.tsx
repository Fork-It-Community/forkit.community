import type { Event } from "@/content/events/events";
import { cn } from "@/lib/utils";
import type { CollectionEntry } from "astro:content";

type BreakCardProps = {
  break: Event["schedule"][number];
  sponsor?: CollectionEntry<"sponsors"> | undefined;
};

export const BreakCard = (props: Readonly<BreakCardProps>) => {
  return (
    <div className="flex w-full flex-row justify-between gap-2 rounded-lg border-2 border-neutral-700 bg-neutral-800 px-4 py-4">
      <div className="flex flex-col justify-center">
        <p className="text-xl font-semibold">{props.break.name}</p>
        {props.break.description && <p>{props.break.description}</p>}
      </div>
      {props.sponsor && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-neutral-400">Sponsored by</p>
          <div
            className={cn(
              "w-20 overflow-hidden rounded-md border-2 border-gray-100",
              {
                "hover:border-gray-200": !!props.sponsor.data.href,
              },
            )}
          >
            <img
              src={props.sponsor.data.image.src}
              alt={props.sponsor.data.image.alt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};
