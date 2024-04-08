import Image from "next/image";
import collections, { Event } from "@/content/collections";
import { ICONS } from "@/components/icons";

async function Speaker(props: Readonly<{ speaker: { slug: string } }>) {
  const speaker = await collections.speaker.getBySlug(props.speaker.slug);

  const content = (
    <div key={speaker.name} className="flex flex-col gap-3">
      <Image
        className="mx-auto aspect-square w-48 rounded-2xl md:w-56"
        src={speaker.imageUrl}
        alt={speaker.name}
        width={600}
        height={600}
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold leading-6 tracking-tight text-white md:text-xl">
          {speaker.name}
        </h3>
        {!!speaker.job && (
          <p className="text-md leading-5 text-gray-400">{speaker.job}</p>
        )}
        {!!speaker.company &&
          (speaker.companyHref ? (
            <a
              href={speaker.companyHref}
              target="_blank"
              className="text-sm leading-5 text-gray-400 underline hover:text-primary"
            >
              {speaker.company}
            </a>
          ) : (
            <p className="text-sm leading-5 text-gray-400">{speaker.company}</p>
          ))}
      </div>
      {speaker.socials && (
        <ul className="flex gap-x-4">
          {speaker.socials.map((social) => (
            <li key={social.type}>
              <a
                href={social.href}
                className=" text-gray-400 transition hover:text-primary"
                target="_blank"
              >
                <span className="sr-only">{social.type}</span>
                {ICONS[social.type]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return content;
}

export function Speakers(props: Readonly<{ event: Event }>) {
  return (
    <div className="bg-gray-950 py-24 sm:py-32" id="speakers">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Speakers
          </h2>
        </div>
        <div className="mx-auto mt-12 grid grid-cols-[repeat(auto-fit,minmax(7rem,12rem))] justify-center gap-6 md:grid-cols-[repeat(auto-fit,minmax(12rem,14rem))] lg:mx-0 lg:max-w-none lg:gap-8">
          {props.event.speakers?.map((speaker) => (
            <Speaker
              speaker={{
                slug: speaker,
              }}
              key={speaker}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
