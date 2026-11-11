import type { Metadata } from "next";
import { AdvertisingHeader } from "@/components/sections/advertising-header";
import { AdvertisingGallery } from "@/components/sections/advertising-gallery";
import { FinalCta } from "@/components/sections/final-cta";
import { getAdvertisingImages } from "@/lib/advertising";

export const metadata: Metadata = {
  title: "Publicité",
  description:
    "Visuels publicitaires et communication d’entreprise réalisés par ADSTUDIOZ pour des entreprises et des marques, à Porto-Novo et Cotonou.",
};

export default async function AdvertisingPage() {
  const images = await getAdvertisingImages();

  return (
    <main>
      <AdvertisingHeader />
      <AdvertisingGallery images={images} />
      <FinalCta />
    </main>
  );
}