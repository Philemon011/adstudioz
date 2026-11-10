import { siteConfig } from "@/config/site";

/**
 * Construit un lien WhatsApp, avec un message pré-rempli si fourni.
 */
export function getWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Ouvre WhatsApp avec le message fourni.
 * À appeler directement depuis un gestionnaire d'événement (envoi de formulaire).
 * Retourne l'URL ouverte, utile pour un lien de secours.
 */
export function openWhatsApp(message: string) {
  const url = getWhatsAppUrl(message);
  const opened = window.open(url, "_blank");

  if (opened) {
    opened.opener = null;
  } else {
    // Ouverture bloquée par le navigateur : on bascule dans l'onglet courant
    window.location.href = url;
  }

  return url;
}