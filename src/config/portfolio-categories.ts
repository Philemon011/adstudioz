export type PortfolioCategory = {
  /** Nom du dossier dans public/images/portfolio/ */
  slug: string;
  /** Nom affiché sur le site */
  label: string;
};

// Correspond aux 4 services d'ADSTUDIOZ.
// Pour ajouter une catégorie : ajoute une ligne ici et crée le dossier du même nom.
export const portfolioCategories: PortfolioCategory[] = [
  { slug: "evenements", label: "Événements" },
  { slug: "publicite", label: "Publicité & entreprise" },
  { slug: "production", label: "Production audiovisuelle" },
  { slug: "contenu", label: "Contenu & photographie" },
];