import type { Metadata } from "next";
import { PortfolioHeader } from "@/components/sections/portfolio-header";
import { PortfolioGallery } from "@/components/sections/portfolio-gallery";
import { FinalCta } from "@/components/sections/final-cta";
import { portfolioCategories } from "@/config/portfolio-categories";
import { getPortfolioPhotos } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Découvrez les réalisations d’ADSTUDIOZ : événements, publicité et communication d’entreprise, production audiovisuelle, création de contenu et photographie.",
};

export default async function PortfolioPage() {
  const photos = await getPortfolioPhotos();

  return (
    <main>
      <PortfolioHeader />
      <PortfolioGallery
        photos={photos}
        categories={portfolioCategories}
        activeSlug="all"
      />
      <FinalCta />
    </main>
  );
}