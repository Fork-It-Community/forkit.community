import { Features } from "./features";
import { Hero } from "./hero";
import { Organizers } from "./organizers";
import { About } from "./about";
import { UpcomingEvents } from "@/app/(homepage)/upcoming-events";
import { Banner } from "@/app/(homepage)/banner";
import { Partners } from "@/app/(homepage)/partners";
import { getNextEvent, getNextMeetup } from "@/lib/server";
import { PastEvents } from "@/app/(homepage)/past-events";
import { UpcomingMeetups } from "./upcoming-meetups";
import { GLOBALPARTNERSSLUGS } from "@/lib/constants";

export default async function Home() {
  const nextEvent = await getNextEvent();
  const nextMeetup = await getNextMeetup();
  return (
    <>
      {nextEvent && <Banner nextEvent={nextEvent} />}
      <Hero />
      <About />
      {nextEvent && <UpcomingEvents />}
      {nextMeetup && <UpcomingMeetups />}
      <Features />
      <PastEvents />
      <Organizers />
      <Partners PartnersSlugs={GLOBALPARTNERSSLUGS} />
    </>
  );
}
