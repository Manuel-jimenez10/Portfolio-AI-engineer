# Portfolio AI Engineer — Design System

**Version:** 2.0.0
**Last Updated:** September 2026
**Author:** Manuel Jiménez
**Scope:** Next.js + Tailwind CSS portfolio, light theme, chat-first

---

## Philosophy

The portfolio is not a page with a chat bolted on — the chat **is** the page.
A visitor lands in a conversation with Bongo, Manuel's assistant, and every
route into the content (stack, metrics, career, contact) is a turn in that
conversation rather than a separate section to scroll past.

Two consequences shape everything else:

1. **The answer changes shape.** A reply is a list of blocks, not a string, so
   asking about impact renders a metric grid and asking about the career
   renders a timeline plus a contact card. See *Answer Blocks*.
2. **Restraint over decoration.** The surfaces are quiet so the conversation
   carries the page. Color is spent on exactly two jobs: blue for anything the
   visitor can act on, amber for Bongo himself.

> Superseded: v1 was a dark "AI lab at night" HUD. It lives in git history.

---

## Color Palette

### Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-page` | `#faf8ff` | Page background |
| `--surface-card` | `#ffffff` | Cards, chat panel, message bubbles |
| `--surface-1` | `#f2f3ff` | Chat header/footer, inset panels, quiet rows |
| `--surface-2` | `#eaedff` | Badges, hover fills, inline code |
| `--surface-3` | `#e2e7ff` | Deepest inset step |
| `--border-hairline` | `#e3e6f5` | Default card and divider border |
| `--border-hairline-strong` | `#c3c6d7` | Input borders, emphasized edges |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `--ink-primary` | `#131b2e` | Headings, message text |
| `--ink-secondary` | `#434655` | Body copy, answer prose |
| `--ink-muted` | `#737686` | Labels, captions, metadata |

### Accents

| Token | Hex | Purpose |
|-------|-----|---------|
| `--accent-blue` | `#2563eb` | Primary actions, user bubbles, links |
| `--accent-blue-deep` | `#004ac6` | Hover state, metric figures |
| `--accent-blue-soft` | `#dbe1ff` | Contact card wash, selection |
| `--accent-amber` | `#fea619` | Bongo: collar, treat button, bark bubble |
| `--accent-amber-deep` | `#855300` | Text on amber surfaces |
| `--accent-amber-soft` | `#ffddb8` | Bark bubble fill, treat well |
| `--status-online` | `#16a34a` | Availability dot |

Blue and amber never compete: blue belongs to the visitor's actions, amber
belongs to the dog. Anything amber is Bongo expressing something.

### Categorical (skill chips)

Re-tuned from the v1 dark values, which were too light to clear 4.5:1 on
white. Always paired with a text label, never color alone.

| Category | Token | Hex |
|----------|-------|-----|
| AI & Agents | `--cat-ai` | `#1d4ed8` |
| Backend | `--cat-backend` | `#c2410c` |
| Data & Infra | `--cat-data` | `#047857` |
| Cloud & DevOps | `--cat-cloud` | `#a16207` |

Chips are built as `color-mix(in srgb, var(--cat-x) 8%, white)` fill with a
28% border, keeping the hue legible without shouting.

---

## Typography

| Slot | Family | Usage |
|------|--------|-------|
| Sans | Geist Sans | Everything by default |
| Mono | JetBrains Mono → Geist Mono | Dates, stack tags, treat counter |

| Element | Size | Weight |
|---------|------|--------|
| Greeting headline | 1.5rem | 600 |
| Message / answer body | 15px | 400 |
| Card titles | 1rem | 600 |
| Captions, metadata | 12–13px | 400 |
| `.label-caps` | 0.7rem, `0.1em` tracking, uppercase | 600 |

`.label-caps` is sans here, not mono — the v1 mono version read as a HUD,
which is the wrong voice for this theme.

---

## Layout

Two columns at `lg` and up: a 300px sidebar and the chat filling the rest.
Below `lg` they stack, and **the chat is ordered first** — stacking the
sidebar above would bury the one thing the page exists for.

