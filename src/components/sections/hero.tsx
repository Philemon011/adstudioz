"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import { heroSlides } from "@/config/hero";
import { CtaLink } from "@/components/ui/cta-link";

const SLIDE_DURATION = 6500; // durée d'affichage d'une photo (ms)
const FADE_DURATION = 1200; // durée du fondu (ms)

const [titleFirst, titleSecond] = siteConfig.signature.split(", ");
const titleLines = [`${titleFirst},`, titleSecond];

const pad = (value: number) => String(value).padStart(2, "0");

/* Préférence « réduire les animations » */
function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getServerReducedMotion = () => false;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );

  const total = heroSlides.length;
  const hasControls = total > 1;
  const isPlaying = playing && !reducedMotion && hasControls;
  const current = heroSlides[index];

  const goTo = (target: number) => setIndex(((target % total) + total) % total);

  const motionStyle = {
    "--hero-zoom-duration": `${SLIDE_DURATION + FADE_DURATION}ms`,
    "--hero-duration": `${SLIDE_DURATION}ms`,
    "--hero-play": isPlaying ? "running" : "paused",
  } as CSSProperties;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`Réalisations ${siteConfig.name}`}
      className="relative h-svh min-h-[36rem] overflow-hidden rounded-b-card bg-neutral-950"
    >
      {/* Photos */}
      {heroSlides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} sur ${total}`}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity ease-in-out ${
              active ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: `${FADE_DURATION}ms` }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              quality={80}
              priority={i === 0}
              className={`object-cover ${active ? "hero-zoom" : ""}`}
              style={{
                objectPosition: slide.position ?? "center",
                ...(active ? motionStyle : {}),
              }}
            />
          </div>
        );
      })}

      {/* Dégradé de lisibilité */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-black/30"
      />

      {/* Contenu */}
      <div className="relative z-10 flex h-full flex-col justify-end">
        <div className="mx-auto w-full max-w-7xl px-3 pb-4 sm:px-6 sm:pb-6">
          <p
            className="hero-rise inline-flex rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs text-white backdrop-blur-md"
            style={{ "--d": "100ms" } as CSSProperties}
          >
            {siteConfig.location.cities.join(" · ")}
          </p>

          <h1 className="mt-5 text-[clamp(2.5rem,8.5vw,8rem)] leading-[0.95] tracking-display text-white">
            {titleLines.map((line, i) => (
              <span
                key={line}
                className="-my-[0.07em] block overflow-hidden py-[0.07em]"
              >
                <span
                  className="hero-line block"
                  style={{ "--d": `${200 + i * 120}ms` } as CSSProperties}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p
              className="hero-rise max-w-md text-sm leading-relaxed text-white/80 sm:text-base"
              style={{ "--d": "650ms" } as CSSProperties}
            >
              {siteConfig.tagline}
            </p>

            <div
              className="hero-rise flex flex-wrap items-center gap-3"
              style={{ "--d": "800ms" } as CSSProperties}
            >
              <Link
                href="/portfolio"
                className="inline-flex h-11 items-center rounded-full border border-white/30 bg-white/10 px-5 text-sm text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Voir le portfolio
              </Link>
              <CtaLink href={siteConfig.cta.href} tone="light">
                {siteConfig.cta.label}
              </CtaLink>
            </div>
          </div>

          {/* Barre de contrôle */}
          {hasControls && (
            <div className="mt-8 flex items-center gap-4 border-t border-white/20 pt-4 sm:mt-10">
              <p
                className="flex w-40 shrink-0 items-baseline gap-2 text-xs text-white/70 sm:w-52"
                aria-live={isPlaying ? "off" : "polite"}
              >
                <span className="tabular-nums text-white">{pad(index + 1)}</span>
                <span className="tabular-nums">/ {pad(total)}</span>
                <span key={index} className="hero-rise truncate text-white">
                  {current.category}
                </span>
              </p>

              <div className="flex flex-1 gap-2">
                {heroSlides.map((slide, i) => {
                  const done = i < index;
                  const active = i === index;
                  return (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Aller à la photo ${i + 1} : ${slide.category}`}
                      aria-current={active}
                      className="group flex h-8 flex-1 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <span className="relative block h-0.5 w-full overflow-hidden rounded-full bg-white/25 transition-colors group-hover:bg-white/40">
                        <span
                          onAnimationEnd={active ? () => goTo(index + 1) : undefined}
                          className={`absolute inset-0 origin-left bg-white ${
                            done
                              ? "scale-x-100"
                              : active
                                ? reducedMotion
                                  ? "scale-x-100"
                                  : "hero-progress"
                                : "scale-x-0"
                          }`}
                          style={active ? motionStyle : undefined}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>

              {!reducedMotion && (
                <button
                  type="button"
                  onClick={() => setPlaying((value) => !value)}
                  aria-label={
                    isPlaying
                      ? "Mettre le diaporama en pause"
                      : "Relancer le diaporama"
                  }
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:bg-white hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
                      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}