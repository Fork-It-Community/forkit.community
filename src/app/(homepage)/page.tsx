import { Features } from "./features";
import { Hero } from "./hero";
import { Organizers } from "./organizers";
import { About } from "./about";
import { Events } from "@/app/(homepage)/events";
import { Banner } from "@/app/(homepage)/banner";
import { Partners } from "@/app/(homepage)/partners";
import { getNextEvent } from "@/lib/server";

export default async function Home() {
  const nextEvent = await getNextEvent();
  return (
    <>
      {nextEvent && <Banner nextEvent={nextEvent} />}
      <Hero />
      <About />
      <Events />
      <Features />
      <Organizers />
      <Partners />
    </>
  );
}
