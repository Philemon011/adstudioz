import { cacheLife } from "next/cache";

// Chaîne YouTube « ADProduction TV » (@adproductiontv)
const CHANNEL_ID = "UCtuL2I-GOAd8_gZqKxLuSQA";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export type YouTubeVideo = {
  id: string;
  title: string;
  /** Date de publication, déjà formatée en français (ex. « 12 mars 2026 ») */
  dateLabel: string;
  thumbnail: string;
  url: string;
};

function decodeEntities(text: string) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec: string) =>
      String.fromCodePoint(parseInt(dec, 10)),
    )
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Lit le flux public de la chaîne (les 15 vidéos les plus récentes).
 * Mis en cache environ une heure. En cas d'échec, une erreur est levée :
 * un échec n'est donc jamais conservé en cache.
 */
async function fetchVideos(): Promise<YouTubeVideo[]> {
  "use cache";
  cacheLife("hours");

  const response = await fetch(FEED_URL);
  if (!response.ok) {
    throw new Error(`Flux YouTube indisponible (${response.status})`);
  }

  const xml = await response.text();
  const entries = xml.split("<entry>").slice(1);

  const videos: YouTubeVideo[] = [];
  for (const entry of entries) {
    const id = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(entry)?.[1];
    const title = /<title>([^<]*)<\/title>/.exec(entry)?.[1];
    const published = /<published>([^<]+)<\/published>/.exec(entry)?.[1];
    if (!id || !title) continue;

    videos.push({
      id,
      title: decodeEntities(title).trim(),
      dateLabel: published ? formatDate(published) : "",
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${id}`,
    });
  }

  return videos;
}

/**
 * Retourne la liste des vidéos, ou null si YouTube est injoignable.
 */
export async function getYouTubeVideos(): Promise<YouTubeVideo[] | null> {
  try {
    return await fetchVideos();
  } catch {
    return null;
  }
}