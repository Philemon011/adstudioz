import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { CurrentYear } from "@/components/ui/current-year";

const linkClass =
  "inline-block rounded-sm text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

const labelClass = "text-xs text-muted-foreground/80";

export function Footer() {
  const otherPhones = siteConfig.contact.phones.slice(1);

  return (
    <footer className="px-3 pb-3 pt-3 sm:px-6 sm:pb-6 sm:pt-6">
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8">
          {/* Marque */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — Accueil`}
              className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <Image
                src={siteConfig.logo.light}
                alt={siteConfig.name}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                className="h-16 w-auto sm:h-20 dark:hidden"
              />
              <Image
                src={siteConfig.logo.dark}
                alt=""
                aria-hidden="true"
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                className="hidden h-16 w-auto sm:h-20 dark:block"
              />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation du pied de page" className="lg:col-span-2">
            <p className={labelClass}>Navigation</p>
            <ul className="mt-5 space-y-3 text-sm">
              {siteConfig.navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="lg:col-span-3">
            <p className={labelClass}>Services</p>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className={linkClass}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-3">
            <p className={labelClass}>Contact</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  WhatsApp · {siteConfig.contact.whatsappLabel}
                  <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
                </a>
              </li>
              {otherPhones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className={linkClass}>
                    {phone.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className={`${linkClass} break-all`}
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Instagram · {siteConfig.social.instagram.handle}
                  <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
                </a>
              </li>
              <li className="pt-1 text-muted-foreground">
                {siteConfig.location.cities.join(" · ")},{" "}
                {siteConfig.location.country}
              </li>
            </ul>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:mt-16 md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name}. Tous droits réservés.
          </p>
          <p className="md:text-center">{siteConfig.descriptor}</p>
          <a
            href="#"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-4 py-2 text-foreground transition-colors duration-300 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Haut de page
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
              aria-hidden="true"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
                    </a>
        </div>
      </div>
    </footer>
  );
}