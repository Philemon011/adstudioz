import Link from "next/link";
import type { ReactNode } from "react";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  /**
   * "default" : bouton foncé (thème clair) ou clair (thème sombre)
   * "light" : bouton blanc, pour les fonds photo sombres
   * "onBrand" : bouton blanc qui devient noir au survol, pour les fonds rouges
   */
  tone?: "default" | "light" | "onBrand";
  /** Lien externe : s'ouvre dans un nouvel onglet */
  external?: boolean;
};

const tones = {
  default:
    "bg-foreground text-background group-hover:bg-primary group-hover:text-primary-foreground",
  light:
    "bg-white text-neutral-950 group-hover:bg-primary group-hover:text-primary-foreground",
  onBrand:
    "bg-white text-neutral-950 group-hover:bg-neutral-950 group-hover:text-white",
} as const;

export function CtaLink({
  href,
  children,
  className = "",
  onClick,
  tone = "default",
  external = false,
}: CtaLinkProps) {
  const focusColor =
    tone === "onBrand" ? "focus-visible:outline-white" : "focus-visible:outline-primary";

  const classes = `group inline-flex items-center gap-1 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 ${focusColor} ${className}`;
  const base = `${tones[tone]} transition-colors duration-300`;

  const content = (
    <>
      <span
        className={`flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium ${base}`}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className={`grid size-11 place-items-center rounded-full ${base}`}
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
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={classes}
      >
        {content}
        <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  );
}