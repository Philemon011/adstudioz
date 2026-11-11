"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  TouchEvent,
} from "react";
import type { PortfolioPhoto } from "@/lib/portfolio";
import type { PortfolioCategory } from "@/config/portfolio-categories";

type PortfolioGalleryProps = {
  photos: PortfolioPhoto[];
  categories: PortfolioCategory[];
  /** "all" ou le slug de la catégorie affichée */
  activeSlug: string;
};

const pad = (value: number) => String(value).padStart(2, "0");

const iconButton =
  "grid size-11 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function PortfolioGallery({
  photos,
  categories,
  activeSlug,
}: PortfolioGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);

  const countOf = (slug: string) =>
    photos.filter((photo) => photo.category === slug).length;

  const filters = [
    { slug: "all", label: "Tous", count: photos.length, href: "/portfolio" },
    ...categories
      .filter((category) => countOf(category.slug) > 0)
      .map((category) => ({
        slug: category.slug,
        label: category.label,
        count: countOf(category.slug),
        href: `/portfolio/${category.slug}`,
      })),
  ];

  const visible =
    activeSlug === "all"
      ? photos
      : photos.filter((photo) => photo.category === activeSlug);
  const current = openIndex !== null ? visible[openIndex] : null;
  const isOpen = current !== null && current !== undefined;

  // Ouvre / ferme la boîte de dialogue native et verrouille le défilement de la page
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();

    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setOpenIndex(null);

  const go = (delta: number) =>
    setOpenIndex((index) =>
      index === null
        ? index
        : (index + delta + visible.length) % visible.length,
    );

  function onDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowLeft") go(-1);
    if (event.key === "ArrowRight") go(1);
  }

  function onStageClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) close();
  }

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0].clientX;
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
  }

  if (photos.length === 0) {
    return (
      <section
        aria-label="Galerie de réalisations"
        className="px-3 py-3 sm:px-6 sm:py-6"
      >
        <div className="mx-auto max-w-7xl rounded-card bg-surface p-8 text-center sm:p-12 lg:p-20">
          <p className="font-heading text-3xl tracking-heading sm:text-4xl">
            Nos réalisations arrivent bientôt.
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
      aria-labelledby="portfolio-gallery-title"
      className="px-3 py-3 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        <h2 id="portfolio-gallery-title" className="sr-only">
          Galerie de réalisations
        </h2>

        {/* Filtres : chaque catégorie a sa propre page */}
        <nav
          aria-label="Filtrer par catégorie"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {filters.map((filter) => {
            const selected = activeSlug === filter.slug;
            return (
              <Link
                key={filter.slug}
                href={filter.href}
                scroll={false}
                aria-current={selected ? "page" : undefined}
                className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-surface-muted"
                }`}
              >
                {filter.label}
                <span className="text-xs tabular-nums opacity-60">
                  {filter.count}
                </span>
              </Link>
            );
          })}
        </nav>

        <p className="sr-only" aria-live="polite">
          {visible.length} photos affichées
        </p>

        {visible.length === 0 ? (
          <p className="mt-10 py-10 text-center text-muted-foreground">
            Aucune photo dans cette catégorie pour le moment.
          </p>
        ) : (
          /* Grille « maçonnerie » : chaque photo garde son format */
          <ul
            key={activeSlug}
            className="mt-8 columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3"
          >
            {visible.map((photo, i) => (
              <li
                key={photo.id}
                className="hero-rise mb-3 break-inside-avoid sm:mb-4"
                style={{ "--d": `${Math.min(i, 8) * 60}ms` } as CSSProperties}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Agrandir : ${photo.alt}`}
                  className="group relative block w-full overflow-hidden rounded-media bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    quality={80}
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:bottom-4 sm:left-4">
                    {photo.categoryLabel}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Visionneuse plein écran */}
      <dialog
        ref={dialogRef}
        onClose={close}
        onKeyDown={onDialogKeyDown}
        aria-label="Visionneuse de photos"
        className="m-0 h-full max-h-none w-full max-w-none bg-black p-0 text-white open:flex open:flex-col backdrop:bg-black"
      >
        {current && (
          <>
            <div className="flex items-center justify-between px-4 py-4 sm:px-6">
              <p className="text-sm">
                <span className="tabular-nums">{pad(openIndex! + 1)}</span>
                <span className="tabular-nums text-white/60">
                  {" "}
                  / {pad(visible.length)}
                </span>
                <span className="ml-3 text-white/60">
                  {current.categoryLabel}
                </span>
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer la visionneuse"
                className={iconButton}
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div
              onClick={onStageClick}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20 sm:pb-6"
            >
              <Image
                key={current.id}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="100vw"
                quality={85}
                priority
                className="h-auto max-h-[calc(100dvh-10rem)] w-auto max-w-full object-contain"
              />

              {visible.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Photo précédente"
                    className={`${iconButton} absolute left-2 top-1/2 -translate-y-1/2 sm:left-5`}
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
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Photo suivante"
                    className={`${iconButton} absolute right-2 top-1/2 -translate-y-1/2 sm:right-5`}
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
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}