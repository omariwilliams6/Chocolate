import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "it" | "en";

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "it", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("it");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

/** Bilingual heading: Italian primary, English smaller subtitle below. */
export function Bilingual({
  it,
  en,
  className = "",
  align = "left",
}: {
  it: string;
  en: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <h2 className="display-lg text-foreground">{it}</h2>
      <p className="subtitle-en mt-3">{en}</p>
    </div>
  );
}
