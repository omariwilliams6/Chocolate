import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/i18n";
import founderImg from "@/assets/founder.jpg";
import cocoaImg from "@/assets/cocoa.jpg";
import atmosphereImg from "@/assets/atmosphere.jpg";
import lufthansaImg from "@/assets/lufthansa-experience.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Chi siamo · Rizzati Ferrara" },
      {
        name: "description",
        content:
          "Rizzati Ferrara: cioccolato, canditi e specialità biologiche realizzate a Ferrara con materie prime naturali.",
      },
      { property: "og:title", content: "Chi siamo · Rizzati Ferrara" },
      {
        property: "og:description",
        content:
          "Rizzati Ferrara: organic chocolate, candied fruit and artisan specialities from Ferrara.",
      },
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
          <p className="eyebrow">Rizzati Ferrara</p>
          <h1 className="display-xl mt-8 max-w-5xl">
            {t("Biologici per scelta,", "Organic by choice,")}
            <br />
            <span className="italic">
              {t("artigiani per natura.", "artisans by nature.")}
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-12 max-w-2xl text-foreground/75 text-lg font-light leading-relaxed">
            {t(
              "Rizzati nasce a Ferrara attorno a una convinzione semplice: il gusto migliore arriva da materie prime coltivate in modo naturale, lavorate con rispetto e senza scorciatoie.",
              "Rizzati was born in Ferrara around a simple belief: the best flavour comes from raw materials grown naturally, handled with respect and never rushed.",
            )}
          </p>
        </Reveal>
      </section>

      <section className="container-luxury py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <Reveal className="lg:col-span-6">
          <div className="img-frame aspect-[4/5]">
            <img
              src={founderImg}
              alt="Rizzati"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground tracking-wider">
            {t(
              "Rizzati Ferrara · Cioccolato e canditi",
              "Rizzati Ferrara · Chocolate and candied fruit",
            )}
          </p>
        </Reveal>
        <div className="lg:col-span-6">
          <Reveal>
            <div>
              <h2 className="display-lg text-foreground">
                {t("Chi siamo", "Who we are")}
              </h2>
              <p className="subtitle-en mt-3">
                {t(
                  "Radici ferraresi, vocazione biologica",
                  "Ferrara roots, organic instinct",
                )}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-foreground/75 font-light leading-relaxed">
              {t(
                "Siamo biologici perché crediamo che frutta, agrumi e cacao esprimano davvero il loro carattere solo quando la coltivazione rispetta la terra. Per questo scegliamo ingredienti da agricoltura biologica certificata e fornitori che custodiscono l'ambiente in cui lavorano.",
                "We are organic because we believe fruit, citrus and cocoa reveal their true character only when farming respects the land. That is why we choose certified organic ingredients and suppliers who protect the environment they work in.",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-foreground/75 font-light leading-relaxed">
              {t(
                "Il nostro lavoro parte dall'idea che la natura contenga sapori completi e differenze preziose. Fertilizzanti e antiparassitari chimici cancellano queste sfumature; noi lavoriamo anche scorze, bucce e parti aromatiche, quindi la purezza è essenziale.",
                "Our work begins with the idea that nature already contains complete flavours and valuable differences. Chemical fertilisers and pesticides flatten those nuances; because we also use peels, skins and aromatic parts, purity is essential.",
              )}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-noir text-cream py-32">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <Reveal className="lg:col-span-6">
            <div className="img-frame aspect-[4/3]">
              <img
                src={lufthansaImg}
                alt="Lufthansa First Class"
                loading="lazy"
                className="h-full w-full object-cover"
              />
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
                {t("Ospitalità,", "Hospitality,")}
                <br />
                <span className="italic">
                  {t("all'italiana.", "in Italian.")}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-cream/75 font-light leading-relaxed">
                {t(
                  "Una selezione sviluppata per Lufthansa First Class: praline, tartufi e piccoli gesti di cioccolato pensati come un viaggio italiano da assaporare in alta quota.",
                  "A selection developed for Lufthansa First Class: pralines, truffles and small chocolate gestures designed as an Italian journey to savour above the clouds.",
                )}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-12 grid grid-cols-2 gap-8 max-w-md">
                {[
                  {
                    n: "08",
                    it: "Praline esclusive",
                    en: "Exclusive pralines",
                  },
                  {
                    n: "2024",
                    it: "Anno di lancio",
                    en: "Launch year",
                  },
                ].map((s) => (
                  <div key={s.n}>
                    <p className="font-serif text-5xl text-accent font-light">
                      {s.n}
                    </p>
                    <p className="text-xs text-cream/60 mt-3">
                      {t(s.it, s.en)}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-32 bg-bone">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <Reveal>
              <div>
                <h2 className="display-lg text-foreground">
                  {t("Territori e materie prime", "Places and ingredients")}
                </h2>
                <p className="subtitle-en mt-3">
                  {t(
                    "Ogni sapore ha una geografia",
                    "Every flavour has a geography",
                  )}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 text-foreground/75 font-light leading-relaxed">
                {t(
                  "Ci consideriamo anche esploratori: cerchiamo il territorio più adatto a ogni ingrediente. Il limone trova casa a Sorrento, il bergamotto in Calabria, zucca e prugna nel Ferrarese. Clima e terreno sono parte del sapore finale.",
                  "We also see ourselves as explorers: we look for the place best suited to each ingredient. Lemon belongs in Sorrento, bergamot in Calabria, pumpkin and plum in the Ferrara area. Climate and soil shape the final flavour.",
                )}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-12 space-y-5">
                {[
                  {
                    it: "Agrumi",
                    en: "Citrus",
                    noteIt: "Profumi vivi",
                    noteEn: "Bright aromatics",
                    v: t("Sorrento · Calabria", "Sorrento · Calabria"),
                  },
                  {
                    it: "Frutta",
                    en: "Fruit",
                    noteIt: "Raccolta pulita",
                    noteEn: "Clean harvest",
                    v: t("Selezione biologica", "Organic selection"),
                  },
                  {
                    it: "Cacao",
                    en: "Cocoa",
                    noteIt: "Base essenziale",
                    noteEn: "Essential foundation",
                    v: t("Materie prime di qualità", "Quality raw materials"),
                  },
                  {
                    it: "Ferrara",
                    en: "Ferrara",
                    noteIt: "Casa e memoria",
                    noteEn: "Home and memory",
                    v: t(
                      "Zucca · prugna · tradizione",
                      "Pumpkin · plum · tradition",
                    ),
                  },
                ].map((i) => (
                  <li
                    key={i.en}
                    className="flex justify-between border-b border-border pb-3"
                  >
                    <div>
                      <p className="font-serif text-xl">{t(i.it, i.en)}</p>
                      <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
                        {t(i.noteIt, i.noteEn)}
                      </p>
                    </div>
                    <span className="text-sm text-foreground/70 self-end">
                      {i.v}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6 order-1 lg:order-2">
            <div className="img-frame aspect-[4/3]">
              <img
                src={cocoaImg}
                alt="Fave di cacao"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative h-[70svh] min-h-[480px] overflow-hidden">
        <img
          src={atmosphereImg}
          alt="Atelier"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-noir/55" />
        <div className="relative h-full container-luxury flex items-center text-cream">
          <Reveal>
            <p className="font-serif text-3xl md:text-5xl italic font-light max-w-3xl leading-tight">
              {t(
                "« Cerchiamo di non disperdere la ricchezza che la natura ci ha donato. »",
                "« We work so the richness nature has given us is never lost. »",
              )}
            </p>
            <p className="mt-6 text-xs tracking-[0.32em] uppercase text-cream/60">
              — Rizzati Ferrara
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
