export type Offer = {
  slug: string;
  name: string;
  tagline: string;
  /** Prix de départ, en FCFA */
  price: number;
  features: string[];
  highlighted?: boolean;
};

// ⚠️ CONTENU PROVISOIRE
// Exemple réaliste demandé par le client. À remplacer par les vraies
// formules et les vrais tarifs d'ADSTUDIOZ avant la mise en ligne.
export const offers: Offer[] = [
  {
    slug: "essentiel",
    name: "Essentiel",
    tagline: "Pour un événement court et intimiste.",
    price: 75000,
    features: [
      "Couverture photo jusqu’à 3 heures",
      "1 photographe",
      "50 photos retouchées",
      "Livraison numérique en haute résolution",
      "Livraison sous 7 jours",
    ],
  },
  {
    slug: "signature",
    name: "Signature",
    tagline: "Photo et vidéo pour garder tous vos souvenirs.",
    price: 150000,
    highlighted: true,
    features: [
      "Photo et vidéo jusqu’à 5 heures",
      "2 intervenants",
      "100 photos retouchées",
      "Vidéo souvenir de 2 à 3 minutes",
      "Livraison numérique en haute résolution",
      "Livraison sous 10 jours",
    ],
  },
  {
    slug: "premium",
    name: "Premium",
    tagline: "Une couverture complète, du début à la fin.",
    price: 300000,
    features: [
      "Journée complète, jusqu’à 10 heures",
      "Équipe photo et vidéo",
      "200 photos retouchées",
      "Film complet de 8 à 10 minutes",
      "Teaser pour les réseaux sociaux",
      "Livraison numérique en haute résolution",
      "Livraison sous 14 jours",
    ],
  },
];

export const offersNote =
  "Tarifs indicatifs en FCFA. Le devis final dépend de la date, du lieu et de vos besoins.";

/** 75000 → "75 000" (espace insécable, identique côté serveur et navigateur) */
export function formatFcfa(amount: number) {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}