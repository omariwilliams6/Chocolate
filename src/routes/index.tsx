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
      { title: "Rizzati · Cioccolato Italiano servito sopra le nuvole" },
      {
        name: "description",
        content:
          "Una italiana del cioccolato. Artigianato, eleganza e l'arte del viaggio in collaborazione con Lufthansa.",
      },
      { property: "og:title", content: "Rizzati · Cioccolato Italiano" },
      {
        property: "og:description",
        content: "Italian luxury chocolate, served above the clouds.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { lang } = useLang();
  const t = (it: string, en: string) => (lang === "it" ? it : en);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="bg-background">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[640px] overflow-hidden bg-noir text-cream"
      >
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
            <p className="eyebrow text-cream/70">
              Rizzati · Ferrara · Est. 1997
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="display-xl mt-6 max-w-5xl text-cream font-extralight">
              {t(
                "L'arte italiana del cioccolato,",
                "The Italian art of chocolate,",
              )}
              <br />
              <span className="italic font-light">
                {t("servita sopra le nuvole.", "served above the clouds.")}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-cream/75 text-lg font-light leading-relaxed">
              {t(
                "Tre generazioni di maestri cioccolatieri a Ferrara. Una collaborazione discreta con Lufthansa per un'esperienza di gusto in alta quota.",
                "Three generations of master chocolatiers in Ferrara. A discreet collaboration with Lufthansa for a tasting experience at altitude.",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link to="/collection" className="btn-ghost-luxury">
                {t("Esplora la collezione", "Explore the collection")}
                <span aria-hidden>→</span>
              </Link>
              <Link
                to="/contact"
                className="text-cream/80 hover:text-cream link-underline self-center text-[11px] tracking-[0.24em] uppercase"
              >
                {t("Contattaci", "Contact Us")}
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
                {t("L'arte", "The Art")}
                <br />
                <span className="italic">
                  {t("Del Cioccolato Biologico.", "of Organic Chocolate.")}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 text-foreground/75 leading-relaxed font-light">
                {t(
                  "Fondata a Ferrara nel 1997, Rizzati trasforma cacao puro e frutta candita in capolavori naturali. In quanto produttori 100% biologici, rifiutiamo i conservanti artificiali, garantendo che ogni pralina artigianale e Torta Tenerina regionale offra i sapori autentici e genuini della vera artigianalità italiana.",
                  "Founded in Ferrara in 1997, Rizzati transforms pure cocoa and candied fruits into natural masterpieces. As 100% organic producers, we reject artificial preservatives, ensuring every handcrafted praline and regional Torta Tenerina delivers the authentic, unhurried flavours of true Italian craftsmanship.",
                )}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                to="/about"
                className="mt-12 inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase font-medium link-underline"
              >
                {t("Scopri la Rizzati", "Discover the Rizzati")}
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="img-frame aspect-[4/3]">
              <img
                src={craftImg}
                alt="Maestro cioccolatiere"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-xs text-muted-foreground tracking-wider">
              {t(
                "Ingredienti biologici · Laboratorio Ferrara",
                "Organic Ingredients · Ferrara workshop",
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* LUFTHANSA PARTNERSHIP */}
      <section className="relative bg-noir text-cream overflow-hidden">
        <div className="container-luxury py-32 md:py-48 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <Reveal className="lg:col-span-7 order-2 lg:order-1">
            <div className="img-frame aspect-[16/10]">
              <img
                src={lufthansaImg}
                alt="Esperienza Lufthansa"
                loading="lazy"
                className="h-full w-full object-cover"
              />
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
                <span className="italic">
                  {t("metri d'altitudine.", "thousand feet.")}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-cream/70 leading-relaxed font-light">
                {t(
                  "Le nostre praline accompagnano i passeggeri di Lufthansa First Class — un piccolo rituale italiano fra le nuvole, dove l'ospitalità si fa esperienza sensoriale.",
                  "Our pralines accompany Lufthansa First Class passengers — a small Italian ritual among the clouds, where hospitality becomes a sensory experience.",
                )}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                to="/about"
                className="mt-10 inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase text-cream link-underline"
              >
                {t("Scopri la collaborazione", "Discover the collaboration")}{" "}
                <span aria-hidden>→</span>
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
            <Link
              to="/collection"
              className="link-underline text-[11px] tracking-[0.24em] uppercase"
            >
              {t("Vedi tutte", "View all")} →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              img: pralineImg,
              it: "Praline d'Oro",
              en: "Gold Pralines",
              note: "Cacao 72% · foglia d'oro 24k",
            },
            {
              img: collectionImg,
              it: "Selezione Tartufi",
              en: "Truffle Selection",
              note: "Otto varietà · cofanetto firmato",
            },
            {
              img: hotChocImg,
              it: "Cioccolata Calda",
              en: "Hot Chocolate",
              note: "Ricetta del 1953 · servita in tazza",
            },
          ].map((p, i) => (
            <Reveal key={p.it} delay={i * 0.1}>
              <article className="group">
                <div className="img-frame aspect-[4/5]">
                  <img
                    src={p.img}
                    alt={p.it}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-light">{p.it}</h3>
                    <p className="subtitle-en mt-1">{p.en}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2">
                    N°0{i + 1}
                  </span>
                </div>
                <p className="mt-3 text-sm text-foreground/70 font-light">
                  {p.note}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CRAFTED IN ITALY — full bleed */}
      <section className="relative h-[80svh] min-h-[520px] overflow-hidden">
        <img
          src={atmosphereImg}
          alt="Atmosfera Maison Rizzati"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/85 via-noir/30 to-noir/40" />
        <div className="relative h-full container-luxury flex flex-col justify-end pb-24 text-cream">
          <Reveal>
            <p className="eyebrow text-cream/70">Crafted in Italy · Ferrara</p>
            <h2 className="display-lg mt-6 max-w-3xl">
              {t(
                "Ogni dettaglio è una dichiarazione",
                "Every detail is a quiet",
              )}
              <br />
              <span className="italic">
                {t("silenziosa di intenzione.", "declaration of intent.")}
              </span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* GIFT EXPERIENCE */}
      <section className="py-32 md:py-48 container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div className="img-frame aspect-[4/5]">
              <img
                src={packagingImg}
                alt="Confezione di lusso"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow">
                {t("Esperienza regalo", "Gift experience")}
              </p>
              <h2 className="display-lg mt-6">
                {t("Un dono che si apre", "A gift that opens")}
                <br />
                <span className="italic">
                  {t("come un rituale.", "like a ritual.")}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-10 text-foreground/75 leading-relaxed font-light max-w-md">
                {t(
                  "Cofanetti in cartoncino nero satinato, nastro in seta, sigillo in cera bordeaux. Ogni confezione è un omaggio al gesto antico del regalare.",
                  "Boxes in satin black board, silk ribbon, bordeaux wax seal. Every package is an homage to the ancient gesture of giving.",
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
                    <p className="text-[10px] text-muted-foreground tracking-wider mt-0.5">
                      {f.en}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-noir text-cream py-32">
        <div className="container-luxury max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="eyebrow text-cream/60">
              {t("Lettere dalla Rizzati", "Letters from the Rizzati")}
            </p>
            <h2 className="display-lg mt-6 text-cream">
              {t("Il cioccolato, raccontato", "Chocolate, told with")}
              <br />
              <span className="italic">
                {t("con cura.", "the utmost care.")}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <form
              className="mt-12 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
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
              {t(
                "Quattro lettere all'anno. Mai una di più.",
                "Four letters a year. Never one more.",
              )}
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
              {t(
                "Piazza Trento e Trieste 2, Ferrara",
                "Piazza Trento e Trieste 2, Ferrara",
              )}
            </h2>
            <p className="subtitle-en mt-3">
              {t(
                "A due passi dalla Cattedrale di Ferrara",
                "A step from Ferrara Cathedral",
              )}
            </p>
            <div className="mt-10 space-y-3 text-foreground/75 font-light">
              <p>
                {t(
                  "Martedì – Domenica · 09:00 – 19:30",
                  "Tuesday – Sunday · 09:00 – 19:30",
                )}
              </p>
              <p>{t("Lunedì · Chiuso", "Monday · Closed")}</p>
              <p className="text-sm text-muted-foreground mt-6">
                +39 0532 204267 · info@rizzaticioccolato.com
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-10 inline-flex link-underline text-[11px] tracking-[0.24em] uppercase"
            >
              {t("Prenota un'pacchetto", "Reserve a package")} →
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="img-frame aspect-[4/3] bg-muted">
              <iframe
                title="Rizzati Shop Ferrara"
                src="https://www.openstreetmap.org/export/embed.html?bbox=11.612%2C44.831%2C11.626%2C44.839&layer=mapnik&marker=44.8354412%2C11.6190892"
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
