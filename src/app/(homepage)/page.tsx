import { Features } from "@/app/(homepage)/features";
import { Footer } from "@/app/footer";
import { Hero } from "@/app/(homepage)/hero";
import { Sponsors } from "@/app/(homepage)/sponsors";
import { Team } from "@/app/(homepage)/team";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Team />
      <Sponsors />
    </>
  );
}
