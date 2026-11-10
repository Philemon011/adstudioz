import type { CSSProperties } from "react";

export function OffersHeader() {
  return (
    <section
      aria-labelledby="offers-title"
      className="px-3 pb-3 pt-24 sm:px-6 sm:pb-6 sm:pt-28"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <p
              className="hero-rise inline-flex rounded-full bg-surface-muted px-3.5 py-1.5 text-xs"
              style={{ "--d": "0ms" } as CSSProperties}
            >
              Offres
            </p>
          </div>

          <h1
            id="offers-title"
            className="hero-rise text-[clamp(2.5rem,6.2vw,5.75rem)] leading-[0.98] tracking-display lg:col-span-9"
            style={{ "--d": "100ms" } as CSSProperties}
          >
            Des formules claires
            <br />
            pour vos événements.
          </h1>

          <p
            className="hero-rise max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-6 lg:col-start-4"
            style={{ "--d": "250ms" } as CSSProperties}
          >
            Trois formules pour la couverture de vos événements. Pour la
            publicité, la production audiovisuelle ou la création de contenu,
            chaque projet fait l’objet d’un devis sur mesure.
          </p>
        </div>
      </div>
    </section>
  );
}