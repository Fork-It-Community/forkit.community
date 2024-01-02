import { Features } from "@/app/features";
import { Footer } from "@/app/footer";
import { Hero } from "@/app/hero";
import { Sponsors } from "@/app/sponsors";
import { Team } from "@/app/team";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Team />
      <Sponsors />
      <Footer />
    </>
  );
}
