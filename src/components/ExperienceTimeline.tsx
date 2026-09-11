"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardLabel } from "./BentoCard";
import { useLanguage } from "@/lib/LanguageContext";

export default function ExperienceTimeline() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="mt-6">
      <CardLabel>{t.experience.label}</CardLabel>
      <div className="glass-card divide-y divide-[var(--border-hairline)] overflow-hidden">
        {t.experience.jobs.map((job, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={job.company} className="p-6 sm:p-7">
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex w-full items-start justify-between gap-4 text-left"
                aria-expanded={isOpen}
              >
                <div>
                  <p className="text-lg font-medium">
                    {job.company}
                    <span className="text-[var(--ink-muted)] font-normal"> — {job.role}</span>
                  </p>
                  <p className="mt-1 text-sm text-[var(--ink-muted)] font-mono-tight">
                    {job.period} · {job.location}
                  </p>
                </div>
                <span
                  className="mt-1 shrink-0 text-xl text-[var(--ink-secondary)] transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-5 space-y-3">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm text-[var(--ink-secondary)]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-cyan)]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {job.stack.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-[var(--border-hairline)] text-[var(--ink-muted)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
