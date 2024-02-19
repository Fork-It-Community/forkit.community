import collections, { Event, Sponsor } from "@/content/collections";
import Image from "next/image";

function SponsorsRow(props: {
  level: string;
  sponsorsInfo?: Array<{ slug: string; level: string }>;
}) {
  let sponsor;
  return (
    <div className="border-t border-t-gray-800 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-3xl font-bold tracking-tight text-gray-800">
          {props.level}
        </h2>
        <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
          {props.sponsorsInfo?.map(async (sponsorInfo, index) => (
            <>
              {sponsorInfo.level === props.level &&
                (sponsor = await collections.sponsor.getBySlug(
                  sponsorInfo.slug,
                )) && (
                  <div key={index} className="bg-white p-8 sm:p-10">
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

export default function Sponsors(props: { event: Event }) {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl pb-16 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            Meet our sponsors
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-800">
            Highlighting the supporters that make our events possible.
          </p>
        </div>
        {props.event.sponsoringLevels.map((level, index) => (
          <SponsorsRow
            key={index}
            level={level}
            sponsorsInfo={props.event.sponsors}
          />
        ))}
      </div>
    </div>
  );
}
