"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { CtaLink } from "@/components/ui/cta-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const desktopLinks = siteConfig.navigation.filter((link) => link.href !== "/");

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Menu mobile : verrouille le scroll, ferme avec Échap ou au passage en desktop
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    const onMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    mediaQuery.addEventListener("change", onMediaChange);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mediaQuery.removeEventListener("change", onMediaChange);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 rounded-full border border-border bg-surface/80 pl-4 pr-2 shadow-sm backdrop-blur-xl sm:h-16 sm:gap-6 sm:pl-6 sm:pr-2.5 md:pl-7">
          {/* Logo */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — Accueil`}
            onClick={() => setOpen(false)}
            className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <Image
              src={siteConfig.logo.light}
              alt={siteConfig.name}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              priority
              className="h-9 w-auto sm:h-11 dark:hidden"
            />
            <Image
              src={siteConfig.logo.dark}
              alt=""
              aria-hidden="true"
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              priority
              className="hidden h-9 w-auto sm:h-11 dark:block"
            />
          </Link>

          {/* Navigation desktop */}
          <nav aria-label="Navigation principale" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {desktopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`rounded-full px-4 py-2.5 text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      isActive(link.href)
                        ? "bg-surface-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeToggle />

            {/* Bouton devis : desktop uniquement */}
            <div className="hidden xl:block">
              <CtaLink href={siteConfig.cta.href}>
                {siteConfig.cta.label}
              </CtaLink>
            </div>

            {/* Bouton menu : mobile et tablette uniquement */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-foreground text-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary xl:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-2.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 overflow-y-auto bg-background transition-[opacity,visibility] duration-300 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto flex min-h-full max-w-7xl flex-col px-6 pb-10 pt-28 sm:pt-32">
          <nav aria-label="Navigation mobile">
            <ul className="flex flex-col">
              {siteConfig.navigation.map((link, index) => (
                <li key={link.href} className="border-b border-border">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    style={{
                      transitionDelay: open ? `${80 + index * 40}ms` : "0ms",
                    }}
                    className={`block py-3.5 font-heading text-4xl tracking-heading transition-all duration-500 sm:py-4 sm:text-5xl ${
                      isActive(link.href)
                        ? "text-foreground"
                        : "text-muted-foreground"
                    } ${
                      open
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto space-y-8 pt-12">
            <CtaLink href={siteConfig.cta.href} onClick={() => setOpen(false)}>
              {siteConfig.cta.label}
            </CtaLink>

            <div className="space-y-1 text-sm text-muted-foreground">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="block break-all transition-colors hover:text-foreground"
              >
                {siteConfig.contact.email}
              </a>
              {siteConfig.contact.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="block transition-colors hover:text-foreground"
                >
                  {phone.label}
                </a>
              ))}
              <p>
                {siteConfig.location.cities.join(" · ")},{" "}
                {siteConfig.location.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}