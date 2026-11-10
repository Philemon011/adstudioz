import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";

const whatsappMessage =
  "Bonjour ADSTUDIOZ, j’aimerais discuter d’un projet avec vous.";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="px-3 py-3 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-linear-to-tr from-brand-red-deep to-brand-red p-6 text-white sm:p-10 md:p-14 lg:p-20">
        <Reveal>
          <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs">
            Contact
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="final-cta-title"
            className="mt-8 text-[clamp(2.5rem,7.5vw,7rem)] leading-[0.98] tracking-display md:mt-12"
          >
            Donnez vie
            <br />à vos <span className="text-brand-gold">idées.</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-base leading-relaxed text-white/90 sm:text-lg">
              Contactez {siteConfig.name} pour discuter de votre prochain
              projet.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.contact.phones[0].href}
                className="inline-flex h-11 items-center rounded-full border border-white/40 px-5 text-sm text-white transition-colors duration-300 hover:bg-white hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Appeler
              </a>

              <CtaLink
                href={getWhatsAppUrl(whatsappMessage)}
                tone="onBrand"
                external
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                  aria-hidden="true"
                >
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
                Écrire sur WhatsApp
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}