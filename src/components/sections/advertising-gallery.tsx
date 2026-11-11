import Image from "next/image";
import type { AdvertisingImage } from "@/lib/advertising";
import { Reveal } from "@/components/ui/reveal";

export function AdvertisingGallery({ images }: { images: AdvertisingImage[] }) {
  if (images.length === 0) {
    return (
      <section
        aria-label="Visuels publicitaires"
        className="px-3 py-3 sm:px-6 sm:py-6"
      >
        <div className="mx-auto max-w-7xl rounded-card bg-surface p-8 text-center sm:p-12 lg:p-20">
          <p className="font-heading text-3xl tracking-heading sm:text-4xl">
            Nos visuels publicitaires arrivent bientôt.
          </p>
          <p className="mt-3 text-muted-foreground">
            Revenez très vite découvrir notre travail.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="advertising-gallery-title"
      className="px-3 py-3 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        <h2 id="advertising-gallery-title" className="sr-only">
          Visuels publicitaires
        </h2>

        {/* Pile verticale : un visuel par ligne, en pleine largeur */}
        <ul className="flex flex-col gap-3 sm:gap-4">
          {images.map((image) => (
            <li key={image.id}>
              <Reveal>
                <div className="overflow-hidden rounded-media bg-surface-muted">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 1280px) 1100px, 100vw"
                    quality={85}
                    className="h-auto w-full"
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}