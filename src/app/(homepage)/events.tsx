import { Button } from "@/components/ui/button";
import collections from "@/content/collections";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export const Events = async () => {
  const events = await collections.event.getAll();

  return (
    <section className="relative overflow-hidden bg-gray-950 py-24 sm:py-32">
      <div className="relative mx-auto flex max-w-4xl flex-col gap-16 px-6">
        <h2 className="text-center font-heading text-3xl font-bold sm:text-4xl">
          <span className="text-primary">Fork it! Community</span> upcoming
          events
        </h2>
        {events.map((event) => (
          <Link
            href={`/events/${event.metadata.slug}`}
            title="Homepage of the event"
            key={event.name}
          >
            <article className="flex flex-col rounded-lg border-2 border-gray-700 bg-gray-900 p-6 md:p-8">
              <div className="flex flex-col justify-between gap-6 sm:flex-row">
                <div className="flex flex-col gap-6">
                  <h3 className="flex flex-col font-heading text-3xl text-primary">
                    {event.title}
                  </h3>
                  <div className="flex flex-col gap-4">
                    {event.date && (
                      <div className="flex items-center gap-2">
                        <Calendar
                          className="h-5 w-5 flex-none"
                          aria-hidden="true"
                        />
                        <time dateTime={event.date.toISOString()}>
                          {new Intl.DateTimeFormat("en-US", {
                            dateStyle: "full",
                          }).format(event.date)}
                        </time>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin
                          className="h-5 w-5 flex-none "
                          aria-hidden="true"
                        />
                        {event.location?.name}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row gap-4">
                    <Button asChild>
                      <span>Learn more</span>
                    </Button>
                  </div>
                </div>

                {event.image && (
                  <div className="logo-mask my-auto sm:min-w-48 ">
                    <Image
                      priority
                      className="aspect-[3/2] h-[200px] w-[300px] bg-primary object-cover text-gray-900"
                      src={event.image?.src ?? ""}
                      width={300}
                      height={300}
                      alt={event.image?.alt}
                    />
                  </div>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};
