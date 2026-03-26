"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5 });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;
    const duration = 1800;
    const start = Date.now();
    const raf = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {count}{suffix}
    </span>
  );
}

export function Stats() {
  const { ref, inView } = useInView();

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Full-width glass strip */}
      <div className="absolute inset-0 border-y border-border bg-surface/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] rounded-full bg-gold/3 blur-[100px] pointer-events-none" />

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-border">
          {STATS.map(({ value, label }, i) => {
            // Parse numeric value and suffix
            const numMatch = value.match(/^(\d+)(.*)$/);
            const num = numMatch ? parseInt(numMatch[1]) : 0;
            const suffix = numMatch ? numMatch[2] : "";

            return (
              <div
                key={label}
                className={cn(
                  "text-center lg:px-8 reveal",
                  inView && "visible"
                )}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="font-display text-5xl md:text-6xl font-light text-gradient-gold mb-2 glow-gold-text">
                  <CountUp target={num} suffix={suffix} />
                </div>
                <div className="font-sans text-xs tracking-[0.2em] uppercase text-text-muted">
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
