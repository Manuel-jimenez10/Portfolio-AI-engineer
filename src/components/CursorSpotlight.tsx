"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed radial-gradient layer that follows the pointer. Pure CSS-variable
 * updates on a single element — no per-frame React state, so it costs
 * nothing on scroll or re-render. Disabled entirely on touch devices where
 * there's no persistent pointer.
 */
export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      el.style.opacity = "0";
      return;
    }

    let raf = 0;
    const handleMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--spot-x", `${e.clientX}px`);
        el.style.setProperty("--spot-y", `${e.clientY}px`);
      });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-spotlight" aria-hidden="true" />;
}
