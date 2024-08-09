import collections from "@/content/collections";

import { Prose } from "@/components/prose";
import { notFound } from "next/navigation";
import { getMDXContent } from "@/lib/mdx";
import { Metadata, ResolvingMetadata } from "next";

type EventPageProps = Readonly<{
  params: { slug: string };
}>;

export async function generateMetadata(
  { params }: EventPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const event = await collections.event.getBySlug(params.slug);

  const title = (await parent).title?.absolute ?? "";

  return {
    title: `${event.title} | ${title}`,
    openGraph: {
      url: `https://www.forkit.community/events/${event.metadata.slug}/weekend`,
    },
    alternates: {
      canonical: `/events/${event.metadata.slug}/weekend`,
    },
  };
}

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

  const mdxContent = await getMDXContent(
    import(`@/content/event/${event.metadata.slug}/weekend.mdx`),
  );

  if (mdxContent.isError()) {
    return notFound();
  }

  const Content = mdxContent.get();

  return (
    <Prose>
      <Content />
    </Prose>
  );
}
