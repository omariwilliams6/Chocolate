import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

const NAV = [
  { to: "/", it: "Home", en: "Home" },
  { to: "/about", it: "Maison", en: "About" },
  { to: "/collection", it: "Collezione", en: "Collection" },
  { to: "/experience", it: "Esperienza", en: "Experience" },
  { to: "/menu", it: "Menu", en: "Menu" },
  { to: "/contact", it: "Contatti", en: "Contact" },
] as const;

export function SiteHeader() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const onDark = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : onDark
          ? "bg-transparent"
          : "bg-background/70 backdrop-blur-md"
      }`}
    >
      <div className="container-luxury flex items-center justify-between h-20">
        <Link to="/" className="flex flex-col leading-none">
          <span
            className={`font-serif text-2xl tracking-tight transition-colors ${
              onDark ? "text-cream" : "text-foreground"
            }`}
          >
            Rizzati
          </span>
          <span
            className={`text-[9px] tracking-[0.32em] uppercase mt-0.5 transition-colors ${
              onDark ? "text-cream/60" : "text-muted-foreground"
            }`}
          >
            Cioccolato · Maison
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`link-underline text-[11px] tracking-[0.22em] uppercase font-medium transition-colors ${
                onDark ? "text-cream/85 hover:text-cream" : "text-foreground/80 hover:text-foreground"
              }`}
              activeProps={{ className: "!text-accent" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {lang === "it" ? item.it : item.en}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div
            className={`hidden md:flex items-center text-[11px] tracking-[0.22em] uppercase font-medium ${
              onDark ? "text-cream/85" : "text-foreground/80"
            }`}
          >
            <button
              onClick={() => setLang("it")}
              className={`px-1.5 transition-colors ${lang === "it" ? "text-accent" : "hover:opacity-100 opacity-60"}`}
            >
              IT
            </button>
            <span className="opacity-40">/</span>
            <button
              onClick={() => setLang("en")}
              className={`px-1.5 transition-colors ${lang === "en" ? "text-accent" : "hover:opacity-100 opacity-60"}`}
            >
              EN
            </button>
          </div>

          <button
            aria-label="Menu"
            className={`lg:hidden flex flex-col gap-1.5 ${onDark ? "text-cream" : "text-foreground"}`}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`block h-px w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-700 ease-out bg-background border-t border-border ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <nav className="container-luxury flex flex-col py-8 gap-6">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="display-md text-foreground"
            >
              {lang === "it" ? item.it : item.en}
              <span className="block subtitle-en mt-1">{lang === "it" ? item.en : item.it}</span>
            </Link>
          ))}
          <div className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase pt-4 border-t border-border">
            <button onClick={() => setLang("it")} className={lang === "it" ? "text-accent" : "opacity-60"}>Italiano</button>
            <span className="opacity-40">·</span>
            <button onClick={() => setLang("en")} className={lang === "en" ? "text-accent" : "opacity-60"}>English</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
