import collections from "@/content/collections";

import { Prose } from "@/components/prose";
import { notFound } from "next/navigation";

type EventPageProps = Readonly<{
  params: { slug: string };
}>;

// Just want to build that page statically to avoid a file resolve issue with
// ISR. Need to improve `typed-mdx`.
export async function generateStaticParams() {
  const events = await collections.event.getAll();

  return events
    .filter((event) => event.published)
    .map((event) => ({
      slug: event.metadata.slug,
    }));
}

export default async function WeekendPage({ params }: EventPageProps) {
  const event = await collections.event.getBySlug(params.slug);

  if (!event.published) {
    return notFound();
  }

  const Content = (
    await import(`@/content/event/${event.metadata.slug}/weekend.mdx`)
  ).default;

  return (
    <Prose>
      <Content />
    </Prose>
  );
}
