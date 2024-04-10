import { Header } from "@/app/events/[slug]/header";
import { Hero } from "@/app/events/[slug]/hero";
import { Sponsorship } from "@/app/events/[slug]/sponsorship";
import collections from "@/content/collections";
import { formatDateTime } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sponsors } from "./sponsors";
import { Speakers } from "./speakers";
import { Faq } from "./faq";

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

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const event = await collections.event.getBySlug(params.slug);

  return {
    title: event.title,
    description: event.excerpt,
    alternates: {
      canonical: `/events/${event.metadata.slug}`,
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await collections.event.getBySlug(params.slug);

  if (!event.published) {
    return notFound();
  }

  const Content = (await import(`@/content/${event.metadata.filePath}`))
    .default;

  const date = event.date ? formatDateTime(event.date) : undefined;

  const location = event.location
    ? {
        "@type": "Place",
        address: event.location.address,
      }
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${event.date ? formatDateTime(event.date) + " " : ""}${event.name}`,
    startDate: event.date,
    description: event.excerpt,
    location,
    offers: event.tickets?.href,
  };

  return (
    <>
      <Header event={event} />
      <Hero event={{ ...event, date }} />
      <Content />
      {!!event.speakers && <Speakers event={event} />}
      {event.prospectus &&
        event.prospectus.endDate &&
        new Date().getTime() <= event.prospectus.endDate.getTime() && (
          <div id="sponsors">
            <Sponsorship event={event} />
          </div>
        )}
      <Sponsors event={event} />
      {event.prospectus &&
        event.prospectus.endDate &&
        new Date().getTime() <= event.prospectus.endDate.getTime() && (
          <Sponsorship event={event} />
        )}
      {event.faq && <Faq event={event} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
