import type { ModuleId, Translation } from "./i18n";

/**
 * A Bongo answer is a list of blocks rather than a string. Free-form questions
 * come back from the model as a single `text` block; the curated topics in the
 * sidebar mix prose with real data pulled from profile.ts, which is what lets
 * the reply change shape instead of always being a paragraph.
 */
export type Block =
  | { kind: "text"; text: string }
  | { kind: "metrics" }
  | { kind: "stack" }
  | { kind: "timeline" }
  | { kind: "contact" }
  | { kind: "followUps"; ids: ModuleId[] };

export function blocksForModule(id: ModuleId, t: Translation): Block[] {
  const mod = t.bongo.modules.find((m) => m.id === id);
  const intro: Block[] = mod ? [{ kind: "text", text: mod.body }] : [];

  switch (id) {
    case "about-bongo":
      return [...intro, { kind: "followUps", ids: ["agents", "rag", "metrics"] }];
    case "agents":
      return [...intro, { kind: "stack" }, { kind: "followUps", ids: ["rag", "metrics"] }];
    case "rag":
      return [...intro, { kind: "stack" }, { kind: "followUps", ids: ["agents", "experience"] }];
    case "metrics":
      return [...intro, { kind: "metrics" }, { kind: "followUps", ids: ["agents", "experience"] }];
    case "experience":
      return [...intro, { kind: "timeline" }, { kind: "contact" }];
  }
}
