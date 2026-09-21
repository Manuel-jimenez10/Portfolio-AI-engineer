"use client";

import { useState } from "react";
import { person } from "@/lib/profile";
import { useLanguage } from "@/lib/LanguageContext";
import type { ModuleId } from "@/lib/i18n";

export default function BongoSidebar({
  treats,
  onTreat,
  onPickModule,
}: {
  treats: number;
  onTreat: () => void;
  onPickModule: (id: ModuleId) => void;
}) {
  const { t } = useLanguage();
  const [tossing, setTossing] = useState(0);

  function handleTreat() {
    setTossing((n) => n + 1);
    onTreat();
  }

  return (
    <aside className="flex flex-col gap-4">
      <div className="card p-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, var(--accent-blue), var(--accent-blue-deep))",
            }}
            aria-hidden="true"
          >
            MJ
          </span>
          <span className="min-w-0">
            <span className="block truncate font-semibold">{person.name}</span>
            <span className="block text-sm leading-snug text-[var(--ink-secondary)]">
              {t.hero.role}
            </span>
          </span>
        </div>

        <p className="mt-3 rounded-lg bg-[var(--surface-1)] p-2.5 text-sm leading-relaxed text-[var(--ink-secondary)]">
          {t.bongo.profileNote}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {t.metrics.items.slice(0, 2).map((m) => (
            <div key={m.label} className="rounded-lg bg-[var(--surface-1)] p-2.5">
              <p className="text-lg font-semibold text-[var(--accent-blue-deep)]">{m.value}</p>
              <p className="mt-0.5 text-[11px] leading-tight text-[var(--ink-muted)]">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] px-4 py-2.5">
          <span className="label-caps text-[var(--ink-muted)]">{t.bongo.modulesLabel}</span>
          <span className="rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-[11px] text-[var(--ink-secondary)]">
            {t.bongo.modulesCount}
          </span>
        </div>
        <ul>
          {t.bongo.modules.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => onPickModule(m.id)}
                className="flex w-full items-center gap-2 border-b border-[var(--border-hairline)] px-4 py-2.5 text-left transition-colors last:border-b-0 hover:bg-[var(--surface-1)]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{m.title}</span>
                  <span className="block truncate text-xs text-[var(--ink-muted)]">
                    {m.sub}
                  </span>
                </span>
                <span className="shrink-0 text-[var(--ink-muted)]" aria-hidden="true">
                  ›
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="card relative overflow-hidden p-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-amber-soft)] text-lg">
            🦴
            {tossing > 0 && (
              <span
                key={tossing}
                className="treat-arc pointer-events-none absolute inset-0 flex items-center justify-center text-lg"
                aria-hidden="true"
              >
                🦴
              </span>
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">{t.bongo.treatTitle}</span>
            <span className="block text-xs text-[var(--ink-muted)]">{t.bongo.treatSub}</span>
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={handleTreat}
            className="flex-1 rounded-lg bg-[var(--accent-amber)] px-3 py-2 text-sm font-semibold text-[var(--accent-amber-deep)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {t.bongo.treatButton}
          </button>
          <span className="rounded-lg bg-[var(--surface-1)] px-2.5 py-2 font-mono-tight text-sm text-[var(--ink-secondary)]">
            {treats} {t.bongo.treatCount}
          </span>
        </div>
      </div>
    </aside>
  );
}
