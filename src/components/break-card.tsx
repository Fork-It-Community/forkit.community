import { useEffect, useState } from "react";
import type { Event } from "@/content/events/events";
import type { Sponsor } from "@/content/sponsors/sponsors";
import { cn } from "@/lib/utils";

type BreakCardProps = {
  schedule: Event["schedule"][number];
  sponsors: SponsorStateProps[];
};

type SponsorStateProps = {
  id: string;
  collection: string;
  body: string;
  slug: string;
  data: Sponsor;
};

export const BreakCard = (props: Readonly<BreakCardProps>) => {
  const [sponsor, setSponsor] = useState<Sponsor>();

  if (!props?.schedule) {
    return;
  }

  useEffect(() => {
    if (props.schedule.sponsorSlug) {
      const foundSponsor = props.sponsors.find(
        (sponsor) => sponsor.slug === props.schedule.sponsorSlug,
      );
      setSponsor(foundSponsor?.data);
    }
  }, [props.schedule.sponsorSlug]);

  return (
    <div className="flex flex-row gap-4 lg:gap-8">
      <div className="flex w-full flex-[4] flex-row justify-between gap-2 rounded-lg border-2 border-neutral-700 bg-neutral-800 px-6 py-4">
        <div className="flex flex-col justify-center">
          <p className="text-xl font-semibold">{props?.schedule?.name}</p>
          {props?.schedule?.description && (
            <p>{props?.schedule?.description}</p>
          )}
        </div>
        {sponsor && (
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
