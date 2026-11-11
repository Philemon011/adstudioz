"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import type { YouTubeVideo } from "@/lib/youtube";
import { CtaLink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";

type VideosGalleryProps = {
  /** null : YouTube injoignable */
  videos: YouTubeVideo[] | null;
  channelUrl: string;
};

export function VideosGallery({ videos, channelUrl }: VideosGalleryProps) {
  const [active, setActive] = useState<YouTubeVideo | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = active !== null;

  // Ouvre / ferme la fenêtre native et verrouille le défilement de la page
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

  const close = () => setActive(null);

  function onStageClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) close();
  }

  if (!videos || videos.length === 0) {
    return (
      <section
        aria-label="Vidéos"
        className="px-3 py-3 sm:px-6 sm:py-6"
      >
        <div className="mx-auto max-w-7xl rounded-card bg-surface p-8 text-center sm:p-12 lg:p-20">
          <p className="font-heading text-3xl tracking-heading sm:text-4xl">
            {videos === null
              ? "Les vidéos sont momentanément indisponibles."
              : "Aucune vidéo pour le moment."}
          </p>
          <p className="mt-3 text-muted-foreground">
            Retrouvez-les directement sur notre chaîne YouTube.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaLink href={channelUrl} external>
              Voir la chaîne YouTube
            </CtaLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="videos-gallery-title"
      className="px-3 py-3 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        <h2 id="videos-gallery-title" className="sr-only">
          Dernières vidéos
        </h2>

        <ul className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <li key={video.id}>
              <Reveal delay={(i % 3) * 100}>
                <button
                  type="button"
                  onClick={() => setActive(video)}
                  aria-label={`Lire la vidéo : ${video.title}`}
                  className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <span className="relative block aspect-video overflow-hidden rounded-media bg-surface-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnail}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/30"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-neutral-950 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-0.5 size-5"
                      >
                        <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
                      </svg>
                    </span>
                  </span>

                  <span className="mt-4 block">
                    {video.dateLabel && (
                      <span className="block text-xs text-muted-foreground">
                        {video.dateLabel}
                      </span>
                    )}
                    <span className="mt-1 line-clamp-2 block font-heading text-xl leading-snug tracking-heading">
                      {video.title}
                    </span>
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Plus de vidéos */}
        <Reveal className="mt-12 md:mt-16">
          <div className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              D’autres vidéos vous attendent sur notre chaîne YouTube.
            </p>
            <div className="shrink-0">
              <CtaLink href={channelUrl} external>
                Voir toute la chaîne
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Lecteur plein écran */}
      <dialog
        ref={dialogRef}
        onClose={close}
        aria-label="Lecteur vidéo"
        className="m-0 h-full max-h-none w-full max-w-none bg-black p-0 text-white open:flex open:flex-col backdrop:bg-black"
      >
        {active && (
          <>
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <p className="line-clamp-1 text-sm">{active.title}</p>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer le lecteur"
                className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
              className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 px-4 pb-6 sm:px-10"
            >
              <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-media bg-black">
                <iframe
                  key={active.id}
                  src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="size-full border-0"
                />
              </div>

              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 underline underline-offset-4 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Regarder sur YouTube
                <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
              </a>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}