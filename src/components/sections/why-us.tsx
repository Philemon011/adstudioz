import { whyUsItems } from "@/config/why-us";
import { Reveal } from "@/components/ui/reveal";

export function WhyUs() {
  return (
    <section
      aria-labelledby="why-us-title"
      className="px-3 py-3 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-7xl rounded-card border border-white/10 bg-neutral-950 p-5 text-white sm:p-8 md:p-12 lg:p-16">
        {/* En-tête */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-8">
          <Reveal className="lg:col-span-3">
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs">
              Notre approche
            </p>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-9">
            <h2
              id="why-us-title"
              className="text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.02] tracking-display"
            >
              Pourquoi choisir
              <br />
              ADSTUDIOZ&nbsp;?
            </h2>
          </Reveal>
        </div>

        {/* Arguments */}
        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-16 xl:grid-cols-4">
          {whyUsItems.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 100}>
                <div className="border-t border-white/15 pt-5">
                  <p className="text-sm tabular-nums text-brand-gold">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 text-2xl leading-tight tracking-heading">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}