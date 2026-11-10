import type { Metadata } from "next";
import { OffersHeader } from "@/components/sections/offers-header";
import { OffersGrid } from "@/components/sections/offers-grid";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Offres",
  description:
    "Découvrez les formules de couverture d’événements d’ADSTUDIOZ : photo, vidéo et prestations complètes à Porto-Novo et Cotonou.",
};

export default function OffersPage() {
  return (
    <main>
      <OffersHeader />
      <OffersGrid />
      <FinalCta />
    </main>
  );
}