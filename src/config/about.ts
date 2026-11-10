export const aboutContent = {
  title: "Des images soignées, pensées pour valoriser vos projets.",
  intro:
    "ADSTUDIOZ est une agence de production audiovisuelle, de photographie et de création de contenu, présente à Porto-Novo et à Cotonou. Chaque projet reçoit une approche créative et professionnelle, de la préparation à la livraison des contenus.",

  // Les textes viennent du document du client.
  audience: {
    lead: "Des solutions pour les particuliers, les entreprises, les associations et les marques,",
    muted: "adaptées à chaque projet.",
  },

  // À adapter : décris chaque photo dans "alt".
  // Si tes fichiers ne sont pas en .jpg, change l'extension ici.
  banner: {
    src: "/images/about/about-1.jpg",
    alt: "L’équipe ADSTUDIOZ en action",
    position: "center",
  },
  supporting: [
    {
      src: "/images/about/about-2.jpg",
      alt: "Réalisation ADSTUDIOZ — projet 1",
      position: "center",
    },
    {
      src: "/images/about/about-3.jpg",
      alt: "Réalisation ADSTUDIOZ — projet 2",
      position: "center",
    },
  ],
} as const;