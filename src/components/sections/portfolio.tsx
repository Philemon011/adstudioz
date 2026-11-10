import Image from "next/image";
import Link from "next/link";
import { portfolioHighlights } from "@/config/portfolio";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";

/**
 * Emplacement de chaque photo dans la mosaïque.
 * Mobile et tablette : 2 colonnes (1re et 6e photo en pleine largeur).
 * Ordinateur (lg) : 3 colonnes
 *   [1 1 2]
 *   [3 4 2]
 *   [5 5 6]
 */
const layout = [
  "col-span-2 lg:col-span-2",
  "lg:row-span-2",
  "",
  "",
  "lg:col-span-2",
  "col-span-2 lg:col-span-1",
];

export function Portfolio() {
  return (
    <section
      aria-labelledby="portfolio-title"
      className="px-3 py-3 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        {/* En-tête */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-3">
            <p className="inline-flex rounded-full bg-surface-muted px-3.5 py-1.5 text-xs">
              Portfolio
            </p>
          </Reveal>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:col-span-9">
            <Reveal delay={100}>
              <h2
                id="portfolio-title"
                className="text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.02] tracking-display"
              >
                Nos dernières
                <br />
                réalisations
              </h2>
            </Reveal>
            <Reveal delay={200} className="shrink-0">
              <CtaLink href="/portfolio">Voir le portfolio</CtaLink>
            </Reveal>
          </div>
        </div>

        {/* Mosaïque */}
        <ul className="mt-10 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[15rem] sm:gap-4 md:mt-14 md:auto-rows-[18rem] lg:auto-rows-[20rem] lg:grid-cols-3">
          {portfolioHighlights.map((item, i) => (
            <li key={item.src} className={layout[i] ?? ""}>
              <Reveal delay={(i % 3) * 100} className="h-full">
                <Link
                  href="/portfolio"
                  aria-label={`${item.category} — voir le portfolio`}
                  className="group relative block h-full overflow-hidden rounded-media bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    quality={80}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ objectPosition: item.position ?? "center" }}
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"
                  />

                  {/* Bouton flèche : visible au survol et au focus clavier */}
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white text-neutral-950 opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:right-4 sm:top-4"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </span>

                  {/* Catégorie */}
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs text-white backdrop-blur-md sm:bottom-4 sm:left-4">
                    {item.category}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}