import collections from "@/content/collections";
import { Schedule } from "../schedule";
import { formatDateTime } from "@/lib/utils";
import { FeedbackCTA } from "@/components/feedback-cta";

type SchedulePageProps = Readonly<{
  params: { slug: string };
}>;

export async function generateStaticParams() {
  const events = await collections.event.getAll();

  return events
    .filter((event) => event.published)
    .map((event) => ({
      slug: event.metadata.slug,
    }));
}

export default async function SchedulePage({ params }: SchedulePageProps) {
  const event = await collections.event.getBySlug(params.slug);
  return (
    <div className="bg-gray-950">
      <h1 className="mt-8 text-center font-heading text-3xl font-bold tracking-tight text-white sm:text-3xl">
        {event.date && (
          <span className="text-primary">{formatDateTime(event.date)}</span>
        )}{" "}
        {event.name}
      </h1>
      <div className="bg-gray-950">
        <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-24 sm:py-32 lg:px-8">
          <Schedule event={event} />
          {event.feedback && <FeedbackCTA href={event.feedback.link} />}
        </div>
      </div>
    </div>
  );
}
