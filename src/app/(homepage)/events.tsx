import { Button } from "@/components/ui/button";
import collections from "@/content/collections";
import Image from "next/image";
import Link from "next/link";

export const Events = async () => {
  const events = await collections.event.getAll();

  return (
    <section className="relative overflow-hidden bg-gray-950 py-24 sm:py-32">
      <div className="relative mx-auto flex max-w-5xl flex-col gap-12 px-6">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
          <span className="text-primary">Fork it! Community</span> upcoming
          events
        </h2>
        {events.map((event) => (
          <article className="flex flex-col rounded-md" key={event.name}>
            <div className="flex flex-col sm:flex-row">
              <div className="flex flex-col gap-4 p-4">
                <h3 className="flex flex-col">
                  {event.date && (
                    <time
                      className="font-heading text-3xl text-primary"
                      dateTime={event.date.toISOString()}
                    >
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "full",
                      }).format(event.date)}
                    </time>
                  )}
                  <span className="text-lg font-bold text-white ">
                    {event.name}
                  </span>
                </h3>
                {event.excerpt && (
                  <p className="text-sm text-gray-300">{event.excerpt}</p>
                )}
                <div className="flex flex-row gap-4">
                  <Button asChild>
                    <Link
                      href={`/events/${event.metadata.slug}`}
                      title="Homepage of the event"
                    >
                      Learn more
                    </Link>
                  </Button>
                </div>
              </div>

              {event.image && (
                <div className="logo-mask m-auto sm:min-w-48">
                  <Image
                    priority
                    className="aspect-[3/2] w-full bg-primary object-cover text-gray-900"
                    src={event.image?.src ?? ""}
                    width={1000}
                    height={1000}
                    alt={event.image?.alt}
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
