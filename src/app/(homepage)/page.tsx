import { Features } from "./features";
import { Hero } from "./hero";
// import { Sponsors } from "./sponsors";
import { Organizers } from "./organizers";
import { About } from "./about";
import { Events } from "@/app/(homepage)/events";
import { Banner } from "@/app/(homepage)/banner";
import { Partners } from "@/app/(homepage)/partners";

export default function Home() {
  return (
    <>
      <Banner />
      <Hero />
      <About />
      <Events />
      <Features />
      <Organizers />
      <Partners />
      {/* <Sponsors /> */}
    </>
  );
}
