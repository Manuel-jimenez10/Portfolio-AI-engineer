"use client";

import { person } from "@/lib/profile";
import { useLanguage } from "@/lib/LanguageContext";
import type { ModuleId } from "@/lib/i18n";
import BongoAvatar from "./BongoAvatar";
import LanguageToggle from "./LanguageToggle";

export default function BongoTopNav({
  onPickModule,
}: {
  onPickModule: (id: ModuleId) => void;
}) {
  const { t } = useLanguage();

  // The tabs are shortcuts into the conversation rather than separate pages —
  // everything on this site happens inside the chat.
  const tabs: { id: ModuleId; label: string }[] = [
    { id: "rag", label: t.bongo.navStack },
    { id: "experience", label: t.bongo.navExperience },
    { id: "about-bongo", label: t.bongo.navAbout },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border-hairline)] bg-[var(--bg-page)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-2)]">
            <BongoAvatar size={30} state="idle" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-semibold leading-tight">
              {t.bongo.brand}
            </span>
            <span className="hidden truncate text-xs text-[var(--ink-muted)] sm:block">
              {t.bongo.brandSub}
            </span>
          </span>
        </span>

        <nav className="hidden items-center gap-1 md:flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onPickModule(tab.id)}
              className="rounded-full px-3.5 py-1.5 text-sm text-[var(--ink-secondary)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--ink-primary)]"
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <span className="flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <a
            href={`mailto:${person.email}`}
            className="rounded-full bg-[var(--accent-blue)] px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-blue-deep)]"
          >
            {t.bongo.contact}
          </a>
        </span>
      </div>
    </header>
  );
}
