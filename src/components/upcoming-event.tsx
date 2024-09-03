// import { collections } from "@/content/config";
// import { EventCard } from "@/components/event-card";

export const UpcomingEvents = () => {
  const mockupUpcomingEvents = [
    {
      title: "Fork it! Community Meetup",
      eventType: "meetup",
      date: new Date("2024-06-07T10:15:00.000Z"),
      image: {
        src: "/images/event-1.jpg",
        alt: "Fork it! Community Meetup",
      },
    },
    {
      title: "Fork it! Community Meetup",
      eventType: "meetup",
      date: new Date("2024-06-07T10:15:00.000Z"),
      image: {
        src: "/images/event-1.jpg",
        alt: "Fork it! Community Meetup",
      },
    },
    {
      title: "Fork it! Community Meetup",
      eventType: "meetup",
      date: new Date("2024-06-07T10:15:00.000Z"),
      image: {
        src: "/images/event-1.jpg",
        alt: "Fork it! Community Meetup",
      },
    },
    {
      title: "Fork it! Community Meetup",
      eventType: "meetup",
      date: new Date("2024-06-07T10:15:00.000Z"),
      image: {
        src: "/images/event-1.jpg",
        alt: "Fork it! Community Meetup",
      },
    },
    {
      title: "Fork it! Community Meetup",
      eventType: "meetup",
      date: new Date("2024-06-07T10:15:00.000Z"),
      image: {
        src: "/images/event-1.jpg",
        alt: "Fork it! Community Meetup",
      },
    },
  ];

  return (
    <div className="timeline">
    <div className="py-7">
      <div className="container mx-auto px-4">
        <ol className="relative border-l border-dashed border-neutral-500">
          {mockupUpcomingEvents.map((event) => (
            <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-1 h-1 bg-neutral-500 rounded-full -left-0.5 mt-2.5" />
              <h2
                className="text-lg font-bold text-slate-100 mb-4"
              >
                {event.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
              {/* <EventCard
                {...event}
              /> */}
            </li>
          ))}
        </ol>
      </div>
    </div>
  </div>
  )

}