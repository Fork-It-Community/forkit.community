import { Features } from "./features";
import { Hero } from "./hero";
import { Organizers } from "./organizers";
import { About } from "./about";
import { UpcomingEvents } from "@/app/(homepage)/upcoming-events";
import { Banner } from "@/app/(homepage)/banner";
import { Partners } from "@/app/(homepage)/partners";
import { getNextEvent } from "@/lib/server";
import { PastEvents } from "@/app/(homepage)/past-events";

export default async function Home() {
  const nextEvent = await getNextEvent();
  return (
    <>
      {nextEvent && <Banner nextEvent={nextEvent} />}
      <Hero />
      <About />
      {nextEvent && <UpcomingEvents />}
      <Features />
      <PastEvents />
      <Organizers />
      <Partners />
    </>
  );
}
