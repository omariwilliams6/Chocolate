import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contatti · Rizzati Cioccolato" },
      {
        name: "description",
        content:
          "Visita Rizzati Shop a Ferrara, Piazza Trento e Trieste 2. Prenotazioni, eventi privati e contatti.",
      },
      { property: "og:title", content: "Contatti · Rizzati" },
      { property: "og:description", content: "Visit Rizzati Shop in Ferrara." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { lang } = useLang();
  const t = (it: string, en: string) => (lang === "it" ? it : en);
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-background pt-32">
      <section className="container-luxury py-20 max-w-4xl">
        <Reveal>
          <p className="eyebrow">{t("Contatti", "Contact")}</p>
          <h1 className="display-xl mt-8">
            {t("Visitate la maison.", "Visit the maison.")}
          </h1>
          <p className="subtitle-en mt-4">
            {t(
              "Una prenotazione, una domanda, una celebrazione",
              "A reservation, a question, a celebration",
            )}
          </p>
          <p className="mt-10 text-foreground/70 font-light max-w-xl">
            {t(
              "Saremo onorati di accogliervi a Ferrara, in Piazza Trento e Trieste. Per prenotazioni, eventi privati o richieste personalizzate, scriveteci.",
              "We would be honoured to welcome you to Ferrara, in Piazza Trento e Trieste. For reservations, private events or bespoke requests, write to us.",
            )}
          </p>
        </Reveal>
      </section>

      <section className="container-luxury py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <Reveal className="lg:col-span-7">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Field label={t("Nome", "Name")} name="name" />
              <Field label={t("Cognome", "Surname")} name="surname" />
            </div>
            <Field label="E-mail" name="email" type="email" />
            <Field label={t("Telefono", "Phone")} name="phone" />
            <div>
              <label className="block text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3">
                {t("Tipo di richiesta", "Type of request")}
              </label>
              <select className="w-full bg-transparent border-b border-border py-3 focus:border-foreground focus:outline-none transition text-base font-light">
                <option>{t("Prenotazione tavolo", "Table reservation")}</option>
                <option>{t("Degustazione privata", "Private tasting")}</option>
                <option>{t("Evento aziendale", "Corporate event")}</option>
                <option>
                  {t("Confezione regalo personalizzata", "Bespoke gift box")}
                </option>
                <option>{t("Altro", "Other")}</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3">
                {t("Messaggio", "Message")}
              </label>
              <textarea
                rows={5}
                className="w-full bg-transparent border-b border-border py-3 focus:border-foreground focus:outline-none transition resize-none text-base font-light"
              />
            </div>
            <button type="submit" className="btn-luxury">
              {sent
                ? t("Inviato. Grazie.", "Sent. Thank you.")
                : t("Invia richiesta", "Send request")}
            </button>
          </form>
        </Reveal>

        <div className="lg:col-span-5 space-y-12">
          <Reveal>
            <p className="eyebrow">{t("Boutique", "Boutique")}</p>
            <h2 className="font-serif text-3xl mt-4 font-light">
              Piazza Trento e Trieste 2
            </h2>
            <p className="text-foreground/70 font-light mt-2">
              44124 Ferrara FE · Italia
            </p>
            <div className="mt-6 space-y-1 text-sm text-foreground/70">
              <p>+39 0532 204267</p>
              <p>info@rizzaticioccolato.com</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">{t("Orari", "Hours")}</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/75 font-light">
              <li className="flex justify-between border-b border-border pb-2">
                <span>{t("Mar – Dom", "Tue – Sun")}</span>
                <span>09:00 – 19:30</span>
              </li>
              <li className="flex justify-between border-b border-border pb-2">
                <span>{t("Lunedì", "Monday")}</span>
                <span>{t("Chiuso", "Closed")}</span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="eyebrow">{t("Per la stampa", "Press")}</p>
            <p className="mt-4 text-sm text-foreground/70 font-light">
              press@rizzaticioccolato.it
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-luxury pb-32">
        <Reveal>
          <div className="img-frame aspect-[21/9] bg-muted">
            <iframe
              title="Rizzati Shop Ferrara"
              src="https://www.openstreetmap.org/export/embed.html?bbox=11.612%2C44.831%2C11.626%2C44.839&layer=mapnik&marker=44.8354412%2C11.6190892"
              className="h-full w-full grayscale-[0.7]"
              loading="lazy"
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full bg-transparent border-b border-border py-3 focus:border-foreground focus:outline-none transition text-base font-light"
      />
    </div>
  );
}
