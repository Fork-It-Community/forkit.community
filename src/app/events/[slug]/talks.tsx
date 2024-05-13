import collections, { Event } from "@/content/collections";
import Image from "next/image";
import DefaultImg from "@/../public/speakers/speaker-default.jpg";
import Link from "next/link";

async function Talk(props: Readonly<{ talk: { slug: string }; event: Event }>) {
  const talk = await collections.talk.getBySlug(props.talk.slug);
  const speakers = [];
  for (let i = 0; i < talk.speakers.length; i++) {
    speakers[i] = await collections.speaker.getBySlug(talk.speakers[i]);
  }
  const content = (
    <div className="mx-auto flex w-full max-w-[60ch] gap-4">
      <div className="flex flex-1 flex-col gap-1">
        <Link
          className="text-lg hover:underline"
          href={`${props.event.metadata.slug}/talks/${talk.metadata.slug}`}
        >
          <h3 className="font-semibold">{talk.title}</h3>
        </Link>
        <div className="flex flex-row gap-2">
          <div className="flex gap-2">
            {speakers.map((speaker) => (
              <Image
                key={speaker.name}
                className="aspect-square h-12 w-12 rounded-lg"
                src={speaker.imageUrl ?? DefaultImg}
                alt={speaker.name}
                width={600}
                height={600}
                sizes="600px"
              />
            ))}
          </div>
          <p className="flex-1 text-sm text-gray-300">
            by {speakers.map((speaker) => speaker.name).join(", ")}
          </p>
        </div>
        <p className="text-sm text-gray-300">
          Talk will be given in {talk.language}
        </p>
      </div>
    </div>
  );

  return content;
}

export function Talks(props: Readonly<{ event: Event }>) {
  return (
    <div className="bg-gray-900 py-24 sm:py-32" id="talks">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-2 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Talks
          </h2>
          <p className="text-balance text-sm text-gray-300">
            All talks will be in 🇬🇧 English (with French subtitles) <br />
            or in 🇫🇷 French (with English subtitles)
          </p>
        </div>
        <div className="mx-auto mt-12 flex flex-col gap-10 lg:grid lg:grid-cols-2 xl:grid-cols-3">
          {props.event.talks?.map((talk) => (
            <Talk
              talk={{
                slug: talk,
              }}
              event={props.event}
              key={talk}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
