export type HeroSlide = {
  src: string;
  alt: string;
  /** Nom affiché dans la barre de contrôle */
  category: string;
  /** Point de cadrage quand la photo est recadrée (ex. "center", "50% 30%") */
  position?: string;
};

// À adapter : décris chaque photo dans "alt" et indique sa catégorie.
export const heroSlides: HeroSlide[] = [
  {
    src: "/images/hero/hero-1.jpg",
    alt: "Photographie ADSTUDIOZ — réalisation 1",
    category: "Événements",
  },
  {
    src: "/images/hero/hero-2.jpg",
    alt: "Photographie ADSTUDIOZ — réalisation 2",
    category: "Portraits",
  },
  {
    src: "/images/hero/hero-3.jpg",
    alt: "Photographie ADSTUDIOZ — réalisation 3",
    category: "Mariages",
  },
  {
    src: "/images/hero/hero-4.jpg",
    alt: "Photographie ADSTUDIOZ — réalisation 4",
    category: "Marques",
  },
  {
    src: "/images/hero/hero-5.jpg",
    alt: "Photographie ADSTUDIOZ — réalisation 5",
    category: "Vidéo",
  },
];