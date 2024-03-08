import collections, { Event } from "@/content/collections";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

async function SponsorImage(
  props: Readonly<{ sponsor: { slug: string; level: string } }>,
) {
  const sponsor = await collections.sponsor.getBySlug(props.sponsor.slug);

  const content = (
    <div
      className={cn("overflow-hidden rounded-md border-2 border-gray-100", {
        "hover:border-gray-200": !!sponsor.href,
      })}
    >
      <Image
        className="w-full"
        src={sponsor.image.src}
        alt={sponsor.image.alt}
        width={1000}
        height={500}
      />
    </div>
  );

  if (!sponsor.href) {
    return content;
  }

  return (
    <Link
      href={sponsor.href ?? "#"}
      title={sponsor.name}
      target="_blank"
      rel="noreferer"
    >
      {content}
    </Link>
  );
}

function SponsorImagePlaceholder(
  props: Readonly<{ prospectus: Event["prospectus"] }>,
) {
  return (
    <Link
      href={props.prospectus?.href ?? "#"}
      title={props.prospectus?.title}
      target="_blank"
      rel="noreferer"
      className="flex w-full items-center justify-center overflow-hidden rounded-md border-2 border-gray-100 bg-gray-50 p-4 text-center text-sm font-medium text-gray-500 hover:text-gray-800"
    >
      <div>Become sponsor</div>
    </Link>
  );
}

export function Sponsors(props: Readonly<{ event: Event }>) {
  return (
    <div className="bg-white py-20 text-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto pb-4">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-gray-800 sm:text-4xl md:text-4xl">
            Sponsors
          </h2>
        </div>
        {props.event.sponsoringLevels.map((level) => {
          const levelSponsors =
            props.event.sponsors?.filter(
              (sponsor) => sponsor.level === level,
            ) ?? [];
          return (
            <div key={level} className="bg-white py-8">
              <div className="mx-auto max-w-7xl">
                <h3 className="mb-4 font-heading text-2xl font-bold capitalize tracking-tight text-gray-800">
                  {level.toLocaleLowerCase()}
                </h3>
                <div
                  className={cn(
                    "grid grid-cols-2 gap-2 sm:mx-0 sm:grid-cols-3 lg:grid-cols-4",
                    level === "SILVER" && "sm:grid-cols-2 lg:grid-cols-3",
                  )}
                >
                  {levelSponsors.map((sponsor) => (
                    <SponsorImage key={sponsor.slug} sponsor={sponsor} />
                  ))}
                  {levelSponsors.length <= 1 && (
                    <SponsorImagePlaceholder
                      prospectus={props.event.prospectus}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
