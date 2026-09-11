"use client";

import { person } from "@/lib/profile";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="mt-16 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--ink-muted)] font-mono-tight">
      <p>© {new Date().getFullYear()} {person.name}</p>
      <p>{t.footer.builtWith}</p>
    </footer>
  );
}
