import collections from "@/content/collections";
import { Schedule } from "../schedule";
import { formatDateTime } from "@/lib/utils";
import { FeedbackCTA } from "@/components/feedback-cta";
import { Metadata, ResolvingMetadata } from "next";

type SchedulePageProps = Readonly<{
  params: { slug: string };
}>;

export async function generateStaticParams() {
  const meetups = await collections.meetup.getAll();

  return meetups
    .filter((meetup) => meetup.published)
    .map((meetup) => ({
      slug: meetup.metadata.slug,
    }));
}

export async function generateMetadata(
  { params }: SchedulePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const meetup = await collections.meetup.getBySlug(params.slug);

  const title = (await parent).title?.absolute ?? "";

  return {
    title: `${meetup.title} | ${title}`,
    openGraph: {
      url: `/meetups/${meetup.metadata.slug}/schedule`,
    },
    alternates: {
      canonical: `/meetups/${meetup.metadata.slug}/schedule`,
    },
  };
}

export default async function SchedulePage({ params }: SchedulePageProps) {
  const meetup = await collections.meetup.getBySlug(params.slug);
  return (
    <div className="bg-gray-950">
      <h1 className="mt-8 text-center font-heading text-3xl font-bold tracking-tight text-white sm:text-3xl">
        {meetup.date && (
          <span className="text-primary">{formatDateTime(meetup.date)}</span>
        )}{" "}
        {meetup.name}
      </h1>
      <div className="bg-gray-950">
        <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-24 sm:py-32 lg:px-8">
          <Schedule meetup={meetup} />
          {meetup.feedback && <FeedbackCTA href={meetup.feedback.link} />}
        </div>
      </div>
    </div>
  );
}
