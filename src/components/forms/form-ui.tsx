import type { ReactNode } from "react";

export const fieldClass =
  "w-full min-w-0 rounded-2xl border border-border bg-surface px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors duration-300 hover:border-foreground/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[invalid=true]:border-primary";

export function Field({
  id,
  label,
  optional = false,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline justify-between text-sm"
      >
        <span>{label}</span>
        {optional && (
          <span className="text-xs text-muted-foreground">Facultatif</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-primary">
          {error}
        </p>
      )}
    </div>
  );
}

export function SelectBox({
  id,
  name,
  defaultValue,
  children,
}: {
  id: string;
  name: string;
  defaultValue?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        className={`${fieldClass} appearance-none pr-11`}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

export function WhatsAppSubmit() {
  return (
    <div className="space-y-4 pt-1">
      <button
        type="submit"
        className="group inline-flex items-center gap-1 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
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
          Envoyer sur WhatsApp
        </span>
        <span
          aria-hidden="true"
          className="grid size-11 place-items-center rounded-full bg-foreground text-background transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </span>
      </button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        WhatsApp s’ouvre avec votre message déjà rédigé : il vous suffit de
        l’envoyer.
      </p>
    </div>
  );
}

export function SentNotice({ url }: { url: string | null }) {
  return (
    <div aria-live="polite">
      {url && (
        <p className="rounded-2xl bg-surface px-4 py-3 text-sm">
          Votre message est prêt dans WhatsApp. Rien ne s’est ouvert ?{" "}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Ouvrir WhatsApp
          </a>
          .
        </p>
      )}
    </div>
  );
}