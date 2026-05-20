import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Bilingual, useLang } from "@/lib/i18n";
import founderImg from "@/assets/founder.jpg";
import craftImg from "@/assets/craftsmanship.jpg";
import cocoaImg from "@/assets/cocoa.jpg";
import atmosphereImg from "@/assets/atmosphere.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "La Maison · Rizzati Cioccolato" },
      { name: "description", content: "L'eredità della famiglia Rizzati, l'artigianato italiano del cioccolato, gli ingredienti, la filosofia." },
      { property: "og:title", content: "La Maison · Rizzati" },
      { property: "og:description", content: "Heritage, craftsmanship and philosophy of an Italian chocolate maison." },
      { property: "og:image", content: founderImg },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { lang } = useLang();
  const t = (it: string, en: string) => (lang === "it" ? it : en);

  return (
    <div className="bg-background pt-32">
      <section className="container-luxury py-20">
        <Reveal>
          <p className="eyebrow">{t("La Maison", "The Maison")}</p>
          <h1 className="display-xl mt-8 max-w-5xl">
            {t("Dal 1947, l'eredità", "Since 1947, the heritage")}
            <br />
            <span className="italic">{t("di una famiglia milanese.", "of a Milanese family.")}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-12 max-w-2xl text-foreground/75 text-lg font-light leading-relaxed">
            {t(
              "Una casa, tre generazioni, una sola disciplina: il cioccolato come forma di rispetto. Verso la materia, verso il tempo, verso chi assaggia.",
              "One house, three generations, one discipline: chocolate as a form of respect. For the matter, for time, for the one who tastes."
            )}
          </p>
        </Reveal>
      </section>

      <section className="container-luxury py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <Reveal className="lg:col-span-6">
          <div className="img-frame aspect-[4/5]">
            <img src={founderImg} alt="Giovanni Rizzati" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <p className="mt-4 text-xs text-muted-foreground tracking-wider">
            {t("Giovanni Rizzati, terza generazione · Milano", "Giovanni Rizzati, third generation · Milan")}
          </p>
        </Reveal>
        <div className="lg:col-span-6">
          <Reveal>
            <Bilingual it="Il fondatore" en="The founder" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-foreground/75 font-light leading-relaxed">
              {t(
                "Nel 1947, Tommaso Rizzati apre un piccolo laboratorio in Via della Spiga. Dalla Sicilia porta il rigore del lavoro, dalla Francia la tecnica appresa a Lione, dall'Italia la convinzione che la bellezza si nasconde nel gesto quotidiano.",
                "In 1947, Tommaso Rizzati opens a small workshop on Via della Spiga. From Sicily he brings the rigour of work, from France the technique learned in Lyon, from Italy the conviction that beauty hides in the everyday gesture."
              )}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-foreground/75 font-light leading-relaxed">
              {t(
                "Settant'anni dopo, suo nipote Giovanni custodisce le stesse ricette, gli stessi marmi, la stessa pazienza. Il laboratorio è cresciuto. La filosofia, mai.",
                "Seventy years later, his grandson Giovanni guards the same recipes, the same marbles, the same patience. The workshop has grown. The philosophy never."
              )}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-32 bg-bone">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <Reveal>
              <Bilingual it="Gli ingredienti" en="The ingredients" />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 text-foreground/75 font-light leading-relaxed">
                {t(
                  "Cacao monorigine selezionato a mano in Venezuela, Madagascar e São Tomé. Latte fresco delle Alpi. Vaniglia bourbon. Sale di Trapani. Nessun conservante, nessuna scorciatoia.",
                  "Single-origin cocoa hand-picked in Venezuela, Madagascar and São Tomé. Fresh Alpine milk. Bourbon vanilla. Trapani salt. No preservatives, no shortcuts."
                )}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-12 space-y-5">
                {[
                  { it: "Cacao", en: "Cocoa", v: "Monorigine · 65–80%" },
                  { it: "Latte", en: "Milk", v: "Alpi italiane · fresco" },
                  { it: "Zucchero", en: "Sugar", v: "Canna grezza biologica" },
                  { it: "Vaniglia", en: "Vanilla", v: "Bourbon Madagascar" },
                ].map((i) => (
                  <li key={i.en} className="flex justify-between border-b border-border pb-3">
                    <div>
                      <p className="font-serif text-xl">{i.it}</p>
                      <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">{i.en}</p>
                    </div>
                    <span className="text-sm text-foreground/70 self-end">{i.v}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 order-1 lg:order-2">
            <div className="img-frame aspect-[4/3]">
              <img src={cocoaImg} alt="Fave di cacao" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-32 container-luxury grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <Reveal className="lg:col-span-7">
          <div className="img-frame aspect-[16/11]">
            <img src={craftImg} alt="Lavorazione" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <div className="lg:col-span-5">
          <Reveal>
            <Bilingual it="La filosofia" en="The philosophy" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-foreground/75 font-light leading-relaxed">
              {t(
                "Crediamo nel tempo. Una praline Rizzati richiede settantadue ore — di selezione, conca, temperaggio, riposo. Niente è automatizzato che possa essere fatto a mano. Niente è veloce che possa essere fatto bene.",
                "We believe in time. A Rizzati praline takes seventy-two hours — of selection, conching, tempering, resting. Nothing is automated that can be done by hand. Nothing is fast that can be done well."
              )}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative h-[70svh] min-h-[480px] overflow-hidden">
        <img src={atmosphereImg} alt="Atelier" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-noir/55" />
        <div className="relative h-full container-luxury flex items-center text-cream">
          <Reveal>
            <p className="font-serif text-3xl md:text-5xl italic font-light max-w-3xl leading-tight">
              {t(
                "« Non vendiamo cioccolato. Custodiamo un'attesa. »",
                "« We do not sell chocolate. We guard an anticipation. »"
              )}
            </p>
            <p className="mt-6 text-xs tracking-[0.32em] uppercase text-cream/60">— Giovanni Rizzati</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
