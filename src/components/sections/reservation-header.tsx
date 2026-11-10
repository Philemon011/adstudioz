import type { CSSProperties } from "react";

export function ReservationHeader() {
  return (
    <section
      aria-labelledby="reservation-title"
      className="px-3 pb-3 pt-24 sm:px-6 sm:pb-6 sm:pt-28"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <p
              className="hero-rise inline-flex rounded-full bg-surface-muted px-3.5 py-1.5 text-xs"
              style={{ "--d": "0ms" } as CSSProperties}
            >
              Réservation
            </p>
          </div>

          <h1
            id="reservation-title"
            className="hero-rise text-[clamp(2.5rem,6.2vw,5.75rem)] leading-[0.98] tracking-display lg:col-span-9"
            style={{ "--d": "100ms" } as CSSProperties}
          >
            Demandez
            <br />
            votre devis.
          </h1>

          <p
            className="hero-rise max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-6 lg:col-start-4"
            style={{ "--d": "250ms" } as CSSProperties}
          >
            Décrivez votre projet en quelques lignes. Votre demande est
            préparée dans WhatsApp, prête à nous être envoyée.
          </p>
        </div>
      </div>
    </section>
  );
}