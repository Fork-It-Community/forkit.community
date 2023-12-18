import { Features } from "@/components/layout/features";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/layout/hero";
import { Sponsors } from "@/components/layout/sponsors";
import { Team } from "@/components/layout/team";

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
