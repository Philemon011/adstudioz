export type Service = {
  slug: string;
  title: string;
  /** Texte court affiché sur la carte de l'accueil */
  description: string;
  /** Liste détaillée, affichée sur la page Services */
  items: string[];
  image: string;
  alt: string;
  /** Point de cadrage quand la photo est recadrée (ex. "center", "50% 30%") */
  position?: string;
};

// Contenu fourni par le client.
// Les fichiers images gardent leurs noms actuels : service-4 = publicité,
// service-3 = production audiovisuelle, service-2 = contenu et photographie.
export const services: Service[] = [
  {
    slug: "couverture-evenements",
    title: "Couverture d’événements",
    description:
      "Mariages, cérémonies, conférences, concerts et fêtes privées : photographie et vidéo événementielles.",
    items: [
      "Mariages, cérémonies et anniversaires",
      "Conférences, événements professionnels et lancements",
      "Concerts, spectacles et fêtes privées",
      "Photographie et vidéo événementielles",
    ],
    image: "/images/services/service-1.jpg",
    alt: "Couverture d’événement par ADSTUDIOZ",
  },
  {
    slug: "publicite-communication-entreprise",
    title: "Publicité & communication d’entreprise",
    description:
      "Films publicitaires, vidéos promotionnelles, photographie de produits et films institutionnels.",
    items: [
      "Films publicitaires et vidéos promotionnelles",
      "Présentation d’entreprises, de marques et de services",
      "Photographie de produits",
      "Films institutionnels et contenus corporate",
    ],
    image: "/images/services/service-4.jpg",
    alt: "Publicité et communication d’entreprise par ADSTUDIOZ",
  },
  {
    slug: "production-audiovisuelle",
    title: "Production audiovisuelle",
    description:
      "Courts-métrages, documentaires, clips musicaux, captation, montage vidéo et postproduction.",
    items: [
      "Courts-métrages, films et séries",
      "Documentaires et reportages",
      "Clips musicaux",
      "Captation, montage vidéo et postproduction",
    ],
    image: "/images/services/service-3.jpg",
    alt: "Production audiovisuelle par ADSTUDIOZ",
  },
  {
    slug: "creation-contenu-photographie",
    title: "Création de contenu & photographie",
    description:
      "Contenus pour les réseaux sociaux, vidéos courtes, interviews, portraits et séances photo.",
    items: [
      "Contenus pour les réseaux sociaux",
      "Vidéos courtes pour Instagram, Facebook et TikTok",
      "Interviews, portraits et séances photo",
      "Contenus numériques adaptés à votre communication",
    ],
    image: "/images/services/service-2.jpg",
    alt: "Création de contenu et photographie par ADSTUDIOZ",
  },
];