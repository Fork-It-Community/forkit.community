import collections from "@/content/collections";
import { notFound } from "next/navigation";

type EventPageProps = Readonly<{
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

export default async function EventPage({ params }: EventPageProps) {
  const event = await collections.event.getBySlug(params.slug);

  if (!event.published) {
    return notFound();
  }

  const Content = (
    await import(`@/content/event/${event.metadata.slug}/informations.mdx`)
  ).default;

  return (
    <div className="prose prose-sm prose-invert mx-auto p-6 md:prose-base prose-headings:scroll-m-10 prose-headings:font-heading prose-headings:text-primary prose-h3:flex prose-h3:items-center prose-h3:gap-2 prose-h3:font-bold prose-h3:text-white">
      <Content />
    </div>
  );
}
