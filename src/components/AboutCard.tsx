"use client";

import BentoCard, { CardLabel } from "./BentoCard";
import { useLanguage } from "@/lib/LanguageContext";

export default function AboutCard() {
  const { t } = useLanguage();

  return (
    <BentoCard className="sm:col-span-2">
      <CardLabel>{t.about.label}</CardLabel>
      <p className="text-lg sm:text-xl leading-relaxed text-[var(--ink-primary)]">
        {t.about.summary}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {t.about.coreSkills.map((s) => (
          <span
            key={s}
            className="text-xs font-medium px-3 py-1.5 rounded-full border border-[var(--border-hairline-strong)] text-[var(--ink-secondary)]"
          >
            {s}
          </span>
        ))}
      </div>
    </BentoCard>
  );
}
