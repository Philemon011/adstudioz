import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";

export function ServicesHeader() {
  return (
    <section
      aria-labelledby="services-page-title"
      className="px-3 pb-3 pt-24 sm:px-6 sm:pb-6 sm:pt-28"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <p
              className="hero-rise inline-flex rounded-full bg-surface-muted px-3.5 py-1.5 text-xs"
              style={{ "--d": "0ms" } as CSSProperties}
            >
              Nos services
            </p>
          </div>

          <h1
            id="services-page-title"
            className="hero-rise text-[clamp(2.5rem,6.2vw,5.75rem)] leading-[0.98] tracking-display lg:col-span-9"
            style={{ "--d": "100ms" } as CSSProperties}
          >
            Un savoir-faire
            <br />
            pour chaque projet.
          </h1>

          <p
            className="hero-rise max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-6 lg:col-start-4"
            style={{ "--d": "250ms" } as CSSProperties}
          >
            {siteConfig.descriptor.replaceAll(" · ", ", ")} : des images
            soignées et des contenus pensés pour valoriser vos projets.
          </p>
        </div>

        {/* Raccourcis vers chaque service */}
        <nav
          aria-label="Aller à un service"
          className="hero-rise mt-10 md:mt-14"
          style={{ "--d": "400ms" } as CSSProperties}
        >
          <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {services.map((service, i) => (
              <li key={service.slug} className="shrink-0">
                <a
                  href={`#${service.slug}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border px-4 py-2.5 text-sm transition-colors duration-300 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}