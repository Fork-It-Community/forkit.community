import { Prose } from "@/components/prose";
import collections from "@/content/collections";
import { getMDXContent } from "@/lib/mdx";
import { Metadata, ResolvingMetadata } from "next";
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

export async function generateMetadata(
  { params }: EventPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const event = await collections.event.getBySlug(params.slug);

  const title = (await parent).title?.absolute ?? "";

  return {
    title: `${event.title} | ${title}`,
    openGraph: {
      url: `/events/${event.metadata.slug}/informations`,
    },
    alternates: {
      canonical: `/events/${event.metadata.slug}/informations`,
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await collections.event.getBySlug(params.slug);

  if (!event.published) {
    return notFound();
  }

  const mdxContent = await getMDXContent(
    import(`@/content/event/${event.metadata.slug}/informations.mdx`),
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
