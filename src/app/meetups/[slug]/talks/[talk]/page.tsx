import collections from "@/content/collections";
import Image from "next/image";
import DefaultImg from "@/../public/speakers/speaker-default.jpg";
import { formatDateTime } from "@/lib/utils";
import { ICONS } from "@/components/icons";
import { LanguageBadge } from "@/components/language-badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";

type TalkPageProps = Readonly<{
  params: { talk: string; slug: string };
}>;

export async function generateStaticParams() {
  const meetups = await collections.meetup.getAll();

  return meetups
    .filter((meetup) => meetup.published)
    .flatMap((meetup) =>
      meetup.talks?.map((talk) => ({
        slug: meetup.metadata.slug,
        talk: talk,
      })),
    );
}

export async function generateMetadata(
  { params }: TalkPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const meetup = await collections.meetup.getBySlug(params.slug);
  const talk = await collections.talk.getBySlug(params.talk);

  const title = (await parent).title?.absolute ?? "";

  return {
    title: `${talk.title} | ${title}`,
    alternates: {
      canonical: `/meetups/${meetup.metadata.slug}/talks/${talk.metadata.slug}`,
    },
  };
}

export default async function TalkPage({ params }: TalkPageProps) {
  const meetup = await collections.meetup.getBySlug(params.slug);
  const talk = await collections.talk.getBySlug(params.talk);

  const Content = (await import(`@/content/${talk.metadata.filePath}`)).default;

  const speakers = await Promise.all(
    talk.speakers.map(async (speaker) => {
      const json = await collections.speaker.getBySlug(speaker);
      const bio = (await import(`@/content/speaker/${speaker}.mdx`)).default;
      return { ...json, bio, type: "speaker" };
    }),
  );

  const hosts = await Promise.all(
    (talk.hosts ?? []).map(async (host) => {
      const json = await collections.speaker.getBySlug(host);
      const bio = (await import(`@/content/speaker/${host}.mdx`)).default;
      return { ...json, bio, type: "host" };
    }),
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="m-4 my-8 text-center font-heading text-3xl font-bold tracking-tight text-white sm:text-3xl">
        {meetup.date && (
          <>
            <span className="text-primary">{formatDateTime(meetup.date)}</span>{" "}
          </>
        )}
        {meetup.name}
      </h1>

      <div className="mx-auto flex max-w-5xl flex-col gap-8 p-4">
        <div className="prose prose-sm prose-invert">
          <h2>{talk.title}</h2>
          <Content />
        </div>

        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <LanguageBadge language={talk.language} />
              {talk.replayUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-fit"
                >
                  <Link
                    href={talk.replayUrl}
                    className="flex gap-2"
                    target="_blank"
                  >
                    Replay
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              )}
          <div className="flex flex-row items-center justify-between gap-4">
            {talk.feedback && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full sm:w-fit"
              >
                <Link
                  href={talk.feedback.link}
                  className="flex gap-2"
                  target="_blank"
                >
                  Give feedback!
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 pb-16">
          {[...hosts, ...speakers].map((speaker) => (
            <div key={speaker.metadata.slug} className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <Image
                  className="aspect-square h-28 w-28 rounded-lg"
                  src={speaker.imageUrl ?? DefaultImg}
                  alt={speaker.name}
                  width={200}
                  height={200}
                  sizes="200px"
                />
                <div className="flex flex-col">
                  <p className="font-heading text-lg font-semibold leading-6 text-primary">
                    {speaker.name}
                  </p>
                  {speaker.type === "host" && (
                    <p className="text-sm font-semibold text-gray-300">
                      Roundtable host
                    </p>
                  )}
                  {speaker.job && (
                    <p className="text-sm text-gray-300">{speaker.job}</p>
                  )}
                  {speaker.company && (
                    <p className="mt-1 font-medium">{speaker.company.title}</p>
                  )}
                  {speaker.socials && (
                    <ul className="mt-2 flex gap-x-2">
                      {speaker.socials.map((social) => (
                        <li key={social.type}>
                          <a
                            href={social.href}
                            className="text-gray-400 transition hover:text-primary"
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
              </div>
              <div className="prose prose-sm prose-invert my-auto md:prose-base prose-headings:scroll-m-10">
                <speaker.bio />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
