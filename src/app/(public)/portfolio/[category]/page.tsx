import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PortfolioHeader } from "@/components/sections/portfolio-header";
import { PortfolioGallery } from "@/components/sections/portfolio-gallery";
import { FinalCta } from "@/components/sections/final-cta";
import { portfolioCategories } from "@/config/portfolio-categories";
import { getPortfolioPhotos } from "@/lib/portfolio";

type PageProps = { params: Promise<{ category: string }> };

// Une page par catégorie, générée à partir de portfolio-categories.ts
export function generateStaticParams() {
  return portfolioCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const found = portfolioCategories.find((item) => item.slug === category);
  if (!found) return {};

  return {
    title: `${found.label} — Portfolio`,
    description: `Réalisations ADSTUDIOZ : ${found.label}. Photographie et vidéo à Porto-Novo et Cotonou.`,
  };
}

/* Affiché un instant, le temps que la catégorie soit lue */
function PageSkeleton() {
  return (
    <main>
      <section className="px-3 pb-3 pt-24 sm:px-6 sm:pb-6 sm:pt-28">
        <div className="mx-auto h-72 max-w-7xl animate-pulse rounded-card bg-surface" />
      </section>
    </main>
  );
}

async function CategoryContent({ params }: PageProps) {
  const { category } = await params;
  const found = portfolioCategories.find((item) => item.slug === category);
  if (!found) notFound();

  const photos = await getPortfolioPhotos();

  return (
    <main>
      <PortfolioHeader
        title={`${found.label}.`}
        description={`Découvrez notre sélection « ${found.label} ». Cliquez sur une photo pour l’agrandir.`}
      />
      <PortfolioGallery
        photos={photos}
        categories={portfolioCategories}
        activeSlug={found.slug}
      />
      <FinalCta />
    </main>
  );
}

export default function PortfolioCategoryPage({ params }: PageProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}