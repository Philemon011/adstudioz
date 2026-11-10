import { siteConfig } from "@/config/site";
import { QuoteForm } from "@/components/forms/quote-form";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    title: "Vous décrivez votre projet",
    text: "Service, date, lieu, besoins : renseignez ce que vous savez déjà.",
  },
  {
    title: "WhatsApp s’ouvre",
    text: "Votre demande y est déjà rédigée, avec toutes les informations.",
  },
  {
    title: "Vous l’envoyez",
    text: "Nous reprenons contact avec vous pour construire votre devis.",
  },
];

export function ReservationMain() {
  const mainPhone = siteConfig.contact.phones[0];

  return (
    <section
      aria-labelledby="reservation-main-title"
      className="px-3 py-3 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-7xl rounded-card bg-surface p-5 sm:p-8 md:p-12 lg:p-16">
        <h2 id="reservation-main-title" className="sr-only">
          Comment ça marche et formulaire de demande de devis
        </h2>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          {/* Étapes */}
          <Reveal className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between gap-10">
              <div>
                <p className="text-xs text-muted-foreground">Comment ça marche</p>
                <ol className="mt-5 divide-y divide-border border-y border-border">
                  {steps.map((step, i) => (
                    <li key={step.title} className="flex gap-4 py-5">
                      <span className="pt-1 text-sm tabular-nums text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xl tracking-heading">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {step.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Vous préférez en parler directement ?{" "}
                <a
                  href={mainPhone.href}
                  className="text-foreground underline underline-offset-4 transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Appelez le {mainPhone.label}
                </a>
                .
              </p>
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={100} className="lg:col-span-7">
            <div className="rounded-media bg-surface-muted p-5 sm:p-8">
              <QuoteForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}