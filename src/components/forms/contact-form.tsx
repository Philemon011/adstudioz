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

const subjects = [
  "Renseignement général",
  ...services.map((service) => service.title),
  "Autre demande",
];

type Errors = { name?: string; message?: string };

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Indiquez votre nom.";
    if (!message) nextErrors.message = "Écrivez votre message.";
    setErrors(nextErrors);

    const firstInvalid = nextErrors.name
      ? "name"
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
      `Je m’appelle ${name}.`,
      `Objet : ${subject}`,
      ...(phone ? [`Téléphone : ${phone}`] : []),
      "",
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

      <Field id="subject" label="Objet de votre demande">
        <SelectBox id="subject" name="subject" defaultValue={subjects[0]}>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </SelectBox>
      </Field>

      <Field id="message" label="Votre message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Parlez-nous de votre projet : date, lieu, besoins…"
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