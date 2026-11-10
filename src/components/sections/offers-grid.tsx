import { siteConfig } from "@/config/site";
import { offers, offersNote, formatFcfa } from "@/config/offers";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";

export function OffersGrid() {
  return (
    <section
      aria-labelledby="offers-grid-title"
      className="px-3 py-3 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        <h2 id="offers-grid-title" className="sr-only">
          Nos formules
        </h2>

        <ul className="grid gap-3 sm:gap-4 lg:grid-cols-3">
          {offers.map((offer, i) => {
            const dark = Boolean(offer.highlighted);
            const message = `Bonjour ADSTUDIOZ, la formule « ${offer.name} » m’intéresse. Pouvez-vous me donner plus de détails ?`;

            return (
              <li key={offer.slug}>
                <Reveal delay={i * 100} className="h-full">
                  <article
                    className={`relative flex h-full flex-col rounded-media p-6 sm:p-8 ${
                      dark
                        ? "border border-white/10 bg-neutral-950 text-white"
                        : "bg-surface-muted"
                    }`}
                  >
                    {dark && (
                      <p className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs sm:right-8 sm:top-8">
                        Recommandée
                      </p>
                    )}

                    <h3 className="text-3xl tracking-heading">{offer.name}</h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        dark ? "text-white/65" : "text-muted-foreground"
                      }`}
                    >
                      {offer.tagline}
                    </p>

                    <div className="mt-8">
                      <p
                        className={`text-xs ${
                          dark ? "text-white/65" : "text-muted-foreground"
                        }`}
                      >
                        À partir de
                      </p>
                      <p className="mt-1 flex items-baseline gap-2">
                        <span className="font-heading text-5xl leading-none tracking-display">
                          {formatFcfa(offer.price)}
                        </span>
                        <span
                          className={`text-sm ${
                            dark ? "text-white/65" : "text-muted-foreground"
                          }`}
                        >
                          FCFA
                        </span>
                      </p>
                    </div>

                    <ul
                      className={`mt-8 flex-1 divide-y border-y ${
                        dark
                          ? "divide-white/15 border-white/15"
                          : "divide-border border-border"
                      }`}
                    >
                      {offer.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 py-3 text-sm"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className={`mt-0.5 size-4 shrink-0 ${
                              dark ? "text-brand-gold" : "text-primary"
                            }`}
                          >
                            <path d="m5 12 5 5L20 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <CtaLink
                        href={getWhatsAppUrl(message)}
                        tone={dark ? "light" : "default"}
                        external
                      >
                        Choisir cette formule
                      </CtaLink>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* Autres besoins */}
        <Reveal className="mt-3 sm:mt-4">
          <div className="flex flex-col gap-6 rounded-media border border-border p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl tracking-heading sm:text-3xl">
                Un projet différent ?
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Publicité, production audiovisuelle, création de contenu :
                chaque projet est unique et fait l’objet d’un devis
                personnalisé.
              </p>
            </div>
            <div className="shrink-0">
              <CtaLink href={siteConfig.cta.href}>{siteConfig.cta.label}</CtaLink>
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-xs text-muted-foreground">{offersNote}</p>
      </div>
    </section>
  );
}