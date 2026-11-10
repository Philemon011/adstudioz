import Image from "next/image";
import { siteConfig } from "@/config/site";
import { introImages } from "@/config/intro";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";

export function Intro() {
  return (
    <section
      aria-labelledby="intro-title"
      className="px-3 py-3 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        {/* Étiquette + phrase */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-3">
            <p className="inline-flex rounded-full bg-surface-muted px-3.5 py-1.5 text-xs">
              L’agence
            </p>
          </Reveal>

          <Reveal className="lg:col-span-9" delay={100}>
            <h2
              id="intro-title"
              className="text-[clamp(1.75rem,3.8vw,3.5rem)] leading-[1.08] tracking-heading"
            >
              Nous capturons vos événements, racontons vos histoires et
              valorisons vos marques,{" "}
              <span className="text-muted-foreground">
                avec des images soignées qui restent en mémoire.
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Photos */}
        <div className="mt-10 grid md:mt-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:col-span-9 lg:col-start-4">
            {introImages.map((image, i) => (
              <Reveal
                key={image.src}
                delay={i * 120}
                className={
                  i === 0
                    ? "col-span-2 sm:col-span-1"
                    : i === 1
                      ? "sm:mt-12 lg:mt-16"
                      : ""
                }
              >
                <div
                  className={`relative overflow-hidden rounded-media bg-surface-muted ${
                    i === 0
                      ? "aspect-[16/10] sm:aspect-[4/5]"
                      : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1280px) 27vw, (min-width: 640px) 30vw, 100vw"
                    quality={80}
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bas de section */}
        <div className="mt-10 grid lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-9 lg:col-start-4">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Une équipe basée à{" "}
                {siteConfig.location.cities.join(" et ")}, au service de vos
                projets.
              </p>
              <CtaLink href="/a-propos">Découvrir l’agence</CtaLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}