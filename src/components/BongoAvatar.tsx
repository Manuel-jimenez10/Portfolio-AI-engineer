"use client";

export type BongoState = "idle" | "thinking" | "happy";

/**
 * Bongo, drawn rather than photographed: an illustrated pup whose parts are
 * addressable, so he can blink, tilt, wag and hop instead of sitting still.
 */
export default function BongoAvatar({
  size = 72,
  state = "idle",
  className = "",
}: {
  size?: number;
  state?: BongoState;
  className?: string;
}) {
  const happy = state === "happy";
  const thinking = state === "thinking";

  const FUR = "#e8a866";
  const FUR_DARK = "#b9743a";
  const FUR_LIGHT = "#f7dcb8";
  const INK = "#2a1c12";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Bongo"
      className={`${happy ? "bongo-hop" : "bongo-breathe"} ${className}`}
      style={{ overflow: "visible" }}
    >
      {/* Tail — behind everything, swings faster when he's pleased */}
      <g className={`bongo-tail ${happy ? "bongo-tail-fast" : ""}`}>
        <path
          d="M88 104 C102 100 110 88 108 74 C107 68 100 66 97 71 C94 77 96 90 86 96 Z"
          fill={FUR_DARK}
        />
      </g>

      {/* Body */}
      <path
        d="M30 120 C30 98 43 86 60 86 C77 86 90 98 90 120 Z"
        fill={FUR}
      />
      <path
        d="M47 120 C47 104 52 96 60 96 C68 96 73 104 73 120 Z"
        fill={FUR_LIGHT}
      />

      <g className={thinking ? "bongo-tilt" : ""}>
        {/* Ears */}
        <g className="bongo-ear-r">
          <ellipse cx="26" cy="54" rx="11.5" ry="21" fill={FUR_DARK} />
        </g>
        <g className="bongo-ear-l">
          <ellipse cx="94" cy="54" rx="11.5" ry="21" fill={FUR_DARK} />
        </g>

        {/* Head */}
        <ellipse cx="60" cy="50" rx="31" ry="29" fill={FUR} />
        {/* Eye patch — gives him a face you can recognize at 28px */}
        <ellipse cx="72" cy="42" rx="14" ry="13" fill={FUR_DARK} opacity="0.35" />

        {/* Eyes */}
        <g>
          <ellipse className="bongo-eye" cx="49" cy="46" rx="5.2" ry="6.4" fill={INK} />
          <circle cx="50.8" cy="43.8" r="1.8" fill="#fff" />
        </g>
        <g>
          <ellipse className="bongo-eye" cx="71" cy="46" rx="5.2" ry="6.4" fill={INK} />
          <circle cx="72.8" cy="43.8" r="1.8" fill="#fff" />
        </g>

        {/* Brows lift when he's excited */}
        {happy && (
          <>
            <path d="M43 36 Q49 32 55 35" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M65 35 Q71 32 77 36" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* Muzzle */}
        <ellipse cx="60" cy="65" rx="18" ry="13.5" fill={FUR_LIGHT} />
        <ellipse cx="60" cy="59" rx="6.2" ry="4.6" fill={INK} />

        {happy ? (
          <>
            <path d="M48 68 Q60 80 72 68 Z" fill={INK} />
            <ellipse cx="60" cy="74" rx="6" ry="4.5" fill="#f2707f" />
          </>
        ) : (
          <>
            <path
              d="M60 63 L60 68 M60 68 Q54 73 49 68 M60 68 Q66 73 71 68"
              stroke={INK}
              strokeWidth="2.1"
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}
      </g>

      {/* Collar with a tag */}
      <path d="M36 84 Q60 94 84 84 L84 91 Q60 101 36 91 Z" fill="var(--accent-blue)" />
      <circle cx="60" cy="96" r="5.4" fill="var(--accent-amber)" />
      <circle cx="60" cy="96" r="2.1" fill="var(--accent-amber-deep)" opacity="0.5" />
    </svg>
  );
}
