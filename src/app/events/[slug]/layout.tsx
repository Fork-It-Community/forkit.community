import collections from "@/content/collections";
import { Header } from "./header";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { EventPageProps } from "@/app/events/[slug]/page";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: EventPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const event = await collections.event.getBySlug(params.slug);

  const title = (await parent).title?.absolute ?? "";

  return {
    title: `${event.title} | ${title}`,
    description: event.excerpt,
    openGraph: {
      url: `https://www.forkit.community/events/${event.metadata.slug}`,
    },
    alternates: {
      canonical: `/events/${event.metadata.slug}`,
    },
  };
}

type EventLayoutProps = Readonly<{
  children: ReactNode;
  params: { slug: string };
}>;

export default async function EventLayout({
  children,
  params,
}: EventLayoutProps) {
  try {
    const event = await collections.event.getBySlug(params.slug);

    return (
      <div className="flex flex-1 flex-col">
        <Header event={event} />
        {children}
      </div>
    );
  } catch {
    return notFound();
  }
}
