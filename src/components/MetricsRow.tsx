"use client";

import BentoCard, { CardLabel } from "./BentoCard";
import { useLanguage } from "@/lib/LanguageContext";

export default function MetricsRow() {
  const { t } = useLanguage();

  return (
    <section className="mt-6">
      <CardLabel>{t.metrics.label}</CardLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
        {t.metrics.items.map((m, i) => (
          <BentoCard key={m.label} delay={i * 0.05} className="text-left">
            <p className="text-4xl sm:text-5xl font-semibold text-gradient">{m.value}</p>
            <p className="mt-2 text-sm text-[var(--ink-primary)]">{m.label}</p>
            <p className="mt-1 text-xs text-[var(--ink-muted)]">{m.context}</p>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
