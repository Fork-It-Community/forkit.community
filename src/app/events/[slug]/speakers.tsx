import Image from "next/image";
import collections, { Event } from "@/content/collections";
import { ICONS } from "@/components/icons";

async function SpeakerImage(props: Readonly<{ speaker: { slug: string } }>) {
  const speaker = await collections.speaker.getBySlug(props.speaker.slug);

  const content = (
    <li key={speaker.name} className="rounded-2xl bg-gray-800 px-8 py-10">
      <Image
        className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56"
        src={speaker.imageUrl}
        alt={speaker.name}
        width={1000}
        height={500}
      />
      <h3 className="mt-6 text-2xl font-semibold leading-7 tracking-tight text-white">
        {speaker.name}
      </h3>
      <p className="mt-4 text-xl leading-6 text-gray-400">{speaker.job}</p>
      {speaker.socials && (
        <ul className="mt-6 flex justify-center gap-x-6">
          {speaker.socials.map((social) => (
            <li key={social.type}>
              <a
                href={social.href}
                className=" text-gray-400 hover:text-gray-300"
                target="_blank"
              >
                <span className="sr-only">{social.type}</span>
                {ICONS[social.type]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  return content;
}

export function Speakers(props: Readonly<{ event: Event }>) {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Meet our speakers
          </h2>
        </div>
        <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {props.event.speakers?.map((speaker) => (
            <SpeakerImage
              speaker={{
                slug: speaker,
              }}
              key={speaker}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
