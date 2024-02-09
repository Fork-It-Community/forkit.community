import { Header } from "@/app/events/[slug]/header";
import { Hero } from "@/app/events/[slug]/hero";
import { Sponsorship } from "@/app/events/[slug]/sponsorship";
import collections from "@/content/collections";
import { formatDateTime } from "@/lib/utils";

export default async function EventPage({
  params,
}: Readonly<{
  params: { slug: string };
}>) {
  const event = await collections.event.getBySlug(params.slug);

  const Content = (await import(`@/content/${event.metadata.filePath}`))
    .default;

  const date = event.date ? formatDateTime(event.date) : undefined;

  return (
    <>
      <Header event={event} />
      <Hero event={{ ...event, date }} />
      <Content />
      <Sponsorship event={event} />
    </>
  );
}
