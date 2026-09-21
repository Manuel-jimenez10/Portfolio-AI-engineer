"use client";

import { person } from "@/lib/profile";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-[var(--border-hairline)] pt-5 text-sm text-[var(--ink-muted)] sm:flex-row">
      <p>
        © {new Date().getFullYear()} {person.name} · {t.hero.role}
      </p>
      <div className="flex items-center gap-4">
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[var(--accent-blue)]"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${person.email}`}
          className="transition-colors hover:text-[var(--accent-blue)]"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
