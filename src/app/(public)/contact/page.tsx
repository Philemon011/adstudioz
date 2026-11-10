import type { Metadata } from "next";
import { ContactHeader } from "@/components/sections/contact-header";
import { ContactMain } from "@/components/sections/contact-main";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez ADSTUDIOZ à Porto-Novo et Cotonou pour discuter de votre prochain projet : WhatsApp, téléphone, e-mail et Instagram.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHeader />
      <ContactMain />
    </main>
  );
}