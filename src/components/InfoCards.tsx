"use client";

import BentoCard, { CardLabel } from "./BentoCard";
import { person } from "@/lib/profile";
import { useLanguage } from "@/lib/LanguageContext";

export function EducationCard() {
  const { t } = useLanguage();
  return (
    <BentoCard delay={0.05}>
      <CardLabel>{t.education.label}</CardLabel>
      <ul className="space-y-4">
        {t.education.items.map((e) => (
          <li key={e.institution}>
            <p className="text-sm font-medium">{e.degree}</p>
            <p className="text-sm text-[var(--ink-secondary)]">{e.institution}</p>
            <p className="text-xs text-[var(--ink-muted)] font-mono-tight mt-0.5">{e.period}</p>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}

export function CertificationsCard() {
  const { t } = useLanguage();
  return (
    <BentoCard delay={0.1}>
      <CardLabel>{t.certifications.label}</CardLabel>
      <ul className="space-y-2.5">
        {t.certifications.items.map((c) => (
          <li key={c} className="flex items-center gap-2 text-sm text-[var(--ink-secondary)]">
            <span aria-hidden="true">✓</span>
            {c}
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}

export function ContactCard() {
  const { t } = useLanguage();
  return (
    <BentoCard delay={0.15} className="flex flex-col justify-between">
      <div>
        <CardLabel>{t.contact.label}</CardLabel>
        <p className="text-sm text-[var(--ink-secondary)]">{t.contact.blurb}</p>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <a
          href={`mailto:${person.email}`}
          className="text-sm font-medium text-[var(--ink-primary)] hover:text-[var(--accent-cyan)] transition-colors"
        >
          {person.email} ↗
        </a>
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[var(--ink-primary)] hover:text-[var(--accent-cyan)] transition-colors"
        >
          LinkedIn ↗
        </a>
      </div>
    </BentoCard>
  );
}
