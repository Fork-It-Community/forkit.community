import collections, { Event } from "@/content/collections";
import Image from "next/image";
import DefaultImg from "@/../public/speakers/speaker-default.jpg";
import Link from "next/link";
import { LanguageBadge } from "@/components/language-badge";

async function Talk(props: Readonly<{ talk: { slug: string }; event: Event }>) {
  const talk = await collections.talk.getBySlug(props.talk.slug);
  const speakers = await Promise.all(
    talk.speakers.map(
      async (speaker) => await collections.speaker.getBySlug(speaker),
    ),
  );
  const hosts = await Promise.all(
    (talk.hosts ?? []).map(
      async (host) => await collections.speaker.getBySlug(host),
    ),
  );

  const content = (
    <div className="mx-auto flex w-full max-w-[60ch] gap-4">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Link
            className="text-lg underline hover:no-underline"
            href={`${props.event.metadata.slug}/talks/${talk.metadata.slug}`}
          >
            <h3 className="font-semibold">{talk.title}</h3>
          </Link>
          <div className="flex flex-wrap gap-2">
            <div className="flex gap-2">
              {[...hosts, ...speakers].map((speaker) => (
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
            <p className="min-w-48 max-w-full flex-1 text-sm text-gray-300">
              {hosts.length ? (
                <>
                  hosted by {hosts.map((host) => host.name).join(", ")} with{" "}
                  {speakers.map((speaker) => speaker.name).join(", ")}
                </>
              ) : (
                <>by {speakers.map((speaker) => speaker.name).join(", ")}</>
              )}
            </p>
          </div>
        </div>
        <LanguageBadge language={talk.language} />
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
            All talks will be in English (with French subtitles) <br />
            or in French (with English subtitles)
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
