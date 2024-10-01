import { Hero } from "@/app/events/[slug]/hero";
import { Sponsorship } from "@/app/events/[slug]/sponsorship";
import collections from "@/content/collections";
import { formatDateTime } from "@/lib/utils";

import { notFound } from "next/navigation";
import { Sponsors } from "./sponsors";
import { Speakers } from "./speakers";
import { Faq } from "./faq";
import { ScheduleSection } from "./schedule";
import { Talks } from "./talks";
import type { WithContext, Event, Place } from "schema-dts";
import { Partners } from "@/app/(homepage)/partners";
import { GLOBALPARTNERSSLUGS } from "@/lib/constants";

export type EventPageProps = Readonly<{
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

  const Content = (await import(`@/content/${event.metadata.filePath}`))
    .default;

  const location: Place | undefined = event.location
    ? {
        "@type": "Place",
        address: event.location.address,
        name: event.location.name,
      }
    : undefined;

  const speakers = event.speakers
    ? await Promise.all(
        event.speakers.map(
          async (speakerSlug) =>
            await collections.speaker.getBySlug(speakerSlug),
        ),
      )
    : undefined;

  const jsonLd: WithContext<Event> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${event.date ? formatDateTime(event.date) + " " : ""}${event.name}`,
    startDate: event.date?.toISOString(),
    endDate: event.date?.toISOString(),
    description: event.excerpt,
    location,
    offers: event.tickets?.offers.map((offer) => ({
      "@type": "Offer",
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      url: event.tickets?.href,
      availability: `https://schema.org/${offer.availability}`,
      validFrom: offer.validFrom.toISOString(),
    })),
    eventStatus: `https://schema.org/${event.status}`,
    image: event.image?.src,
    organizer: {
      "@type": "Organization",
      name: "Fork it! Community",
      url: "https://www.forkit.community",
    },
    eventAttendanceMode: event.attendanceMode,
    performer: speakers?.map((speaker) => ({
      "@type": "Person",
      name: speaker.name,
    })),
  };

  return (
    <>
      <Hero event={event} />
      <Content />
      <ScheduleSection event={event} />

      {!!event.speakers && <Speakers event={event} />}
      {!!event.talks && <Talks event={event} />}
      {!!event.sponsoringLevels && !!event.sponsors && (
        <Sponsors event={event} />
      )}
      <Partners PartnersSlugs={GLOBALPARTNERSSLUGS} />
      {event.prospectus?.endDate &&
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
