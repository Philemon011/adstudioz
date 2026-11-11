import { portfolioCategories } from "@/config/portfolio-categories";

export type NavItem = {
  label: string;
  href: string;
  /** Sous-menu (affiché au survol sur ordinateur, en pastilles sur mobile) */
  children?: { label: string; href: string }[];
};

export type SocialId = "instagram" | "youtube" | "facebook" | "tiktok";

export type SocialLink = {
  id: SocialId;
  label: string;
  handle: string;
  href: string;
};

const navigation: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  {
    label: "Portfolio",
    href: "/portfolio",
    // Généré depuis src/config/portfolio-categories.ts
    children: [
      { label: "Tous", href: "/portfolio" },
      ...portfolioCategories.map((category) => ({
        label: category.label,
        href: `/portfolio/${category.slug}`,
      })),
    ],
  },
  { label: "Contact", href: "/contact" },
];

// WhatsApp est géré à part (il utilise le numéro de "contact.whatsapp").
// Pour ajouter un réseau : décommente sa ligne et renseigne l'adresse du compte.
const social: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@ad_studioz",
    href: "https://www.instagram.com/ad_studioz/",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@adproductiontv",
    href: "https://www.youtube.com/@adproductiontv",
  },
  // {
  //   id: "facebook",
  //   label: "Facebook",
  //   handle: "ADSTUDIOZ",
  //   href: "https://www.facebook.com/...",
  // },
  // {
  //   id: "tiktok",
  //   label: "TikTok",
  //   handle: "@...",
  //   href: "https://www.tiktok.com/@...",
  // },
];

export const siteConfig = {
  name: "ADSTUDIOZ",
  signature: "Votre histoire, notre passion.",
  descriptor: "Production audiovisuelle · Photographie · Création de contenu",
  tagline:
    "Vos événements, vos histoires, vos marques. Des images soignées et des contenus pensés pour valoriser vos projets.",
  description:
    "Agence de production audiovisuelle, de photographie et de création de contenu à Cotonou et Porto-Novo, au Bénin.",

  location: {
    cities: ["Cotonou", "Porto-Novo"],
    country: "Bénin",
  },

  contact: {
    email: "adproduction.sn@gmail.com",
    // Le premier numéro est le numéro principal
    phones: [
      { label: "+229 01 53 46 12 05", href: "tel:+2290153461205" },
      { label: "+229 01 95 18 78 46", href: "tel:+2290195187846" },
      // { label: "+229 01 53 81 72 60", href: "tel:+2290153817260" },
    ],
    // Format international, sans espaces ni "+"
    whatsapp: "2290195187846",
    whatsappLabel: "+229 01 95 18 78 46",
  },

  social,

  logo: {
    light: "/brand/logo.png",
    dark: "/brand/logo-dark.png",
    width: 2285,
    height: 1089,
  },

  navigation,

  cta: {
    label: "Demander un devis",
    href: "/reservation",
  },
} as const;

export type SiteConfig = typeof siteConfig;