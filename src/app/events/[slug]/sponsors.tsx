import collections, { Event } from "@/content/collections";
import Image from "next/image";

function SponsorsRow(props: {
  level: string;
  sponsorsInfo?: Array<{ slug: string; level: string }>;
}) {
  let sponsor;
  return (
    <div className="border-t border-t-gray-800 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-3xl font-bold tracking-tight text-gray-800">
          {props.level}
        </h2>
        <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
          {props.sponsorsInfo?.map(async (sponsorInfo) => (
            <>
              {sponsorInfo.level === props.level &&
                (sponsor = await collections.sponsor.getBySlug(
                  sponsorInfo.slug,
                )) && (
                  <div key={sponsorInfo.slug} className="bg-white p-8 sm:p-10">
                    <Image
                      className="h-auto max-h-12 w-auto object-contain"
                      src={sponsor.image.src}
                      alt={sponsor.image.alt}
                      width={158}
                      height={48}
                    />
                  </div>
                )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Sponsors(props: { event: Event }) {
  const sponsorsMap = new Map();

  if (props.event.sponsors) {
    for (let sponsor of props.event.sponsors) {
      if (!props.event.sponsoringLevels.includes(sponsor.level)) {
        return;
      }

      const previous = sponsorsMap.has(sponsor.level)
        ? sponsorsMap.get(sponsor.level)
        : [];

      sponsorsMap.set(sponsor.level, [...previous, sponsor]);
    }
  }

  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl pb-16 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            Meet our sponsors
          </h2>
        </div>
        {[...sponsorsMap.entries()].map(([key, value]) => (
          <SponsorsRow key={key} level={key} sponsorsInfo={value} />
        ))}
      </div>
    </div>
  );
}
