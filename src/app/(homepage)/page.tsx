import { Features } from "./features";
import { Hero } from "./hero";
// import { Sponsors } from "./sponsors";
import { Organizers } from "./organizers";
import { About } from "./about";
import { Events } from "@/app/(homepage)/events";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Events />
      <Features />
      <Organizers />
      {/* <Sponsors /> */}
    </>
  );
}
