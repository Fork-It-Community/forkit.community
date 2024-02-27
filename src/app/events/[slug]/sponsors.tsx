import collections, { Event } from "@/content/collections";
import Image from "next/image";

async function SponsorImage(
  props: Readonly<{ sponsor: { slug: string; level: string } }>,
) {
  const sponsor = await collections.sponsor.getBySlug(props.sponsor.slug);

  return (
    <div className="overflow-hidden rounded-md border-2 border-gray-100">
      <Image
        className="w-full object-contain"
        src={sponsor.image.src}
        alt={sponsor.image.alt}
        width={1000}
        height={500}
      />
    </div>
  );
}

async function SponsorsRow(
  props: Readonly<{
    level: string;
    sponsors?: Event["sponsors"];
  }>,
) {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 font-heading text-3xl font-bold capitalize tracking-tight text-gray-800">
          {props.level.toLocaleLowerCase()}
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:mx-0 md:grid-cols-3">
          {props.sponsors?.map((sponsor) => (
            <SponsorImage key={sponsor.slug} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Sponsors(props: Readonly<{ event: Event }>) {
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
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto pb-4">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-gray-800 sm:text-4xl md:text-4xl">
            Sponsors
          </h2>
        </div>
        {[...sponsorsMap.entries()].map(([level, sponsors]) => (
          <SponsorsRow key={level} level={level} sponsors={sponsors} />
        ))}
      </div>
    </div>
  );
}
