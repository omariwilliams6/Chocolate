import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";

export function SiteFooter() {
  const { lang } = useLang();
  const t = (it: string, en: string) => (lang === "it" ? it : en);

  return (
    <footer className="bg-noir text-cream">
      <div className="container-luxury py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14">
          <div className="md:col-span-5">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-4xl">Rizzati</span>
              <span className="text-[10px] tracking-[0.34em] uppercase mt-2 text-cream/60">
                Cioccolato · Maison · Italia
              </span>
            </div>
            <p className="mt-8 max-w-md text-cream/70 text-sm leading-relaxed font-light">
              {t(
                "Una maison italiana del cioccolato, dove l'artigianato incontra l'eleganza del viaggio.",
                "An Italian chocolate maison where craftsmanship meets the elegance of travel."
              )}
            </p>
            <div className="mt-10 flex items-center gap-3 text-[10px] tracking-[0.32em] uppercase text-cream/55">
              <span className="block h-px w-8 bg-lufthansa-soft" />
              <span>{t("Partner ufficiale", "Official partner")} · Lufthansa</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-cream/50">{t("Maison", "Maison")}</p>
            <ul className="mt-5 space-y-3 text-sm font-light">
              <li><Link to="/about" className="link-underline text-cream/80 hover:text-cream">{t("La nostra storia", "Our story")}</Link></li>
              <li><Link to="/collection" className="link-underline text-cream/80 hover:text-cream">{t("Collezione", "Collection")}</Link></li>
              <li><Link to="/experience" className="link-underline text-cream/80 hover:text-cream">{t("Esperienza", "Experience")}</Link></li>
              <li><Link to="/menu" className="link-underline text-cream/80 hover:text-cream">Menu</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow text-cream/50">{t("Boutique", "Boutique")}</p>
            <address className="mt-5 not-italic text-sm font-light text-cream/80 leading-relaxed">
              Via della Spiga 18<br />
              20121 Milano · Italia<br />
              <span className="text-cream/55">+39 02 7600 4421</span><br />
              <span className="text-cream/55">maison@rizzaticioccolato.it</span>
            </address>
            <p className="mt-6 text-xs text-cream/55 leading-relaxed">
              {t("Lun – Sab · 10:00 – 20:00", "Mon – Sat · 10:00 – 20:00")}<br />
              {t("Domenica · 11:00 – 19:00", "Sunday · 11:00 – 19:00")}
            </p>
          </div>
        </div>

        <div className="hairline mt-20 bg-cream/10" />
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] tracking-[0.18em] uppercase text-cream/45">
          <span>© {new Date().getFullYear()} Maison Rizzati · {t("Crafted in Italy", "Crafted in Italy")}</span>
          <div className="flex gap-6">
            <a href="#" className="link-underline">Privacy</a>
            <a href="#" className="link-underline">Cookies</a>
            <a href="#" className="link-underline">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
