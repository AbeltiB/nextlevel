"use client";

import { MISSION_VISION } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { Eye, Target, CheckCircle2 } from "lucide-react";

export function MissionVision() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="mission" className="section relative overflow-hidden bg-surface/30">
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)" }}
        />
      </div>

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section label */}
        <div className={cn("reveal text-center mb-14", inView && "visible")}>
          <div className="inline-flex items-center gap-3 glass-gold rounded-full px-5 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
              Purpose & Direction
            </span>
          </div>
          <h2
            className="font-display font-light tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1 }}
          >
            <span className="text-gradient-gold italic">Mission.</span>{" "}
            <span className="text-gradient-white">Vision.</span>{" "}
            <span className="text-gradient-gold italic">Values.</span>
          </h2>
        </div>

        {/* Mission / Vision cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            {
              Icon: Target,
              title: "Our Mission",
              text: MISSION_VISION.mission,
              delay: "0ms",
            },
            {
              Icon: Eye,
              title: "Our Vision",
              text: MISSION_VISION.vision,
              delay: "100ms",
            },
          ].map(({ Icon, title, text, delay }) => (
            <div
              key={title}
              className={cn(
                "reveal relative p-8 md:p-10 rounded-2xl glass border border-border hover:border-gold/20 transition-all duration-500 overflow-hidden group",
                inView && "visible"
              )}
              style={{ transitionDelay: delay }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at top right, rgba(201,168,76,0.08), transparent 70%)" }}
              />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl glass-gold flex items-center justify-center">
                  <Icon size={20} className="text-gold" />
                </div>
                <h3 className="font-display text-2xl font-medium text-gradient-gold">
                  {title}
                </h3>
              </div>
              <p className="font-sans text-text-muted leading-relaxed text-base">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MISSION_VISION.values.map(({ title, desc }, i) => (
            <div
              key={title}
              className={cn(
                "reveal p-6 rounded-xl border border-border hover:border-gold/20 transition-all duration-300 group",
                inView && "visible"
              )}
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle2 size={16} className="text-gold mt-0.5 shrink-0" />
                <h4 className="font-sans font-semibold text-sm text-text tracking-wide group-hover:text-gold transition-colors duration-200">
                  {title}
                </h4>
              </div>
              <p className="font-sans text-xs text-text-muted leading-relaxed pl-7">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
