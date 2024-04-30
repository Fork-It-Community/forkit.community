import collections from "@/content/collections";
import { Schedule } from "../schedule";

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
  return <Schedule event={event} />;
}
