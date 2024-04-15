import collections, { Event } from "@/content/collections";

async function Talk(props: Readonly<{ talk: { slug: string } }>) {
  const talk = await collections.talk.getBySlug(props.talk.slug);

  const content = <div className="flex gap-3">{talk.title}</div>;

  return content;
}

export function Talks(props: Readonly<{ event: Event }>) {
  return (
    <div className="bg-gray-950 py-24 sm:py-32" id="talks">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Talks
          </h2>
        </div>
        <div className="mx-auto mt-12 flex flex-col">
          {props.event.talks?.map((talk) => (
            <Talk
              talk={{
                slug: talk,
              }}
              key={talk}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