```
┌──────────────────────────────────────────────┐
│ Top nav: Bongo · tabs · lang · contact       │
├───────────────┬──────────────────────────────┤
│ Profile card  │  Chat header (Bongo, status) │
│ Explore list  │  ───────────────────────────  │
│ Treat card    │  Welcome / messages           │
│               │  ───────────────────────────  │
│               │  Input + disclaimer           │
└───────────────┴──────────────────────────────┘
```

The chat panel is `h-[min(78vh,820px)]` with a `560px` floor, so it stays a
fixed frame with its own scroll rather than growing the page.

---

## Answer Blocks

The thing that makes the chat feel alive. A Bongo message holds
`Block[]` (see `src/lib/blocks.ts`) instead of a string:

| Block | Renders |
|-------|---------|
| `text` | Prose, via `RichText` (safe minimal markdown) |
| `metrics` | Three metric cards from `t.metrics.items` |
| `stack` | Skill chips grouped by category from `profile.ts` |
| `timeline` | Job cards: company, role, period, lead bullet, stack tags |
| `contact` | Email + LinkedIn actions on a blue wash |
| `followUps` | Buttons that open the next topic |

Curated topics (the sidebar's five) mix prose with real data and render
instantly with no model call. Free-text questions stream from Gemini and
arrive as a single `text` block. Both paths share the same bubble.

---

## Bongo

Illustrated in SVG (`BongoAvatar.tsx`), not photographed — every part is
addressable, so he can react instead of sitting still. Used at 30px (message
rows, nav), 44px (chat header) and 104px (welcome).

### States

| State | Trigger | Shows |
|-------|---------|-------|
| `idle` | Default | Slow breathing, periodic blink, gentle tail wag |
| `thinking` | Model is streaming | Head tilt, ears twitch |
| `happy` | Visitor gives a treat | Hop, raised brows, open mouth + tongue, fast tail |

### Motion

| Animation | Duration | Applied to |
|-----------|----------|------------|
| `bongo-breathe` | 3.6s | Whole avatar at rest |
| `bongo-blink` | 5.2s | Eyes (`scaleY` to 0.08) |
| `bongo-tail` | 2.4s (0.28s when happy) | Tail group |
| `bongo-hop` | 0.85s, once | Whole avatar on treat |
| `bongo-tilt` | 1.5s | Head group while thinking |
| `bongo-ear` | 2.9s, mirrored | Each ear |
| `bark-pop` | 0.95s, once | "¡Guau!" bubble |
| `treat-arc` | 0.9s, once | Bone tossed from the sidebar |

SVG parts need `transform-box: fill-box` for percentage `transform-origin`
to resolve against the part rather than the viewport.

The bark bubble is anchored **inside** the chat header, not hanging off the
avatar: the panel clips overflow, so a bubble above the avatar gets cut.

Every animation above is listed in the `prefers-reduced-motion: reduce`
block, along with `msg-in` and `dot-bounce`.

---

## Accessibility

- Body text `#434655` on white ≈ **8.9:1**; primary `#131b2e` ≈ **15.8:1**
- `--accent-blue` on white ≈ **5.2:1**; white on `--accent-blue` ≈ **4.9:1**
- Amber is never used for text on white — only as a fill under
  `--accent-amber-deep` (≈ 6.1:1 on `--accent-amber-soft`)
- The avatar carries `role="img"` + `aria-label`; decorative marks are
  `aria-hidden`
- All motion is opt-out via `prefers-reduced-motion`

---

## Content Integrity

Every figure, company and technology on this site comes from
`src/lib/profile.ts`, which mirrors Manuel's real CV and LinkedIn. Design
mockups generated for this project have twice arrived pre-filled with
invented employers, fabricated scale metrics and infrastructure he has never
run. **Take layout and motion from a mockup; never take its content.**

The system prompt tells Bongo to say he doesn't know rather than guess, and
the curated topics are hand-written against real data for the same reason.
