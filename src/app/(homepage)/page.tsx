import { Features } from "./features";
import { Hero } from "./hero";
import { Organizers } from "./organizers";
import { About } from "./about";
import { UpcomingEvents } from "@/app/(homepage)/upcomingEvents";
import { Banner } from "@/app/(homepage)/banner";
import { Partners } from "@/app/(homepage)/partners";
import { getNextEvent } from "@/lib/server";
import { PastEvents } from "./pastEvents";

export default async function Home() {
  const nextEvent = await getNextEvent();
  return (
    <>
      {nextEvent && <Banner nextEvent={nextEvent} />}
      <Hero />
      <About />
      <UpcomingEvents />
      <Features />
      <PastEvents />
      <Organizers />
      <Partners />
    </>
  );
}
