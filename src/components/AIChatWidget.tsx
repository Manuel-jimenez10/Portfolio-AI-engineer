"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import RichText from "./RichText";

type ChatMessage = { role: "user" | "assistant"; content: string };

export interface AIChatWidgetHandle {
  open: () => void;
}

// "MJ" monogram avatar — deliberately not a sparkle/star mark (that shape
// reads as Gemini's own logo). A personal initials mark instead.
function Monogram({ size = "h-9 w-9 text-sm" }: { size?: string }) {
  return (
    <span
      className={`${size} shrink-0 rounded-full flex items-center justify-center font-semibold text-[#05060a]`}
      style={{ background: "var(--accent-gradient)" }}
      aria-hidden="true"
    >
      MJ
    </span>
  );
}

const AIChatWidget = forwardRef<AIChatWidgetHandle>(function AIChatWidget(_props, ref) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
  }));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => inputRef.current?.focus(), 350);
      return () => {
        document.body.style.overflow = "";
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isStreaming]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    setError(null);
    const nextHistory: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...nextHistory, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextHistory }),
      });

      if (!res.ok || !res.body) {
        let msg = t.chat.errorGeneric;
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {
          /* ignore parse errors */
        }
        setError(msg);
        setMessages(nextHistory);
        setIsStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = { ...last, content: last.content + chunk };
          return updated;
        });
      }
    } catch {
      setError(t.chat.errorConnection);
      setMessages(nextHistory);
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <>
      {/* Floating orb — hidden while chat mode is open */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="orb"
            onClick={() => setIsOpen(true)}
            aria-label={t.chat.orbOpenAria}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full text-[#05060a] font-semibold text-sm animate-orb-pulse"
            style={{ background: "var(--accent-gradient)" }}
          >
            MJ
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full chat-mode takeover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center sm:p-6"
            style={{ background: "rgba(4,5,9,0.6)", backdropFilter: "blur(6px)" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              key="chat-panel"
              role="dialog"
              aria-modal="true"
              aria-label={t.chat.assistantName}
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "bottom right" }}
              className="relative w-full h-full sm:h-[88vh] sm:max-w-3xl overflow-hidden sm:rounded-[28px] flex flex-col"
            >
              {/* Reuse the same background language as the page (grid texture +
                  gradient glow) so chat mode reads as a view of this site,
                  not a different app. Inlined rather than the shared .bg-grid
                  class, which is `position: fixed` and meant for the page root. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                  backgroundImage:
                    "radial-gradient(1000px 500px at 10% -10%, rgba(139,92,246,0.20), transparent 60%), radial-gradient(800px 450px at 100% 10%, rgba(34,211,238,0.14), transparent 55%), linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
                  backgroundSize: "auto, auto, 44px 44px, 44px 44px",
                  backgroundColor: "var(--bg-page)",
                }}
              />

              <header className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-hairline)] shrink-0">
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label={t.chat.backAria}
                  className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center border border-[var(--border-hairline)] hover:bg-white/5 transition-colors text-lg"
                >
                  ←
                </button>
                <Monogram />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{t.chat.assistantName}</p>
                  <p className="text-xs text-[var(--ink-muted)] truncate">{t.chat.assistantTagline}</p>
                </div>
                <LanguageToggle />
              </header>

              <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-thin">
                <div className="mx-auto w-full max-w-2xl px-5 py-8">
                  {messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                      <div className="flex flex-col items-center text-center gap-4 mb-8 mt-4">
                        <Monogram size="h-14 w-14 text-lg" />
                        <p className="text-base text-[var(--ink-secondary)] max-w-sm">
                          {t.chat.welcome}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {t.chat.suggested.map((p, i) => (
                          <motion.button
                            key={p}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                            whileHover={{ y: -2 }}
                            onClick={() => sendMessage(p)}
                            className="text-left text-sm px-4 py-3.5 rounded-2xl glass-card hover:border-[var(--border-hairline-strong)] transition-colors"
                          >
                            {p}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    {messages.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex items-start gap-2.5 max-w-[88%] ${
                            m.role === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          {m.role === "assistant" && <Monogram size="h-7 w-7 text-[10px] mt-0.5" />}
                          <div
                            className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                              m.role === "user"
                                ? "bg-white text-black rounded-br-sm whitespace-pre-wrap"
                                : "bg-white/[0.06] border border-[var(--border-hairline)] rounded-bl-sm"
                            }`}
                          >
                            {m.content.length > 0 ? (
                              m.role === "assistant" ? (
                                <RichText text={m.content} />
                              ) : (
                                m.content
                              )
                            ) : (
                              <span className="inline-flex gap-1 py-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40 animate-bounce [animation-delay:-0.3s]" />
                                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40 animate-bounce [animation-delay:-0.15s]" />
                                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40 animate-bounce" />
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {error && <p className="text-xs text-center text-[#e66767] mt-4">{error}</p>}
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="shrink-0 border-t border-[var(--border-hairline)] px-5 py-4"
              >
                <div className="mx-auto w-full max-w-2xl flex items-center gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t.chat.placeholder}
                    maxLength={1200}
                    disabled={isStreaming}
                    className="flex-1 bg-transparent text-sm px-4 py-3 rounded-2xl border border-[var(--border-hairline)] focus:border-[var(--border-hairline-strong)] outline-none placeholder:text-[var(--ink-muted)] disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isStreaming || input.trim().length === 0}
                    aria-label={t.chat.sendAria}
                    className="h-11 w-11 shrink-0 rounded-2xl flex items-center justify-center text-[#05060a] disabled:opacity-40 transition-opacity"
                    style={{ background: "var(--accent-gradient)" }}
                  >
                    ↑
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default AIChatWidget;
