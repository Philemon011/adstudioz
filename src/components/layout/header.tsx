"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig, type NavItem } from "@/config/site";
import { CtaLink } from "@/components/ui/cta-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const desktopLinks = siteConfig.navigation.filter((link) => link.href !== "/");

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function navLinkClass(active: boolean) {
  return `rounded-full px-4 py-2.5 text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
    active
      ? "bg-surface-muted text-foreground"
      : "text-muted-foreground hover:text-foreground"
  }`;
}

/* Lien de navigation desktop avec sous-menu déroulant */
function DesktopDropdown({
  link,
  pathname,
}: {
  link: NavItem;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const active = isActivePath(pathname, link.href);

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href={link.href}
        onClick={() => setOpen(false)}
        aria-current={active ? "page" : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 ${navLinkClass(active)}`}
      >
        {link.label}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`size-3.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Link>

      {/* Le padding du haut comble l'écart entre le lien et le panneau */}
      <div
        className={`absolute left-0 top-full z-10 pt-3 transition-[opacity,visibility] duration-200 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="min-w-64 rounded-3xl border border-border bg-surface p-2 shadow-lg">
          {link.children?.map((child) => {
            const childActive = pathname === child.href;
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  aria-current={childActive ? "page" : undefined}
                  className="flex items-center justify-between gap-6 rounded-2xl px-4 py-2.5 text-sm transition-colors duration-300 hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {child.label}
                  {childActive && (
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-primary"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => isActivePath(pathname, href);

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
              {desktopLinks.map((link) =>
                link.children ? (
                  <DesktopDropdown
                    key={link.href}
                    link={link}
                    pathname={pathname}
                  />
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={navLinkClass(isActive(link.href))}
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
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
                <li
                  key={link.href}
                  style={{
                    transitionDelay: open ? `${80 + index * 40}ms` : "0ms",
                  }}
                  className={`border-b border-border transition-all duration-500 ${
                    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`block py-3.5 font-heading text-4xl tracking-heading sm:py-4 sm:text-5xl ${
                      isActive(link.href)
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>

                  {/* Sous-menu : pastilles sous le lien parent */}
                  {link.children && (
                    <ul className="flex flex-wrap gap-2 pb-5">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpen(false)}
                            aria-current={
                              pathname === child.href ? "page" : undefined
                            }
                            className={`inline-flex rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                              pathname === child.href
                                ? "border-foreground bg-foreground text-background"
                                : "border-border text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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