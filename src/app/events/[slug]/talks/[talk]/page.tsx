import collections from "@/content/collections";
import { Metadata } from "next";

type TalkPageProps = Readonly<{
  params: { talk: string };
}>;

export async function generateStaticParams() {
  const talks = await collections.talk.getAll();

  return talks.map((talk) => ({
    talk: talk.metadata.slug,
  }));
}

export async function generateMetadata({
  params,
}: TalkPageProps): Promise<Metadata> {
  const talk = await collections.talk.getBySlug(params.talk);

  return {
    title: talk.title,
    openGraph: {
      url: `https://www.forkit.community/events/${event.metadata.slug}`,
    },
    alternates: {
      canonical: `/events/${event.metadata.slug}`,
    },
  };
}

export default function TalkPage() {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}
