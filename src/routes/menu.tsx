import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/i18n";
import hotChocImg from "@/assets/hot-chocolate.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Carta · Rizzati Cioccolato" },
      { name: "description", content: "Cioccolata calda, caffè speciali, dessert e degustazioni firmate Rizzati." },
      { property: "og:title", content: "Carta · Rizzati" },
      { property: "og:description", content: "The Rizzati menu — hot chocolate, coffees, desserts and tasting sets." },
      { property: "og:image", content: hotChocImg },
    ],
  }),
  component: MenuPage,
});

type Item = { it: string; en: string; desc: string; price: string };
type Section = { it: string; en: string; items: Item[] };

const SECTIONS: Section[] = [
  {
    it: "Cioccolata Calda",
    en: "Hot Chocolate",
    items: [
      { it: "Della Casa", en: "House blend", desc: "Cacao monorigine Venezuela 75%, panna fresca", price: "€ 14" },
      { it: "Notturna", en: "Notturna", desc: "Cacao 85%, fior di sale, scorza d'arancia", price: "€ 16" },
      { it: "Bianca al Pistacchio", en: "White & pistachio", desc: "Cioccolato bianco, pistacchio di Bronte", price: "€ 15" },
      { it: "Sopra le Nuvole", en: "Above the Clouds", desc: "Cacao etiope, cardamomo, schiuma di latte", price: "€ 18" },
    ],
  },
  {
    it: "Caffè Speciali",
    en: "Specialty Coffee",
    items: [
      { it: "Espresso · Etiopia Sidamo", en: "Espresso · Ethiopia Sidamo", desc: "Note di bergamotto, finale floreale", price: "€ 6" },
      { it: "Cappuccino della Maison", en: "Maison Cappuccino", desc: "Latte alpino, cacao spolverato a mano", price: "€ 7" },
      { it: "Caffè al Cioccolato", en: "Chocolate Coffee", desc: "Espresso, ganache fondente, panna", price: "€ 9" },
      { it: "Affogato Notturno", en: "Notturno Affogato", desc: "Gelato al cioccolato 80%, espresso", price: "€ 11" },
    ],
  },
  {
    it: "Dessert",
    en: "Desserts",
    items: [
      { it: "Tortino al Cuore Caldo", en: "Warm-heart tart", desc: "Cacao 70%, cuore liquido, gelato fior di latte", price: "€ 16" },
      { it: "Mousse delle Tre Origini", en: "Three-origin mousse", desc: "Venezuela, Madagascar, São Tomé", price: "€ 14" },
      { it: "Millefoglie del Maître", en: "Maître's millefoglie", desc: "Crema al cioccolato bianco, lampone", price: "€ 15" },
    ],
  },
  {
    it: "Cioccolato Firmato",
    en: "Signature Chocolate",
    items: [
      { it: "Praline d'Oro · 6 pezzi", en: "Gold Pralines · 6 pieces", desc: "Foglia d'oro 24 carati", price: "€ 28" },
      { it: "Praline d'Oro · 12 pezzi", en: "Gold Pralines · 12 pieces", desc: "Cofanetto firmato", price: "€ 48" },
      { it: "Selezione del Maître", en: "Maître's Selection", desc: "Otto varietà numerate a mano", price: "€ 62" },
    ],
  },
  {
    it: "Specialità di Stagione",
    en: "Seasonal Specials",
    items: [
      { it: "Marrons Glacés", en: "Marrons Glacés", desc: "Castagne candite, glassa al cacao", price: "€ 22" },
      { it: "Panettone al Cioccolato", en: "Chocolate Panettone", desc: "Lievitazione 72 ore, gocce 70%", price: "€ 58" },
    ],
  },
  {
    it: "Degustazioni di Lusso",
    en: "Luxury Tasting Sets",
    items: [
      { it: "Le Origini", en: "The Origins", desc: "Quattro monorigine, accompagnate", price: "€ 65" },
      { it: "Sopra le Nuvole", en: "Above the Clouds", desc: "Quattro portate · in collaborazione con Lufthansa", price: "€ 95" },
      { it: "Esperienza del Maître", en: "Maître Experience", desc: "Sessione privata · per due", price: "€ 280" },
    ],
  },
];

function MenuPage() {
  const { lang } = useLang();
  const t = (it: string, en: string) => (lang === "it" ? it : en);

  return (
    <div className="bg-background pt-32">
      <section className="container-luxury py-20 text-center max-w-3xl mx-auto">
        <Reveal>
          <p className="eyebrow">{t("La Carta", "The Menu")}</p>
          <h1 className="display-xl mt-8">
            {t("Carta della Casa", "House Menu")}
          </h1>
          <p className="subtitle-en mt-4">— Italian and English —</p>
          <p className="mt-10 text-foreground/65 font-light">
            {t(
              "Una selezione che racconta tre generazioni di lavoro. Le ricette cambiano con le stagioni. La cura, mai.",
              "A selection that tells three generations of work. The recipes change with the seasons. The care never does."
            )}
          </p>
        </Reveal>
      </section>

      <section className="container-luxury py-20 max-w-3xl mx-auto">
        {SECTIONS.map((s, idx) => (
          <div key={s.en} className={idx > 0 ? "mt-24" : ""}>
            <Reveal>
              <div className="text-center mb-14">
                <span className="gold-rule" />
                <h2 className="display-md mt-6 font-light">{s.it}</h2>
                <p className="subtitle-en mt-2">{s.en}</p>
              </div>
            </Reveal>
            <div className="space-y-8">
              {s.items.map((it) => (
                <Reveal key={it.en}>
                  <div className="grid grid-cols-12 gap-6 pb-7 border-b border-border">
                    <div className="col-span-9 md:col-span-10">
                      <h3 className="font-serif text-xl md:text-2xl font-light">{it.it}</h3>
                      <p className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground mt-1">{it.en}</p>
                      <p className="mt-3 text-sm text-foreground/65 font-light">{it.desc}</p>
                    </div>
                    <div className="col-span-3 md:col-span-2 text-right">
                      <span className="font-serif text-xl md:text-2xl">{it.price}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-noir text-cream py-24 mt-12">
        <div className="container-luxury text-center max-w-xl mx-auto">
          <p className="eyebrow text-cream/55">{t("Servizio", "Service")}</p>
          <p className="mt-6 font-serif text-2xl italic font-light text-cream/85 leading-relaxed">
            {t(
              "Tutti i piatti sono preparati al momento. I tempi di attesa fanno parte del rito.",
              "All dishes are prepared to order. The waiting time is part of the ritual."
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
