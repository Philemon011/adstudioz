import type { Metadata } from "next";
import { AboutHeader } from "@/components/sections/about-header";
import { AboutAudience } from "@/components/sections/about-audience";
import { WhyUs } from "@/components/sections/why-us";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "ADSTUDIOZ est une agence de production audiovisuelle, de photographie et de création de contenu à Porto-Novo et Cotonou, au Bénin.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHeader />
      <AboutAudience />
      <WhyUs />
      <FinalCta />
    </main>
  );
}