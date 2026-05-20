import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { Bilingual, useLang } from "@/lib/i18n";

import heroImg from "@/assets/hero-chocolate.jpg";
import craftImg from "@/assets/craftsmanship.jpg";
import lufthansaImg from "@/assets/lufthansa-experience.jpg";
import packagingImg from "@/assets/packaging.jpg";
import atmosphereImg from "@/assets/atmosphere.jpg";
import pralineImg from "@/assets/praline.jpg";
import hotChocImg from "@/assets/hot-chocolate.jpg";
import collectionImg from "@/assets/collection.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Rizzati · Cioccolato Italiano servito sopra le nuvole" },
      { name: "description", content: "Una maison italiana del cioccolato. Artigianato, eleganza e l'arte del viaggio in collaborazione con Lufthansa." },
      { property: "og:title", content: "Maison Rizzati · Cioccolato Italiano" },
      { property: "og:description", content: "Italian luxury chocolate, served above the clouds." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { lang } = useLang();
  const t = (it: string, en: string) => (lang === "it" ? it : en);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="bg-background">
      {/* HERO */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-noir text-cream">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src={heroImg}
            alt="Cioccolato artigianale con foglia d'oro"
            className="h-full w-full object-cover"
            width={1920}
            height={1280}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir/40 via-noir/20 to-noir/85" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative h-full container-luxury flex flex-col justify-end pb-24 md:pb-32"
        >
          <Reveal>
            <p className="eyebrow text-cream/70">Maison Rizzati · Milano · Est. 1947</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="display-xl mt-6 max-w-5xl text-cream font-extralight">
              {t("L'arte italiana del cioccolato,", "The Italian art of chocolate,")}
              <br />
              <span className="italic font-light">{t("servita sopra le nuvole.", "served above the clouds.")}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-cream/75 text-lg font-light leading-relaxed">
              {t(
                "Tre generazioni di maestri cioccolatieri a Milano. Una collaborazione discreta con Lufthansa per un'esperienza di gusto in alta quota.",
                "Three generations of master chocolatiers in Milan. A discreet collaboration with Lufthansa for a tasting experience at altitude."
              )}
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link to="/collection" className="btn-ghost-luxury">
                {t("Esplora la collezione", "Explore the collection")}
                <span aria-hidden>→</span>
              </Link>
              <Link to="/experience" className="text-cream/80 hover:text-cream link-underline self-center text-[11px] tracking-[0.24em] uppercase">
                {t("Vivi l'esperienza", "Live the experience")}
              </Link>
            </div>
          </Reveal>
        </motion.div>

        <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-3 text-[10px] tracking-[0.32em] uppercase text-cream/50">
          <span className="block h-px w-10 bg-lufthansa-soft" />
          {t("In partnership con Lufthansa", "In partnership with Lufthansa")}
        </div>
      </section>

      {/* INTRO / STORY */}
      <section className="py-32 md:py-48 container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">{t("La nostra storia", "Our story")}</p>
              <h2 className="display-lg mt-6">
                {t("Una passione tramandata", "A passion handed down")}
                <br />
                <span className="italic">{t("da tre generazioni.", "across three generations.")}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 text-foreground/75 leading-relaxed font-light">
                {t(
                  "Dal 1947, la famiglia Rizzati custodisce l'arte del cioccolato come un'eredità preziosa. Ogni praline nasce nel nostro laboratorio milanese, modellata a mano, temperata su marmo, rifinita con la pazienza che solo il tempo sa insegnare.",
                  "Since 1947, the Rizzati family has guarded the art of chocolate as a precious inheritance. Every praline is born in our Milanese laboratory, hand-shaped, marble-tempered, finished with the patience only time can teach."
                )}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link to="/about" className="mt-12 inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase font-medium link-underline">
                {t("Scopri la maison", "Discover the maison")}
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="img-frame aspect-[4/3]">
              <img src={craftImg} alt="Maestro cioccolatiere" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground tracking-wider">
              {t("Il temperaggio sul marmo · Laboratorio Milano", "Marble tempering · Milan workshop")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* LUFTHANSA PARTNERSHIP */}
      <section className="relative bg-noir text-cream overflow-hidden">
        <div className="container-luxury py-32 md:py-48 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <Reveal className="lg:col-span-7 order-2 lg:order-1">
            <div className="img-frame aspect-[16/10]">
              <img src={lufthansaImg} alt="Esperienza Lufthansa" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <Reveal>
              <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] uppercase text-lufthansa-soft">
                <span className="block h-px w-10 bg-lufthansa-soft" />
                {t("Partnership discreta", "A discreet partnership")}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-8 text-cream">
                {t("Servito a undicimila", "Served at thirty-six")}
                <br />
                <span className="italic">{t("metri d'altitudine.", "thousand feet.")}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-cream/70 leading-relaxed font-light">
                {t(
                  "Le nostre praline accompagnano i passeggeri di Lufthansa First Class — un piccolo rituale italiano fra le nuvole, dove l'ospitalità si fa esperienza sensoriale.",
                  "Our pralines accompany Lufthansa First Class passengers — a small Italian ritual among the clouds, where hospitality becomes a sensory experience."
                )}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link to="/experience" className="mt-10 inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase text-cream link-underline">
                {t("Scopri la collaborazione", "Discover the collaboration")} <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="py-32 md:py-48 container-luxury">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <Reveal>
            <Bilingual it="La Collezione" en="The Signature Collection" />
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/collection" className="link-underline text-[11px] tracking-[0.24em] uppercase">
              {t("Vedi tutte", "View all")} →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            { img: pralineImg, it: "Praline d'Oro", en: "Gold Pralines", note: "Cacao 72% · foglia d'oro 24k" },
            { img: collectionImg, it: "Selezione Tartufi", en: "Truffle Selection", note: "Otto varietà · cofanetto firmato" },
            { img: hotChocImg, it: "Cioccolata Calda", en: "Hot Chocolate", note: "Ricetta del 1953 · servita in tazza" },
          ].map((p, i) => (
            <Reveal key={p.it} delay={i * 0.1}>
              <article className="group">
                <div className="img-frame aspect-[4/5]">
                  <img src={p.img} alt={p.it} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-light">{p.it}</h3>
                    <p className="subtitle-en mt-1">{p.en}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2">N°0{i + 1}</span>
                </div>
                <p className="mt-3 text-sm text-foreground/70 font-light">{p.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CRAFTED IN ITALY — full bleed */}
      <section className="relative h-[80svh] min-h-[520px] overflow-hidden">
        <img src={atmosphereImg} alt="Atmosfera Maison Rizzati" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/85 via-noir/30 to-noir/40" />
        <div className="relative h-full container-luxury flex flex-col justify-end pb-24 text-cream">
          <Reveal>
            <p className="eyebrow text-cream/70">Crafted in Italy · Milano</p>
            <h2 className="display-lg mt-6 max-w-3xl">
              {t("Ogni dettaglio è una dichiarazione", "Every detail is a quiet")}
              <br />
              <span className="italic">{t("silenziosa di intenzione.", "declaration of intent.")}</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* GIFT EXPERIENCE */}
      <section className="py-32 md:py-48 container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div className="img-frame aspect-[4/5]">
              <img src={packagingImg} alt="Confezione di lusso" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow">{t("Esperienza regalo", "Gift experience")}</p>
              <h2 className="display-lg mt-6">
                {t("Un dono che si apre", "A gift that opens")}
                <br />
                <span className="italic">{t("come un rituale.", "like a ritual.")}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-10 text-foreground/75 leading-relaxed font-light max-w-md">
                {t(
                  "Cofanetti in cartoncino nero satinato, nastro in seta, sigillo in cera bordeaux. Ogni confezione è un omaggio al gesto antico del regalare.",
                  "Boxes in satin black board, silk ribbon, bordeaux wax seal. Every package is an homage to the ancient gesture of giving."
                )}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { it: "Personalizzazione", en: "Bespoke" },
                  { it: "Consegna globale", en: "Global delivery" },
                  { it: "Sigillo a mano", en: "Hand-sealed" },
                ].map((f) => (
                  <div key={f.en} className="border-t border-border pt-3">
                    <p className="text-xs font-medium">{f.it}</p>
                    <p className="text-[10px] text-muted-foreground tracking-wider mt-0.5">{f.en}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-bone py-32 md:py-40">
        <div className="container-luxury">
          <Reveal className="text-center">
            <p className="eyebrow">{t("Testimonianze", "Testimonials")}</p>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { q: "Un'eleganza che si scioglie lentamente. Il miglior cioccolato che abbia assaggiato in volo.", a: "Vogue Italia", role: "Travel Editor" },
              { q: "L'incontro perfetto fra artigianato italiano e ospitalità internazionale.", a: "Monocle", role: "Magazine" },
              { q: "Ogni praline è un piccolo viaggio. Servito con precisione svizzera, anima italiana.", a: "Lufthansa Magazin", role: "Onboard" },
            ].map((q, i) => (
              <Reveal key={q.a} delay={i * 0.1}>
                <figure>
                  <span className="font-serif text-5xl text-accent leading-none">"</span>
                  <blockquote className="mt-2 font-serif text-xl italic font-light leading-relaxed text-foreground/85">
                    {q.q}
                  </blockquote>
                  <figcaption className="mt-6 text-xs tracking-[0.22em] uppercase text-muted-foreground">
                    — {q.a} · <span className="opacity-70">{q.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section className="py-32 md:py-48 container-luxury">
        <Reveal>
          <Bilingual it="Carta della Casa" en="House Menu" align="center" className="mx-auto" />
        </Reveal>

        <div className="mt-20 max-w-3xl mx-auto space-y-10">
          {[
            { it: "Cioccolata Calda della Casa", en: "House Hot Chocolate", desc: "Cacao monorigine Venezuela 75%, panna fresca", price: "€ 14" },
            { it: "Praline Selezione del Maître", en: "Maître's Praline Selection", desc: "Sei pezzi · cofanetto in cartoncino nero", price: "€ 38" },
            { it: "Caffè Espresso · Etiopia Sidamo", en: "Espresso · Ethiopia Sidamo", desc: "Tostatura artigianale · note di bergamotto", price: "€ 6" },
            { it: "Degustazione 'Sopra le Nuvole'", en: "'Above the Clouds' Tasting", desc: "Quattro portate · in collaborazione con Lufthansa", price: "€ 95" },
          ].map((m) => (
            <Reveal key={m.en}>
              <div className="grid grid-cols-12 gap-6 pb-8 border-b border-border">
                <div className="col-span-9 md:col-span-10">
                  <h3 className="font-serif text-2xl font-light">{m.it}</h3>
                  <p className="subtitle-en mt-1">{m.en}</p>
                  <p className="mt-3 text-sm text-foreground/65 font-light">{m.desc}</p>
                </div>
                <div className="col-span-3 md:col-span-2 text-right">
                  <span className="font-serif text-2xl">{m.price}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="text-center mt-16">
            <Link to="/menu" className="btn-luxury">
              {t("Carta completa", "Full menu")} <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-noir text-cream py-32">
        <div className="container-luxury max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow text-cream/60">{t("Lettere dalla Maison", "Letters from the Maison")}</p>
            <h2 className="display-lg mt-6 text-cream">
              {t("Il cioccolato, raccontato", "Chocolate, told with")}
              <br />
              <span className="italic">{t("con cura.", "the utmost care.")}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <form className="mt-12 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder={t("La vostra e-mail", "Your e-mail")}
                className="flex-1 bg-transparent border border-cream/30 px-5 py-4 text-cream placeholder:text-cream/40 text-sm tracking-wider focus:border-cream focus:outline-none transition"
              />
              <button type="submit" className="btn-ghost-luxury">
                {t("Iscriviti", "Subscribe")}
              </button>
            </form>
            <p className="mt-6 text-xs text-cream/45 tracking-wider">
              {t("Quattro lettere all'anno. Mai una di più.", "Four letters a year. Never one more.")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-32 container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <Reveal>
            <p className="eyebrow">{t("Boutique", "Boutique")}</p>
            <h2 className="display-md mt-6">
              {t("Via della Spiga 18, Milano", "Via della Spiga 18, Milan")}
            </h2>
            <p className="subtitle-en mt-3">A step from the Quadrilatero della Moda</p>
            <div className="mt-10 space-y-3 text-foreground/75 font-light">
              <p>Lunedì – Sabato · 10:00 – 20:00</p>
              <p>Domenica · 11:00 – 19:00</p>
              <p className="text-sm text-muted-foreground mt-6">+39 02 7600 4421 · maison@rizzaticioccolato.it</p>
            </div>
            <Link to="/contact" className="mt-10 inline-flex link-underline text-[11px] tracking-[0.24em] uppercase">
              {t("Prenota un'esperienza", "Reserve an experience")} →
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="img-frame aspect-[4/3] bg-muted">
              <iframe
                title="Maison Rizzati Milano"
                src="https://www.openstreetmap.org/export/embed.html?bbox=9.193%2C45.467%2C9.205%2C45.473&layer=mapnik&marker=45.470%2C9.199"
                className="h-full w-full grayscale-[0.6] contrast-110"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
