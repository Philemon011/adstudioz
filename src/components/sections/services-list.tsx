import Image from "next/image";
import { services } from "@/config/services";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";

const pad = (value: number) => String(value).padStart(2, "0");

export function ServicesList() {
  return (
    <>
      {services.map((service, i) => {
        const reversed = i % 2 === 1;
        const whatsappMessage = `Bonjour ADSTUDIOZ, je souhaite un devis pour : ${service.title}.`;

        return (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-title`}
            className="scroll-mt-20 px-3 py-3 sm:scroll-mt-24 sm:px-6 sm:py-6"
          >
            <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-x-12">
                {/* Photo */}
                <Reveal
                  className={`lg:col-span-7 ${reversed ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-surface-muted lg:aspect-auto lg:h-full lg:min-h-[30rem]">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      quality={80}
                      className="object-cover"
                      style={{ objectPosition: service.position ?? "center" }}
                    />
                  </div>
                </Reveal>

                {/* Texte */}
                <Reveal
                  delay={100}
                  className={`lg:col-span-5 ${reversed ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="flex h-full flex-col justify-between gap-10">
                    <div>
                      <p className="inline-flex rounded-full bg-surface-muted px-3.5 py-1.5 text-xs tabular-nums">
                        {pad(i + 1)} / {pad(services.length)}
                      </p>
                      <h2
                        id={`${service.slug}-title`}
                        className="mt-6 text-[clamp(1.875rem,3.6vw,3.25rem)] leading-[1.04] tracking-heading"
                      >
                        {service.title}
                      </h2>
                      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </div>

                    <div>
                      <ul className="divide-y divide-border border-y border-border">
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 py-3.5 text-sm sm:text-base"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        <CtaLink
                          href={getWhatsAppUrl(whatsappMessage)}
                          external
                        >
                          Demander un devis
                        </CtaLink>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}