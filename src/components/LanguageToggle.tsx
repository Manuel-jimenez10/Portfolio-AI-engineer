"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-[var(--border-hairline-strong)] p-0.5 text-xs font-mono-tight ${className}`}
      role="group"
      aria-label="Language"
    >
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className="px-2.5 py-1 rounded-full transition-colors"
          style={{
            background: lang === l ? "var(--accent-gradient)" : "transparent",
            color: lang === l ? "#05060a" : "var(--ink-secondary)",
            fontWeight: lang === l ? 600 : 500,
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
