"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { services } from "@/config/services";
import { openWhatsApp } from "@/lib/whatsapp";
import {
  Field,
  SelectBox,
  SentNotice,
  WhatsAppSubmit,
  fieldClass,
} from "@/components/forms/form-ui";

const projectTypes = [
  ...services.map((service) => service.title),
  "Autre projet",
];

type Errors = { name?: string; date?: string; message?: string };

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(value: string) {
  return parseDate(value).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isPast(value: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parseDate(value) < today;
}

export function QuoteForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const project = String(data.get("service") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const place = String(data.get("place") ?? "").trim();
    const budget = String(data.get("budget") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Indiquez votre nom.";
    if (date && isPast(date)) nextErrors.date = "Choisissez une date à venir.";
    if (!message) nextErrors.message = "Décrivez brièvement votre projet.";
    setErrors(nextErrors);

    const firstInvalid = nextErrors.name
      ? "name"
      : nextErrors.date
        ? "date"
        : nextErrors.message
          ? "message"
          : null;
    if (firstInvalid) {
      setSentUrl(null);
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    const lines = [
      "Bonjour ADSTUDIOZ,",
      "",
      "Je souhaite un devis.",
      "",
      `Nom : ${name}`,
      `Service : ${project}`,
      ...(date ? [`Date souhaitée : ${formatDate(date)}`] : []),
      ...(place ? [`Lieu : ${place}`] : []),
      ...(budget ? [`Budget : ${budget}`] : []),
      ...(phone ? [`Téléphone : ${phone}`] : []),
      "",
      "Description du projet :",
      message,
    ];

    setSentUrl(openWhatsApp(lines.join("\n")));
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field id="name" label="Nom complet" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Votre nom"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={fieldClass}
        />
      </Field>

      <Field id="phone" label="Téléphone" optional>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+229 …"
          className={fieldClass}
        />
      </Field>

      <Field id="service" label="Service souhaité">
        <SelectBox id="service" name="service" defaultValue={projectTypes[0]}>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </SelectBox>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="date" label="Date souhaitée" optional error={errors.date}>
          <input
            id="date"
            name="date"
            type="date"
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "date-error" : undefined}
            className={`${fieldClass} dark:[color-scheme:dark]`}
          />
        </Field>

        <Field id="place" label="Lieu" optional>
          <input
            id="place"
            name="place"
            type="text"
            placeholder="Ville ou lieu"
            className={fieldClass}
          />
        </Field>
      </div>

      <Field id="budget" label="Budget" optional>
        <input
          id="budget"
          name="budget"
          type="text"
          placeholder="Indiquez votre budget si vous en avez un"
          className={fieldClass}
        />
      </Field>

      <Field id="message" label="Description du projet" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Décrivez votre projet : type d’événement, durée, livrables souhaités…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y`}
        />
      </Field>

      <WhatsAppSubmit />
      <SentNotice url={sentUrl} />
    </form>
  );
}