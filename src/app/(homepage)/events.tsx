import { Button } from "@/components/ui/button";
import collections from "@/content/collections";
import Image from "next/image";

export const Events = async () => {
  const events = await collections.event.getAll();

  return (
    <section className="bg-gray-950 py-24 sm:py-32 relative overflow-hidden">
      <div className="relative mx-auto max-w-5xl flex flex-col gap-12 px-6">
        <h2 className="text-3xl font-bold sm:text-4xl text-center font-heading">
          <span className="text-primary">Fork it! Community</span> upcoming
          events
        </h2>
        {events.map((event) => (
          <article
            className="rounded-md border border-solid border-gray-800 flex flex-col"
            key={event.name}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="p-4">
                <h3 className="text-4xl text-primary font-heading">
                  {event.name}
                </h3>
                {event.date && (
                  <time
                    className="text-gray-300"
                    dateTime={event.date.toISOString()}
                  >
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "full",
                    }).format(event.date)}
                  </time>
                )}
                {event.excerpt && <p className="mt-4">{event.excerpt}</p>}
              </div>

              {event.image && (
                <div className="m-auto logo-mask sm:min-w-48">
                  <Image
                    priority
                    className="aspect-[3/2] w-full bg-primary text-gray-900 object-cover"
                    src={event.image?.src ?? ""}
                    width={1000}
                    height={1000}
                    alt={event.image?.alt}
                  />
                </div>
              )}
            </div>
            {event.cfp && (
              <footer className="p-4">
                <Button asChild>
                  <a href={event.cfp.href}>CFP</a>
                </Button>
              </footer>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
