import { Features } from "./features";
import { Hero } from "./hero";
// import { Sponsors } from "./sponsors";
import { Organizers } from "./organizers";
import { About } from "./about";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Organizers />
      {/* <Sponsors /> */}
    </>
  );
}
