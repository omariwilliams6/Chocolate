import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Bilingual, useLang } from "@/lib/i18n";
import atmosphereImg from "@/assets/atmosphere.jpg";
import lufthansaImg from "@/assets/lufthansa-experience.jpg";
import hotChocImg from "@/assets/hot-chocolate.jpg";
import craftImg from "@/assets/craftsmanship.jpg";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "L'Esperienza · Rizzati Cioccolato" },
      { name: "description", content: "Caffè, degustazioni, lounge e collaborazioni Lufthansa: l'esperienza Rizzati a Milano e in alta quota." },
      { property: "og:title", content: "L'Esperienza · Rizzati" },
      { property: "og:description", content: "Tasting, lounge and Lufthansa moments at Maison Rizzati." },
      { property: "og:image", content: atmosphereImg },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const { lang } = useLang();
  const t = (it: string, en: string) => (lang === "it" ? it : en);

  return (
    <div className="bg-background pt-32">
      <section className="relative h-[80svh] min-h-[560px] overflow-hidden -mt-32 pt-0">
        <img src={atmosphereImg} alt="Salotto Rizzati" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1100} />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/50 to-noir/85" />
        <div className="relative h-full container-luxury flex flex-col justify-end pb-24 text-cream">
          <Reveal>
            <p className="eyebrow text-cream/70">{t("L'Esperienza", "The Experience")}</p>
            <h1 className="display-xl mt-8 max-w-4xl">
              {t("Un salotto italiano", "An Italian salon,")}
              <br />
              <span className="italic">{t("a un passo dalle nuvole.", "a step from the clouds.")}</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="container-luxury py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <Bilingual it="Atmosfera" en="Atmosphere" />
            <p className="mt-10 text-foreground/75 font-light leading-relaxed">
              {t(
                "Marmi caldi, ottoni levigati, pelle invecchiata. Un'illuminazione lenta, mai gridata. Il nostro salotto è pensato come una pausa fuori dal tempo — il tempo del cioccolato, che non ha fretta.",
                "Warm marbles, polished brass, aged leather. A slow, never-shouted lighting. Our salon is designed as a pause outside of time — chocolate time, which is never in a hurry."
              )}
            </p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="img-frame aspect-[16/11]">
              <img src={hotChocImg} alt="Cioccolata calda" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tasting */}
      <section className="bg-bone py-32">
        <div className="container-luxury">
          <Reveal className="text-center max-w-2xl mx-auto">
            <Bilingual it="Le Degustazioni" en="The Tastings" align="center" />
            <p className="mt-8 text-foreground/70 font-light">
              {t(
                "Un percorso sensoriale guidato dal nostro maître chocolatier. Dalla fava al cioccolato, dal Venezuela alla tazza.",
                "A sensory journey guided by our maître chocolatier. From bean to chocolate, from Venezuela to the cup."
              )}
            </p>
          </Reveal>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { it: "Le Origini", en: "The Origins", dur: "60 min", price: "€ 65", desc: "Quattro monorigine in degustazione cieca." },
              { it: "Sopra le Nuvole", en: "Above the Clouds", dur: "90 min", price: "€ 120", desc: "Esperienza ispirata al servizio Lufthansa First Class." },
              { it: "Il Maître Privato", en: "Private Maître", dur: "120 min", price: "€ 280", desc: "Sessione privata con Giovanni Rizzati." },
            ].map((e, i) => (
              <Reveal key={e.en} delay={i * 0.1}>
                <article className="bg-background border border-border p-10 h-full flex flex-col">
                  <p className="eyebrow">{e.dur}</p>
                  <h3 className="font-serif text-3xl mt-6 font-light">{e.it}</h3>
                  <p className="subtitle-en mt-2">{e.en}</p>
                  <p className="mt-6 text-sm text-foreground/65 font-light flex-1">{e.desc}</p>
                  <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                    <span className="font-serif text-2xl">{e.price}</span>
                    <button className="text-[11px] tracking-[0.24em] uppercase link-underline">
                      {t("Prenota", "Reserve")} →
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lufthansa moment */}
      <section className="bg-noir text-cream py-32">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <Reveal className="lg:col-span-6">
            <div className="img-frame aspect-[4/3]">
              <img src={lufthansaImg} alt="Lufthansa First Class" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] uppercase text-lufthansa-soft">
                <span className="block h-px w-10 bg-lufthansa-soft" />
                {t("Co-creazione", "Co-creation")} · Lufthansa
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-8 text-cream">
                {t("Hospitality, in Italian.", "Hospitality, in Italian.")}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-cream/75 font-light leading-relaxed">
                {t(
                  "Una capsule collection sviluppata insieme allo chef di Lufthansa First Class. Praline al caffè etiope, tartufi al pistacchio di Bronte, foglia d'oro: un piccolo viaggio italiano da assaporare a undicimila metri.",
                  "A capsule collection developed with the Lufthansa First Class chef. Ethiopian coffee pralines, Bronte pistachio truffles, gold leaf: a small Italian journey to be savoured at thirty-six thousand feet."
                )}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-12 grid grid-cols-2 gap-8 max-w-md">
                {[
                  { n: "08", l: "Praline esclusive", e: "Exclusive pralines" },
                  { n: "2024", l: "Anno di lancio", e: "Launch year" },
                ].map((s) => (
                  <div key={s.n}>
                    <p className="font-serif text-5xl text-accent font-light">{s.n}</p>
                    <p className="text-xs text-cream/60 mt-3">{s.l}</p>
                    <p className="text-[10px] tracking-[0.22em] uppercase text-cream/40 mt-1">{s.e}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-luxury py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <Reveal className="lg:col-span-6">
          <Bilingual it="Eventi privati" en="Private events" />
          <p className="mt-10 text-foreground/75 font-light leading-relaxed">
            {t(
              "Aperitivi al cioccolato, cene cioccolato-vino, masterclass per piccoli gruppi. La maison si trasforma a vostro piacimento.",
              "Chocolate aperitifs, chocolate-and-wine dinners, masterclasses for small groups. The maison transforms at your pleasure."
            )}
          </p>
        </Reveal>
        <Reveal className="lg:col-span-6" delay={0.1}>
          <div className="img-frame aspect-[4/3]">
            <img src={craftImg} alt="Eventi" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
