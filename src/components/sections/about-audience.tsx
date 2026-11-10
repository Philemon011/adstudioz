import Image from "next/image";
import { aboutContent } from "@/config/about";
import { Reveal } from "@/components/ui/reveal";

export function AboutAudience() {
  return (
    <section
      aria-labelledby="audience-title"
      className="px-3 py-3 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-3">
            <p className="inline-flex rounded-full bg-surface-muted px-3.5 py-1.5 text-xs">
              Pour qui
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-9">
            <h2
              id="audience-title"
              className="text-[clamp(1.75rem,3.8vw,3.5rem)] leading-[1.08] tracking-heading"
            >
              {aboutContent.audience.lead}{" "}
              <span className="text-muted-foreground">
                {aboutContent.audience.muted}
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid md:mt-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-9 lg:col-start-4">
            {aboutContent.supporting.map((image, i) => (
              <Reveal
                key={image.src}
                delay={i * 120}
                className={i === 1 ? "sm:mt-12 lg:mt-16" : ""}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-surface-muted">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1280px) 40vw, (min-width: 640px) 45vw, 100vw"
                    quality={80}
                    className="object-cover"
                    style={{ objectPosition: image.position }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}