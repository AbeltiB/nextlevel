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
    const duration = 1600;
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
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { ref, inView } = useInView();

  return (
    <section className="relative py-12 md:py-14 overflow-hidden">
      <div className="absolute inset-0 border-y border-border bg-surface/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[150px] rounded-full bg-gold/[0.03] blur-[80px] pointer-events-none" />

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-border">
          {STATS.map(({ value, label }, i) => {
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
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="font-display text-4xl md:text-5xl font-light text-gradient-gold mb-1.5 glow-gold-text">
                  <CountUp target={num} suffix={suffix} />
                </div>
                <div className="font-sans text-[10px] md:text-xs tracking-[0.18em] uppercase text-text-muted">
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