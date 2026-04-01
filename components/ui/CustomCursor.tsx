"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let hovering = false;
    let rafId: number;

    const LERP = 0.13;

    const isInteractive = (target: EventTarget | null): boolean => {
      if (!target || !(target instanceof Element)) return false;
      return !!(target.closest('a, button, [role="button"], input, textarea, select'));
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot is instant — no lag
      dot.style.transform = `translate3d(${mouseX - 4}px,${mouseY - 4}px,0)`;
    };

    const onOver = (e: MouseEvent) => {
      const nowHovering = isInteractive(e.target);
      if (nowHovering === hovering) return;
      hovering = nowHovering;
      ring.style.borderColor = hovering
        ? "rgba(201,168,76,0.55)"
        : "rgba(255,255,255,0.18)";
    };

    const tick = () => {
      // Smooth lerp for ring only
      ringX += (mouseX - ringX) * LERP;
      ringY += (mouseY - ringY) * LERP;
      const s = hovering ? 1.55 : 1;
      ring.style.transform = `translate3d(${ringX - 20}px,${ringY - 20}px,0) scale(${s})`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Instant dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full bg-gold mix-blend-difference"
        style={{ width: 8, height: 8, willChange: "transform" }}
      />
      {/* Lerped ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full"
        style={{
          width: 40,
          height: 40,
          border: "1px solid rgba(255,255,255,0.18)",
          willChange: "transform",
          transition: "border-color 0.25s ease, transform 0.08s linear",
        }}
      />
    </>
  );
}