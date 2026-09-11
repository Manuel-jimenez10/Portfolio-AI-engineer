"use client";

import { createContext, useContext, useCallback, useSyncExternalStore, type ReactNode } from "react";
import { translations, type Lang, type Translation } from "./i18n";

const STORAGE_KEY = "portfolio-lang";

// A tiny external store (not React state) so reading the saved preference
// never needs a setState-in-effect on mount — useSyncExternalStore handles
// the server/client snapshot mismatch correctly on its own, which a naive
// `useState` + `useEffect(() => setLang(...), [])` cannot do without a flash
// of the wrong language or a hydration warning.
let currentLang: Lang = "es";
let hydratedFromStorage = false;
const listeners = new Set<() => void>();

function getSnapshot(): Lang {
  if (!hydratedFromStorage) {
    hydratedFromStorage = true;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "es" || saved === "en") currentLang = saved;
    } catch {
      /* ignore — private browsing, storage disabled, etc. */
    }
  }
  return currentLang;
}

function getServerSnapshot(): Lang {
  return "es";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setStoreLang(next: Lang) {
  currentLang = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

interface LanguageContextValue {
  lang: Lang;
  t: Translation;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((next: Lang) => setStoreLang(next), []);
  const toggleLang = useCallback(() => setStoreLang(lang === "es" ? "en" : "es"), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
