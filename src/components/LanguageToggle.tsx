"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-[var(--border-hairline)] bg-[var(--surface-card)] p-0.5 text-xs ${className}`}
      role="group"
      aria-label="Language"
    >
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className="rounded-full px-2.5 py-1 transition-colors"
          style={{
            background: lang === l ? "var(--accent-blue)" : "transparent",
            color: lang === l ? "#fff" : "var(--ink-secondary)",
            fontWeight: lang === l ? 600 : 500,
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
