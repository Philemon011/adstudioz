import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { VideosHeader } from "@/components/sections/videos-header";
import { VideosGallery } from "@/components/sections/videos-gallery";
import { FinalCta } from "@/components/sections/final-cta";
import { getYouTubeVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Contenu numérique",
  description:
    "Les vidéos de la chaîne YouTube ADProduction TV : interviews, films et contenus numériques d’ADSTUDIOZ.",
};

export default async function DigitalContentPage() {
  const videos = await getYouTubeVideos();

  const channelUrl =
    siteConfig.social.find((link) => link.id === "youtube")?.href ??
    "https://www.youtube.com/@adproductiontv";

  return (
    <main>
      <VideosHeader channelUrl={channelUrl} />
      <VideosGallery videos={videos} channelUrl={channelUrl} />
      <FinalCta />
    </main>
  );
}