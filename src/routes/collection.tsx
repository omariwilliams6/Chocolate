import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/i18n";
import pralineImg from "@/assets/praline.jpg";
import collectionImg from "@/assets/collection.jpg";
import packagingImg from "@/assets/packaging.jpg";
import hotChocImg from "@/assets/hot-chocolate.jpg";
import heroImg from "@/assets/hero-chocolate.jpg";
import craftImg from "@/assets/craftsmanship.jpg";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "Collezione · Rizzati Cioccolato" },
      { name: "description", content: "La collezione di praline, tartufi, tavolette e cofanetti regalo della maison Rizzati." },
      { property: "og:title", content: "Collezione · Rizzati" },
      { property: "og:description", content: "The signature chocolate collection from Maison Rizzati." },
      { property: "og:image", content: collectionImg },
    ],
  }),
  component: CollectionPage,
});

const PRODUCTS = [
  { id: 1, img: pralineImg, it: "Praline d'Oro", en: "Gold Pralines", cat: "praline", price: "€ 48", note: "12 pezzi · cacao 72% · foglia d'oro 24k" },
  { id: 2, img: collectionImg, it: "Selezione Tartufi", en: "Truffle Selection", cat: "tartufi", price: "€ 62", note: "Otto varietà · cofanetto firmato" },
  { id: 3, img: packagingImg, it: "Cofanetto Notturno", en: "Notturno Box", cat: "regalo", price: "€ 145", note: "Edizione limitata · sigillo a mano" },
  { id: 4, img: hotChocImg, it: "Cioccolata in Tazza", en: "Cup Chocolate", cat: "calda", price: "€ 28", note: "Polvere monorigine Venezuela" },
  { id: 5, img: heroImg, it: "Tavoletta Origini", en: "Origins Bar", cat: "tavolette", price: "€ 18", note: "Madagascar 75% · 80g" },
  { id: 6, img: craftImg, it: "Esperienza Maître", en: "Maître Experience", cat: "regalo", price: "€ 220", note: "Degustazione privata · per due" },
];

const FILTERS = [
  { id: "tutto", it: "Tutto", en: "All" },
  { id: "praline", it: "Praline", en: "Pralines" },
  { id: "tartufi", it: "Tartufi", en: "Truffles" },
  { id: "tavolette", it: "Tavolette", en: "Bars" },
  { id: "calda", it: "Cioccolata calda", en: "Hot chocolate" },
  { id: "regalo", it: "Regalo", en: "Gifts" },
] as const;

function CollectionPage() {
  const { lang } = useLang();
  const t = (it: string, en: string) => (lang === "it" ? it : en);
  const [filter, setFilter] = useState<string>("tutto");
  const items = filter === "tutto" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  return (
    <div className="bg-background pt-32">
      <section className="container-luxury py-20">
        <Reveal>
          <p className="eyebrow">{t("La Collezione", "The Collection")}</p>
          <h1 className="display-xl mt-8 max-w-4xl">
            {t("Una piccola libreria", "A small library")}
            <br />
            <span className="italic">{t("di emozioni edibili.", "of edible emotions.")}</span>
          </h1>
        </Reveal>
      </section>

      {/* Dark filter bar */}
      <section className="bg-noir text-cream py-8 sticky top-20 z-30 backdrop-blur-md">
        <div className="container-luxury flex gap-2 md:gap-6 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`whitespace-nowrap text-[11px] tracking-[0.24em] uppercase py-2 px-1 transition-colors ${
                filter === f.id ? "text-accent border-b border-accent" : "text-cream/60 hover:text-cream"
              }`}
            >
              {lang === "it" ? f.it : f.en}
            </button>
          ))}
        </div>
      </section>

      <section className="container-luxury py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <article className="group cursor-pointer">
                <div className="img-frame aspect-[4/5] bg-cocoa">
                  <img src={p.img} alt={p.it} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out bg-gradient-to-t from-noir to-transparent">
                    <button className="w-full text-cream border border-cream/40 hover:bg-cream hover:text-noir py-3 text-[10px] tracking-[0.28em] uppercase transition-colors">
                      {t("Aggiungi", "Add to box")}
                    </button>
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-light">{p.it}</h2>
                    <p className="subtitle-en mt-1">{p.en}</p>
                  </div>
                  <span className="font-serif text-xl mt-1">{p.price}</span>
                </div>
                <p className="mt-3 text-sm text-foreground/65 font-light">{p.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GIFTING band */}
      <section className="bg-bone py-32">
        <div className="container-luxury text-center max-w-2xl mx-auto">
          <Reveal>
            <p className="eyebrow">{t("Servizio regalo", "Gift service")}</p>
            <h2 className="display-lg mt-6">
              {t("Personalizziamo ogni cofanetto.", "We bespoke every box.")}
            </h2>
            <p className="mt-8 text-foreground/70 font-light">
              {t(
                "Dediche calligrafate a mano, sigilli in cera, consegna in tutta Europa attraverso i partner Lufthansa Cargo.",
                "Hand-calligraphed dedications, wax seals, delivery throughout Europe via Lufthansa Cargo partners."
              )}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
