import { Hero } from "@/app/meetups/[slug]/hero";
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

export type MeetupPageProps = Readonly<{
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

export default async function MeetupPage({ params }: MeetupPageProps) {
  const meetup = await collections.meetup.getBySlug(params.slug);

  if (!meetup.published) {
    return notFound();
  }

  const Content = (await import(`@/content/${meetup.metadata.filePath}`))
    .default;

  const location: Place | undefined = meetup.location
    ? {
        "@type": "Place",
        address: meetup.location.address,
        name: meetup.location.name,
      }
    : undefined;

  const speakers = meetup.speakers
    ? await Promise.all(
        meetup.speakers.map(
          async (speakerSlug) =>
            await collections.speaker.getBySlug(speakerSlug),
        ),
      )
    : undefined;

  const jsonLd: WithContext<Event> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${meetup.date ? formatDateTime(meetup.date) + " " : ""}${meetup.name}`,
    startDate: meetup.date?.toISOString(),
    endDate: meetup.date?.toISOString(),
    description: meetup.excerpt,
    location,
    offers: meetup.tickets?.offers.map((offer) => ({
      "@type": "Offer",
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      url: meetup.tickets?.href,
      availability: `https://schema.org/${offer.availability}`,
      validFrom: offer.validFrom.toISOString(),
    })),
    eventStatus: `https://schema.org/${meetup.status}`,
    image: meetup.image?.src,
    organizer: {
      "@type": "Organization",
      name: "Fork it! Community",
      url: "https://www.forkit.community",
    },
    eventAttendanceMode: meetup.attendanceMode,
    performer: speakers?.map((speaker) => ({
      "@type": "Person",
      name: speaker.name,
    })),
  };

  return (
    <>
      <Hero meetup={meetup} />
      <Content />
      <ScheduleSection meetup={meetup} />
      {!!meetup.speakers && <Speakers meetup={meetup} />}
      {!!meetup.talks && <Talks meetup={meetup} />}
      {!!meetup.sponsoringLevels && !!meetup.sponsors && (
        <Sponsors meetup={meetup} />
      )}
      <Partners />
      {meetup.faq && <Faq meetup={meetup} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
