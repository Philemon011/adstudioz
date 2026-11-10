import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { WhyUs } from "@/components/sections/why-us";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Intro />
      <Services />
      <Portfolio />
      <WhyUs />
      <FinalCta />
    </main>
  );
}