import collections from "@/content/collections";
import { Header } from "./header";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { MeetupPageProps } from "@/app/meetups/[slug]/page";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: MeetupPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const meetup = await collections.meetup.getBySlug(params.slug).catch(() => {
    return notFound();
  });

  const title = (await parent).title?.absolute ?? "";

  return {
    title: `${meetup.title} | ${title}`,
    description: meetup.excerpt,
    openGraph: {
      url: `https://www.forkit.community/meetups/${meetup.metadata.slug}`,
    },
    alternates: {
      canonical: `/meetups/${meetup.metadata.slug}`,
    },
  };
}

type MeetupLayoutProps = Readonly<{
  children: ReactNode;
  params: { slug: string };
}>;

export default async function MeetupLayout({
  children,
  params,
}: MeetupLayoutProps) {
  try {
    const meetup = await collections.meetup.getBySlug(params.slug);

    return (
      <div className="flex flex-1 flex-col">
        <Header meetup={meetup} />
        {children}
      </div>
    );
  } catch {
    return notFound();
  }
}
