import collections from "@/content/collections";
import Image from "next/image";
import DefaultImg from "@/../public/speakers/speaker-default.jpg";
import { formatDateTime } from "@/lib/utils";
import { ICONS } from "@/components/icons";
import { LanguageBadge } from "@/components/language-badge";
import { FavoritesContextProvider } from "../../contexts/FavoritesContext";
import { FavoriteButton } from "@/components/favorite-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type TalkPageProps = Readonly<{
  params: { talk: string; slug: string };
}>;

export async function generateStaticParams() {
  const events = await collections.event.getAll();

  return events
    .filter((event) => event.published)
    .flatMap((event) =>
      event.talks?.map((talk) => ({
        slug: event.metadata.slug,
        talk: talk,
      })),
    );
}

export default async function TalkPage({ params }: TalkPageProps) {
  const event = await collections.event.getBySlug(params.slug);
  const talk = await collections.talk.getBySlug(params.talk);
  const Content = (await import(`@/content/${talk.metadata.filePath}`)).default;

  const speakers = await Promise.all(
    talk.speakers.map(
      async (speaker) => await collections.speaker.getBySlug(speaker),
    ),
  );
  let animators = undefined;
  if (talk.animators) {
    animators = await Promise.all(
      talk.animators.map(
        async (animator) => await collections.speaker.getBySlug(animator),
      ),
    );
  }
  return (
    <FavoritesContextProvider eventSlug={event.metadata.slug}>
      <div className="flex flex-col gap-6">
        <h1 className="m-4 my-8 text-center font-heading text-3xl font-bold tracking-tight text-white sm:text-3xl">
          {event.date && (
            <>
              <span className="text-primary">{formatDateTime(event.date)}</span>{" "}
            </>
          )}
          {event.name}
        </h1>

        <div className="mx-auto flex max-w-5xl flex-col gap-8 p-4">
          <div className="prose prose-sm prose-invert">
            <h2>{talk.title}</h2>
            <Content />
          </div>

          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <LanguageBadge language={talk.language} />
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
              <FavoriteButton
                talkSlug={talk.metadata.slug}
                size="sm"
                className="w-full sm:w-fit"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 pb-16">
            {animators &&
              animators.map((animators) => (
                <div
                  className="flex flex-row gap-4"
                  key={animators.metadata.slug}
                >
                  <Image
                    className="aspect-square h-28 w-28 rounded-lg"
                    src={animators.imageUrl ?? DefaultImg}
                    alt={animators.name}
                    width={200}
                    height={200}
                    sizes="200px"
                  />
                  <div className="flex flex-col">
                    <p className="font-heading text-lg font-semibold leading-6 text-primary">
                      {animators.name}
                    </p>
                    {animators.job && (
                      <p className="text-sm text-gray-300">{animators.job}</p>
                    )}
                    {animators.company && (
                      <p className="mt-1 font-medium">
                        {animators.company.title}
                      </p>
                    )}
                    {animators.socials && (
                      <ul className="mt-2 flex gap-x-2">
                        {animators.socials.map((social) => (
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
                </div>
              ))}
            {speakers.map((speaker) => (
              <div className="flex flex-row gap-4" key={speaker.metadata.slug}>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </FavoritesContextProvider>
  );
}
