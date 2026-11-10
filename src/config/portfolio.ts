export type PortfolioItem = {
  src: string;
  alt: string;
  /** Pastille affichée sur la photo */
  category: string;
  /** Point de cadrage quand la photo est recadrée (ex. "center", "50% 30%") */
  position?: string;
};

// À adapter : décris chaque photo dans "alt" et choisis sa catégorie
// parmi les services d'ADSTUDIOZ. Si tes fichiers ne sont pas en .jpg,
// change l'extension ici.
export const portfolioHighlights: PortfolioItem[] = [
  {
    src: "/images/portfolio/portfolio-1.jpg",
    alt: "Réalisation ADSTUDIOZ — couverture d’événement",
    category: "Événements",
  },
  {
    src: "/images/portfolio/portfolio-2.jpg",
    alt: "Réalisation ADSTUDIOZ — publicité et communication",
    category: "Publicité",
  },
  {
    src: "/images/portfolio/portfolio-3.jpg",
    alt: "Réalisation ADSTUDIOZ — production audiovisuelle",
    category: "Production audiovisuelle",
  },
  {
    src: "/images/portfolio/portfolio-4.jpg",
    alt: "Réalisation ADSTUDIOZ — création de contenu",
    category: "Contenu & photographie",
  },
  {
    src: "/images/portfolio/portfolio-5.jpg",
    alt: "Réalisation ADSTUDIOZ — couverture d’événement",
    category: "Événements",
  },
  {
    src: "/images/portfolio/portfolio-6.jpg",
    alt: "Réalisation ADSTUDIOZ — création de contenu",
    category: "Contenu & photographie",
  },
];