"use client";

import BentoCard, { CardLabel } from "./BentoCard";
import { useLanguage } from "@/lib/LanguageContext";

export default function StatusCard() {
  const { t } = useLanguage();

  return (
    <BentoCard delay={0.05}>
      <CardLabel>{t.status.label}</CardLabel>
      <ul className="space-y-3.5">
        {t.status.items.map((item) => (
          <li key={item.label} className="flex items-start gap-2.5 text-sm">
            <span
              aria-hidden="true"
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
              style={{ background: "#0ca30c", boxShadow: "0 0 8px 1px rgba(12,163,12,0.55)" }}
            />
            <span className="text-[var(--ink-secondary)]">
              <span className="text-[var(--ink-primary)]">{item.label}</span>
              {" — "}
              {item.state}
            </span>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
