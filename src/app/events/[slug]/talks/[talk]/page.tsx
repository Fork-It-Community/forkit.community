import collections from "@/content/collections";
import Image from "next/image";
import DefaultImg from "@/../public/speakers/speaker-default.jpg";

type TalkPageProps = Readonly<{
  params: { talk: string };
}>;

export async function generateStaticParams() {
  const talks = await collections.talk.getAll();

  return talks.map((talk) => ({
    talk: talk.metadata.slug,
  }));
}

export default async function TalkPage({ params }: TalkPageProps) {
  const talk = await collections.talk.getBySlug(params.talk);
  const Content = (await import(`@/content/${talk.metadata.filePath}`)).default;

  const speakers = [];
  for (let i = 0; i < talk.speakers.length; i++) {
    speakers[i] = await collections.speaker.getBySlug(talk.speakers[i]);
  }
  return (
    <div className="prose prose-sm prose-invert mx-auto max-w-5xl p-6 prose-h2:m-0">
      <h1>{talk.title}</h1>
      <Content />
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          {speakers.map((speaker) => (
            <Image
              key={speaker.name}
              className="mb-0 aspect-square h-28 w-28 rounded-lg"
              src={speaker.imageUrl ?? DefaultImg}
              alt={speaker.name}
              width={600}
              height={600}
              sizes="600px"
            />
          ))}
        </div>
        <h2>
          Presented by{" "}
          <span className="text-primary">
            {speakers.map((speaker) => speaker.name).join(", ")}
          </span>
        </h2>
      </div>
    </div>
  );
}
