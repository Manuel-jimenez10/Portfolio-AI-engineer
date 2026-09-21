"use client";

import { skills, skillCategoryMeta, person, type SkillCategory } from "@/lib/profile";
import { useLanguage } from "@/lib/LanguageContext";
import type { Block } from "@/lib/blocks";
import type { ModuleId } from "@/lib/i18n";
import RichText from "./RichText";

const CAT_VAR: Record<SkillCategory, string> = {
  ai: "--cat-ai",
  backend: "--cat-backend",
  data: "--cat-data",
  cloud: "--cat-cloud",
};

function MetricsBlock() {
  const { t } = useLanguage();
  return (
    <div className="mt-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-1)] p-3">
      <p className="label-caps mb-2.5 text-[var(--ink-muted)]">{t.bongo.sectionMetrics}</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {t.metrics.items.slice(0, 3).map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-card)] p-3"
          >
            <p className="text-xl font-semibold text-[var(--accent-blue-deep)]">{m.value}</p>
            <p className="mt-0.5 text-sm font-medium">{m.label}</p>
            <p className="mt-1 text-xs leading-snug text-[var(--ink-muted)]">{m.context}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackBlock() {
  const { t } = useLanguage();
  const cats = Object.keys(skillCategoryMeta) as SkillCategory[];

  return (
    <div className="mt-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-1)] p-3">
      <p className="label-caps mb-2.5 text-[var(--ink-muted)]">{t.bongo.sectionStack}</p>
      <div className="flex flex-col gap-2.5">
        {cats.map((cat) => (
          <div key={cat}>
            <p
              className="label-caps mb-1.5 text-[10px]"
              style={{ color: `var(${CAT_VAR[cat]})` }}
            >
              {t.stack.categories[cat]}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skills
                .filter((s) => s.category === cat)
                .map((s) => (
                  <span
                    key={s.name}
                    className="rounded-full border px-2.5 py-1 text-xs"
                    style={{
                      color: `var(${CAT_VAR[cat]})`,
                      borderColor: `color-mix(in srgb, var(${CAT_VAR[cat]}) 28%, transparent)`,
                      background: `color-mix(in srgb, var(${CAT_VAR[cat]}) 8%, white)`,
                    }}
                  >
                    {s.name}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineBlock() {
  const { t } = useLanguage();
  return (
    <div className="mt-3 flex flex-col gap-2">
      {t.experience.jobs.map((job) => (
        <div
          key={job.company}
          className="rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card)] p-3"
        >
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-semibold">{job.company}</span>
            <span className="text-sm text-[var(--ink-secondary)]">{job.role}</span>
          </div>
          <p className="mt-0.5 font-mono-tight text-xs text-[var(--ink-muted)]">
            {job.period} · {job.location}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
            {job.bullets[0]}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {job.stack.slice(0, 6).map((s) => (
              <span
                key={s}
                className="rounded border border-[var(--border-hairline)] bg-[var(--surface-1)] px-1.5 py-0.5 font-mono-tight text-[11px] text-[var(--ink-secondary)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactBlock() {
  const { t } = useLanguage();
  return (
    <div className="mt-3 rounded-xl border border-[var(--accent-blue)]/25 bg-[var(--accent-blue-soft)]/40 p-3.5">
      <p className="label-caps mb-1.5 text-[var(--accent-blue-deep)]">
        {t.bongo.sectionContact}
      </p>
      <p className="text-sm leading-relaxed text-[var(--ink-secondary)]">
        {t.bongo.contactBlurb}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={`mailto:${person.email}`}
          className="rounded-lg bg-[var(--accent-blue)] px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-blue-deep)]"
        >
          {person.email}
        </a>
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-[var(--border-hairline-strong)] bg-[var(--surface-card)] px-3.5 py-2 text-sm font-medium transition-colors hover:border-[var(--accent-blue)]"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

function FollowUps({
  ids,
  onPick,
}: {
  ids: ModuleId[];
  onPick: (id: ModuleId) => void;
}) {
  const { t } = useLanguage();
  const mods = ids
    .map((id) => t.bongo.modules.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  if (mods.length === 0) return null;

  return (
    <div className="mt-3 border-t border-[var(--border-hairline)] pt-3">
      <p className="label-caps mb-2 text-[var(--ink-muted)]">{t.bongo.followUps}</p>
      <div className="flex flex-wrap gap-2">
        {mods.map((m) => (
          <button
            key={m.id}
            onClick={() => onPick(m.id)}
            className="rounded-lg border border-[var(--border-hairline-strong)] bg-[var(--surface-card)] px-3 py-1.5 text-sm transition-colors hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue-deep)]"
          >
            {m.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BongoBlocks({
  blocks,
  onPickModule,
}: {
  blocks: Block[];
  onPickModule: (id: ModuleId) => void;
}) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "text":
            return (
              <div key={i} className="text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                <RichText text={b.text} />
              </div>
            );
          case "metrics":
            return <MetricsBlock key={i} />;
          case "stack":
            return <StackBlock key={i} />;
          case "timeline":
            return <TimelineBlock key={i} />;
          case "contact":
            return <ContactBlock key={i} />;
          case "followUps":
            return <FollowUps key={i} ids={b.ids} onPick={onPickModule} />;
        }
      })}
    </>
  );
}
