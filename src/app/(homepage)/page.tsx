import { Features } from "@/app/(homepage)/features";
import { Hero } from "@/app/(homepage)/hero";
import { Sponsors } from "@/app/(homepage)/sponsors";
import { Organizers } from "@/app/(homepage)/organizers";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Organizers />
      <Sponsors />
    </>
  );
}
