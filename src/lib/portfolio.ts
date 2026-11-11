import { promises as fs } from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import {
  portfolioCategories,
  type PortfolioCategory,
} from "@/config/portfolio-categories";

export type PortfolioPhoto = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: string;
  categoryLabel: string;
};

const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const ROOT = path.join(process.cwd(), "public", "images", "portfolio");

async function readCategory(
  category: PortfolioCategory,
): Promise<PortfolioPhoto[]> {
  const dir = path.join(ROOT, category.slug);

  let names: string[];
  try {
    names = await fs.readdir(dir);
  } catch {
    return []; // dossier absent : catégorie vide
  }

  const files = names
    .filter((name) => EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "fr", { numeric: true }));

  const photos = await Promise.all(
    files.map(async (name, index): Promise<PortfolioPhoto | null> => {
      try {
        const buffer = await fs.readFile(path.join(dir, name));
        const { width, height, orientation } = imageSize(buffer);

        // Photos de téléphone : l'orientation EXIF 5 à 8 inverse largeur et hauteur
        const rotated = typeof orientation === "number" && orientation >= 5;

        return {
          id: `${category.slug}/${name}`,
          src: `/images/portfolio/${category.slug}/${encodeURIComponent(name)}`,
          width: rotated ? height : width,
          height: rotated ? width : height,
          alt: `Réalisation ADSTUDIOZ — ${category.label} ${index + 1}`,
          category: category.slug,
          categoryLabel: category.label,
        };
      } catch {
        return null; // fichier illisible : ignoré
      }
    }),
  );

  return photos.filter((photo): photo is PortfolioPhoto => photo !== null);
}

/**
 * Toutes les photos, catégories mélangées à tour de rôle
 * (une photo de chaque catégorie, puis la suivante, etc.).
 */
export async function getPortfolioPhotos(): Promise<PortfolioPhoto[]> {
  "use cache";

  const lists = await Promise.all(portfolioCategories.map(readCategory));
  const longest = Math.max(0, ...lists.map((list) => list.length));

  const mixed: PortfolioPhoto[] = [];
  for (let i = 0; i < longest; i++) {
    for (const list of lists) {
      if (list[i]) mixed.push(list[i]);
    }
  }
  return mixed;
}