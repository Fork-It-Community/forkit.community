import type { Event } from "@/content/events/events";
import type { Sponsor } from "@/content/sponsors/sponsors";
import { cn } from "@/lib/utils";

type BreakCardProps = {
  schedule: Event["schedule"][number];
  sponsor?: Sponsor;
};

export const BreakCard = (props: Readonly<BreakCardProps>) => {
  return (
    <div>
      <div className="flex w-full flex-[4] flex-row justify-between gap-2 rounded-lg border-2 border-neutral-700 bg-neutral-800 px-4 py-4">
        <div className="flex flex-col justify-center">
          <p className="text-xl font-semibold">{props.schedule.name}</p>
          {props.schedule.description && <p>{props.schedule.description}</p>}
        </div>
        {props.sponsor && (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-neutral-400">Sponsored by</p>
            <div
              className={cn(
                "w-20 overflow-hidden rounded-md border-2 border-gray-100",
                {
                  "hover:border-gray-200": !!props.sponsor.href,
                },
              )}
            >
              <img
                src={props.sponsor.image.src}
                alt={props.sponsor.image.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
