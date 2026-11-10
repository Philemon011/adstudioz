import Image from "next/image";
import Link from "next/link";
import { services } from "@/config/services";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";

export function Services() {
  return (
    <section
      aria-labelledby="services-title"
      className="px-3 py-3 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        {/* En-tête */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-3">
            <p className="inline-flex rounded-full bg-surface-muted px-3.5 py-1.5 text-xs">
              Nos services
            </p>
          </Reveal>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:col-span-9">
            <Reveal delay={100}>
              <h2
                id="services-title"
                className="text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.02] tracking-display"
              >
                Un savoir-faire
                <br />
                pour chaque projet
              </h2>
            </Reveal>
            <Reveal delay={200} className="shrink-0">
              <CtaLink href="/services">Tous les services</CtaLink>
            </Reveal>
          </div>
        </div>

        {/* Cartes : défilement horizontal en dessous de xl, grille à partir de xl */}
        <ul className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:gap-4 sm:px-8 md:-mx-12 md:mt-14 md:scroll-px-12 md:px-12 lg:-mx-16 lg:scroll-px-16 lg:px-16 xl:mx-0 xl:grid xl:grid-cols-4 xl:overflow-visible xl:px-0 [&::-webkit-scrollbar]:hidden">
          {services.map((service, i) => (
            <li
              key={service.slug}
              className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[36%] xl:w-auto"
            >
              <Reveal delay={i * 100}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-media bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 36vw, (min-width: 640px) 44vw, 78vw"
                    quality={80}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"
                  />

                  {/* Bouton flèche */}
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white text-neutral-950 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground sm:right-4 sm:top-4"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </span>

                  {/* Texte */}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                    <p className="text-xs tabular-nums text-white/70">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-xl leading-tight tracking-heading sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-snug text-white/75">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}