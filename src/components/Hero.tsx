"use client";

import { motion } from "framer-motion";
import { person } from "@/lib/profile";
import { useLanguage } from "@/lib/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Hero({ onOpenChat }: { onOpenChat: () => void }) {
  const { t } = useLanguage();

  return (
    <section className="relative pt-20 pb-10 sm:pt-28 sm:pb-14">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex items-center justify-between gap-3"
      >
        <p className="font-mono-tight text-sm text-[var(--accent-cyan)] flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-cyan)] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-cyan)]" />
          </span>
          {t.hero.available}
        </p>
        <LanguageToggle />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] max-w-4xl"
      >
        {t.hero.name}
        <br />
        <span className="text-gradient">{t.hero.role}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-6 max-w-2xl text-base sm:text-lg text-[var(--ink-secondary)]"
      >
        {t.hero.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-9 flex flex-wrap items-center gap-3"
      >
        <button
          onClick={onOpenChat}
          className="group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-black bg-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <span aria-hidden="true">✦</span>
          {t.hero.ctaChat}
        </button>
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-5 py-3 text-sm font-medium border border-[var(--border-hairline-strong)] hover:bg-white/5 transition-colors"
        >
          {t.hero.ctaLinkedin}
        </a>
        <a
          href={`mailto:${person.email}`}
          className="rounded-full px-5 py-3 text-sm font-medium border border-[var(--border-hairline-strong)] hover:bg-white/5 transition-colors"
        >
          {person.email}
        </a>
      </motion.div>
    </section>
  );
}
