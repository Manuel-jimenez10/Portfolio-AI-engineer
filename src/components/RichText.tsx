"use client";

import { Fragment, type ReactNode } from "react";

/**
 * Minimal, dependency-free renderer for the light markdown an LLM sometimes
 * emits even when told not to (**bold**, `code`, lists, ### headings).
 *
 * Builds React elements directly from parsed tokens — never
 * dangerouslySetInnerHTML — so model output can't inject markup.
 */

const INLINE_PATTERN = /(\*\*[^*\n]+\*\*|`[^`\n]+`|\*[^*\n]+\*|_[^_\n]+_)/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text
    .split(INLINE_PATTERN)
    .filter((part) => part !== "" && part !== undefined)
    .map((part, i) => {
      const key = `${keyPrefix}-${i}`;
      if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={key} className="font-semibold text-[var(--ink-primary)]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={key}
            className="font-mono-tight text-[0.92em] px-1 py-0.5 rounded bg-[var(--surface-2)] text-[var(--accent-blue-deep)]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (
        part.length > 2 &&
        ((part.startsWith("*") && part.endsWith("*")) ||
          (part.startsWith("_") && part.endsWith("_")))
      ) {
        return <em key={key}>{part.slice(1, -1)}</em>;
      }
      return <Fragment key={key}>{part}</Fragment>;
    });
}

export default function RichText({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];

  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const content = paragraph.join(" ");
    blocks.push(
      <p key={`p-${blocks.length}`} className="[&:not(:first-child)]:mt-2">
        {renderInline(content, `p-${blocks.length}`)}
      </p>
    );
    paragraph = [];
  };

  const flushList = () => {
    if (!list || list.items.length === 0) {
      list = null;
      return;
    }
    const { ordered, items } = list;
    const key = `l-${blocks.length}`;
    const itemEls = items.map((item, i) => (
      <li key={`${key}-${i}`} className="ml-1">
        {renderInline(item, `${key}-${i}`)}
      </li>
    ));
    blocks.push(
      ordered ? (
        <ol key={key} className="list-decimal list-inside space-y-1 [&:not(:first-child)]:mt-2">
          {itemEls}
        </ol>
      ) : (
        <ul key={key} className="list-disc list-inside space-y-1 [&:not(:first-child)]:mt-2">
          {itemEls}
        </ul>
      )
    );
    list = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = trimmed.match(/^#{1,6}\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push(
        <p
          key={`h-${blocks.length}`}
          className="font-semibold text-[var(--ink-primary)] [&:not(:first-child)]:mt-3"
        >
          {renderInline(heading[1], `h-${blocks.length}`)}
        </p>
      );
      continue;
    }

    const bullet = trimmed.match(/^[-*•]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(bullet[1]);
      continue;
    }

    const numbered = trimmed.match(/^\d+[.)]\s+(.*)$/);
    if (numbered) {
      flushParagraph();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(numbered[1]);
      continue;
    }

    // Plain prose line — if a list was open, this continues after it.
    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return <>{blocks}</>;
}
