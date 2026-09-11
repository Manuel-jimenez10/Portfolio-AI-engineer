"use client";

import { useState } from "react";
import BentoCard, { CardLabel } from "./BentoCard";
import { skills, skillCategoryMeta, type SkillCategory } from "@/lib/profile";
import { useLanguage } from "@/lib/LanguageContext";

const CATEGORIES = Object.keys(skillCategoryMeta) as SkillCategory[];

export default function StackConstellation() {
  const { t } = useLanguage();
  const [active, setActive] = useState<SkillCategory | null>(null);

  return (
    <BentoCard className="sm:col-span-2" delay={0.1}>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <CardLabel>{t.stack.label}</CardLabel>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const meta = skillCategoryMeta[cat];
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(isActive ? null : cat)}
                className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border transition-colors"
                style={{
                  borderColor: isActive ? meta.color : "var(--border-hairline)",
                  background: isActive ? meta.colorSoft : "transparent",
                  color: isActive ? "var(--ink-primary)" : "var(--ink-secondary)",
                }}
                aria-pressed={isActive}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: meta.color }}
                  aria-hidden="true"
                />
                {t.stack.categories[cat]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => {
          const meta = skillCategoryMeta[skill.category];
          const dimmed = active !== null && active !== skill.category;
          return (
            <span
              key={skill.name}
              className="text-sm px-3 py-1.5 rounded-lg border transition-all duration-200"
              style={{
                borderColor: dimmed ? "var(--border-hairline)" : meta.color + "55",
                background: dimmed ? "transparent" : meta.colorSoft,
                color: dimmed ? "var(--ink-muted)" : "var(--ink-primary)",
                opacity: dimmed ? 0.4 : 1,
              }}
            >
              {skill.name}
            </span>
          );
        })}
      </div>
    </BentoCard>
  );
}
