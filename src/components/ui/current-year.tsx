"use client";

import { useSyncExternalStore } from "react";

// Année affichée pendant le pré-rendu ; remplacée par l'année réelle dans le navigateur
const FALLBACK_YEAR = 2026;

const subscribe = () => () => {};

export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => FALLBACK_YEAR,
  );

  return <>{year}</>;
}