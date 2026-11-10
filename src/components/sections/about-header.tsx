import Image from "next/image";
import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import { aboutContent } from "@/config/about";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";

export function AboutHeader() {
  return (
    <section
      aria-labelledby="about-title"
      className="px-3 pb-3 pt-24 sm:px-6 sm:pb-6 sm:pt-28"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <p
              className="hero-rise inline-flex rounded-full bg-surface-muted px-3.5 py-1.5 text-xs"
              style={{ "--d": "0ms" } as CSSProperties}
            >
              À propos
            </p>
          </div>

          <h1
            id="about-title"
            className="hero-rise text-[clamp(2.5rem,6.2vw,5.75rem)] leading-[0.98] tracking-display lg:col-span-9"
            style={{ "--d": "100ms" } as CSSProperties}
          >
            {aboutContent.title}
          </h1>

          <div
            className="hero-rise flex flex-col gap-8 lg:col-span-6 lg:col-start-4"
            style={{ "--d": "250ms" } as CSSProperties}
          >
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {aboutContent.intro}
            </p>
            <div>
              <CtaLink href={siteConfig.cta.href}>{siteConfig.cta.label}</CtaLink>
            </div>
          </div>
        </div>

        {/* Photo en bandeau */}
        <Reveal className="mt-12 md:mt-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-surface-muted sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={aboutContent.banner.src}
              alt={aboutContent.banner.alt}
              fill
              sizes="(min-width: 1280px) 1100px, 100vw"
              quality={80}
              className="object-cover"
              style={{ objectPosition: aboutContent.banner.position }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}