import type { Metadata } from "next";
import { ReservationHeader } from "@/components/sections/reservation-header";
import { ReservationMain } from "@/components/sections/reservation-main";

export const metadata: Metadata = {
  title: "Demande de devis",
  description:
    "Demandez votre devis à ADSTUDIOZ : décrivez votre projet et envoyez votre demande directement sur WhatsApp. Porto-Novo et Cotonou.",
};

export default function ReservationPage() {
  return (
    <main>
      <ReservationHeader />
      <ReservationMain />
    </main>
  );
}