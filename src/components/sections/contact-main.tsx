import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { ContactForm } from "@/components/forms/contact-form";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/ui/social-links";

const linkClass =
  "rounded-sm transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const labelClass = "text-xs text-muted-foreground";

export function ContactMain() {
  const { contact, location } = siteConfig;

  return (
    <section
      aria-labelledby="contact-main-title"
      className="px-3 py-3 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        <h2 id="contact-main-title" className="sr-only">
          Coordonnées et formulaire de contact
        </h2>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          {/* Coordonnées */}
          <Reveal className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between gap-10">
              <dl className="divide-y divide-border border-y border-border">
                <div className="py-5">
                  <dt className={labelClass}>WhatsApp</dt>
                  <dd className="mt-1.5 text-lg">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {contact.whatsappLabel}
                      <span className="sr-only">
                        {" "}
                        (s’ouvre dans un nouvel onglet)
                      </span>
                    </a>
                  </dd>
                </div>

                <div className="py-5">
                  <dt className={labelClass}>Téléphone</dt>
                  <dd className="mt-1.5 space-y-1 text-lg">
                    {contact.phones.map((phone) => (
                      <div key={phone.href}>
                        <a href={phone.href} className={linkClass}>
                          {phone.label}
                        </a>
                      </div>
                    ))}
                  </dd>
                </div>

                <div className="py-5">
                  <dt className={labelClass}>E-mail</dt>
                  <dd className="mt-1.5 break-all text-lg">
                    <a href={`mailto:${contact.email}`} className={linkClass}>
                      {contact.email}
                    </a>
                  </dd>
                </div>

                <div className="py-5">
                  <dt className={labelClass}>Réseaux sociaux</dt>
                  <dd className="mt-3">
                    <SocialLinks />
                  </dd>
                </div>

                <div className="py-5">
                  <dt className={labelClass}>Où nous trouver</dt>
                  <dd className="mt-1.5 text-lg">
                    {location.cities.join(" · ")}, {location.country}
                    <span className="mt-1 block text-sm text-muted-foreground">
                      Possibilité d’intervention ailleurs selon le projet.
                    </span>
                  </dd>
                </div>
              </dl>

              <div>
                <CtaLink href={getWhatsAppUrl()} external>
                  Ouvrir WhatsApp
                </CtaLink>
              </div>
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={100} className="lg:col-span-7">
            <div className="rounded-media bg-surface-muted p-5 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}