import type { Metadata } from "next";
import { ServicesHeader } from "@/components/sections/services-header";
import { ServicesList } from "@/components/sections/services-list";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Couverture d’événements, publicité et communication d’entreprise, production audiovisuelle, création de contenu et photographie à Porto-Novo et Cotonou.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHeader />
      <ServicesList />
      <FinalCta />
    </main>
  );
}