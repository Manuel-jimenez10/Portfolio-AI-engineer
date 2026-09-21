"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { blocksForModule, type Block } from "@/lib/blocks";
import type { ModuleId } from "@/lib/i18n";
import BongoAvatar, { type BongoState } from "./BongoAvatar";
import BongoBlocks from "./BongoBlocks";

type Msg =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "bongo"; blocks: Block[] };

export interface BongoChatHandle {
  openModule: (id: ModuleId) => void;
  ask: (text: string) => void;
}

function blocksToText(blocks: Block[]): string {
  return blocks
    .filter((b): b is Extract<Block, { kind: "text" }> => b.kind === "text")
    .map((b) => b.text)
    .join("\n");
}

const BongoChat = forwardRef<BongoChatHandle, { barkNonce: number }>(
  function BongoChat({ barkNonce }, ref) {
    const { t } = useLanguage();
    const [messages, setMessages] = useState<Msg[]>([]);
    const [input, setInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bark, setBark] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const nextId = useRef(1);
    const prevBark = useRef(barkNonce);

    const bongoState: BongoState = bark ? "happy" : isStreaming ? "thinking" : "idle";

    useEffect(() => {
      // Skip while the welcome screen is up: on a short viewport it is taller
      // than the panel, and scrolling to the bottom would hide the greeting.
      if (messages.length === 0) return;
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, [messages, isStreaming]);

    // A treat handed over from the sidebar: bark, then settle back down.
    useEffect(() => {
      if (barkNonce === prevBark.current) return;
      prevBark.current = barkNonce;
      const lines = t.bongo.barks;
      setBark(lines[Math.floor(Math.random() * lines.length)]);
      const timer = setTimeout(() => setBark(null), 1000);
      return () => clearTimeout(timer);
    }, [barkNonce, t.bongo.barks]);

    function pushModule(id: ModuleId) {
      const mod = t.bongo.modules.find((m) => m.id === id);
      if (!mod) return;
      setError(null);
      // Ids are taken before the updater runs — a state updater can be invoked
      // twice (StrictMode), which would desync the ref if we bumped it inside.
      const askId = nextId.current++;
      const replyId = nextId.current++;
      setMessages((prev) => [
        ...prev,
        { id: askId, role: "user", text: mod.ask },
        { id: replyId, role: "bongo", blocks: blocksForModule(id, t) },
      ]);
    }

    async function sendMessage(text: string) {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      setError(null);
      setInput("");

      const history = [
        ...messages.map((m) => ({
          role: m.role === "user" ? ("user" as const) : ("assistant" as const),
          content: m.role === "user" ? m.text : blocksToText(m.blocks),
        })),
        { role: "user" as const, content: trimmed },
      ].filter((m) => m.content.trim().length > 0);

      const askId = nextId.current++;
      const replyId = nextId.current++;
      setMessages((prev) => [
        ...prev,
        { id: askId, role: "user", text: trimmed },
        { id: replyId, role: "bongo", blocks: [{ kind: "text", text: "" }] },
      ]);
      setIsStreaming(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
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
          setMessages((prev) => prev.filter((m) => m.id !== replyId));
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (!chunk) continue;
          acc += chunk;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === replyId && m.role === "bongo"
                ? { ...m, blocks: [{ kind: "text", text: acc }] }
                : m
            )
          );
        }
      } catch {
        setError(t.chat.errorConnection);
        setMessages((prev) => prev.filter((m) => m.id !== replyId));
      } finally {
        setIsStreaming(false);
      }
    }

    useImperativeHandle(ref, () => ({
      openModule: pushModule,
      ask: (text: string) => void sendMessage(text),
    }));

    const empty = messages.length === 0;

    return (
      <div className="card flex h-full min-h-0 flex-col overflow-hidden">
        {/* Header — Bongo himself, reacting to whatever is going on */}
        <div className="relative flex items-center gap-3 border-b border-[var(--border-hairline)] bg-[var(--surface-1)] px-4 py-3">
          <BongoAvatar size={44} state={bongoState} />
          {/* Anchored inside the header — the card clips overflow, so a bubble
              hanging off the avatar would get cut at the top edge. */}
          {bark && (
            <span className="bark-pop pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[var(--accent-amber)] bg-[var(--accent-amber-soft)] px-3 py-1 text-sm font-semibold text-[var(--accent-amber-deep)]">
              {bark}
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span className="font-semibold">{t.bongo.brand}</span>
              <span className="flex items-center gap-1 rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-[11px] text-[var(--ink-secondary)]">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--status-online)" }}
                />
                {t.bongo.online}
              </span>
            </span>
            <span className="block truncate text-sm text-[var(--ink-muted)]">
              {isStreaming ? `${t.bongo.thinking}…` : t.bongo.brandSub}
            </span>
          </span>
        </div>

        <div ref={scrollRef} className="scroll-thin flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          {empty ? (
            <div className="mx-auto max-w-2xl">
              <div className="flex flex-col items-center text-center">
                <BongoAvatar size={104} state={bongoState} />
                <h2 className="mt-3 text-2xl font-semibold">{t.bongo.greetingTitle}</h2>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[var(--ink-secondary)]">
                  {t.bongo.greetingBody}
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {t.bongo.traits.map((trait) => (
                    <span
                      key={trait}
                      className="rounded-full border border-[var(--border-hairline)] bg-[var(--surface-card)] px-2.5 py-1 text-xs text-[var(--ink-secondary)]"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <p className="label-caps mb-2.5 mt-7 text-[var(--ink-muted)]">
                {t.bongo.suggestedLabel}
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {t.bongo.modules.slice(1).map((m) => (
                  <button
                    key={m.id}
                    onClick={() => pushModule(m.id)}
                    className="rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-card)] p-3 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--accent-blue)] hover:shadow-[var(--shadow-card)]"
                  >
                    <span className="block text-sm font-medium">{m.ask}</span>
                    <span className="mt-0.5 block text-xs text-[var(--ink-muted)]">
                      {m.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto flex max-w-2xl flex-col gap-5">
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="msg-in flex justify-end">
                    <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-[var(--accent-blue)] px-4 py-2.5 text-[15px] text-white">
                      {m.text}
                    </p>
                  </div>
                ) : (
                  <div key={m.id} className="msg-in flex items-start gap-2.5">
                    <span className="mt-0.5 shrink-0">
                      <BongoAvatar size={30} state="idle" />
                    </span>
                    <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-[var(--border-hairline)] bg-[var(--surface-card)] px-4 py-3">
                      {blocksToText(m.blocks) === "" && m.blocks.length === 1 ? (
                        <span className="flex gap-1 py-1.5">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="dot-bounce h-1.5 w-1.5 rounded-full bg-[var(--ink-muted)]"
                              style={{ animationDelay: `${i * 0.15}s` }}
                            />
                          ))}
                        </span>
                      ) : (
                        <BongoBlocks blocks={m.blocks} onPickModule={pushModule} />
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {error && (
            <p className="mx-auto mt-4 max-w-2xl rounded-lg bg-[#fee] px-3 py-2 text-center text-sm text-[#ba1a1a]">
              {error}
            </p>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void sendMessage(input);
          }}
          className="border-t border-[var(--border-hairline)] bg-[var(--surface-1)] px-4 py-3 sm:px-6"
        >
          <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-xl border border-[var(--border-hairline-strong)] bg-[var(--surface-card)] p-1.5 transition-colors focus-within:border-[var(--accent-blue)]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.bongo.inputPlaceholder}
              maxLength={1200}
              disabled={isStreaming}
              className="min-w-0 flex-1 bg-transparent px-2.5 py-2 text-[15px] outline-none placeholder:text-[var(--ink-muted)] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isStreaming || input.trim().length === 0}
              className="shrink-0 rounded-lg bg-[var(--accent-blue)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-blue-deep)] disabled:opacity-40"
            >
              {t.bongo.send}
            </button>
          </div>
          <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-[var(--ink-muted)]">
            {t.bongo.disclaimer}
          </p>
        </form>
      </div>
    );
  }
);

export default BongoChat;
