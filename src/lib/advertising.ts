import { promises as fs } from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

export type AdvertisingImage = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const DIR = path.join(process.cwd(), "public", "images", "publicite");

/**
 * Lit toutes les images du dossier public/images/publicite,
 * triées par nom de fichier (01-, 02-, etc.).
 */
export async function getAdvertisingImages(): Promise<AdvertisingImage[]> {
  "use cache";

  let names: string[];
  try {
    names = await fs.readdir(DIR);
  } catch {
    return []; // dossier absent : aucune image
  }

  const files = names
    .filter((name) => EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "fr", { numeric: true }));

  const images = await Promise.all(
    files.map(async (name, index): Promise<AdvertisingImage | null> => {
      try {
        const buffer = await fs.readFile(path.join(DIR, name));
        const { width, height, orientation } = imageSize(buffer);

        // Orientation EXIF 5 à 8 : largeur et hauteur inversées
        const rotated = typeof orientation === "number" && orientation >= 5;

        return {
          id: name,
          src: `/images/publicite/${encodeURIComponent(name)}`,
          width: rotated ? height : width,
          height: rotated ? width : height,
          alt: `Visuel publicitaire réalisé par ADSTUDIOZ — ${index + 1}`,
        };
      } catch {
        return null; // fichier illisible : ignoré
      }
    }),
  );

  return images.filter((image): image is AdvertisingImage => image !== null);
}