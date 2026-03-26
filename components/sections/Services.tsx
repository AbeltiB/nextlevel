"use client";

import { Monitor, Music2, Share2, Film, Sparkles, Briefcase } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import type { ElementType } from "react";

const ICON_MAP: Record<string, ElementType> = {
  Monitor,
  Music2,
  Share2,
  Film,
  Sparkles,
  Briefcase,
};

function ServiceCard({ service, index }: { service: (typeof SERVICES)[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const Icon = ICON_MAP[service.icon] ?? Monitor;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "reveal group relative rounded-2xl p-7 glass border border-border hover:border-[rgba(201,168,76,0.2)] transition-all duration-500 cursor-pointer overflow-hidden",
        inView && "visible"
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Gradient bg on hover */}
      <div
        className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl", `bg-gradient-to-br ${service.gradient}`)}
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            background: `rgba(${hexToRgb(service.accent)}, 0.1)`,
            border: `1px solid rgba(${hexToRgb(service.accent)}, 0.2)`,
          }}
        >
          <Icon
            size={20}
            style={{ color: service.accent }}
          />
        </div>
        <div className="text-right">
          <div className="font-display text-2xl font-semibold" style={{ color: service.accent }}>
            {service.stat}
          </div>
          <div className="font-sans text-[10px] tracking-widest uppercase text-text-muted">
            {service.statLabel}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative space-y-3">
        <h3 className="font-display text-xl font-medium text-text tracking-wide group-hover:text-gradient-gold transition-all duration-300">
          {service.title}
        </h3>
        <p className="font-sans text-sm text-text-muted leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Bottom arrow */}
      <div className="relative mt-6 flex items-center gap-2 font-sans text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: service.accent }}>
        <span>Explore</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
    </div>
  );
}

// Helper to convert hex to rgb
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export function Services() {
  const { ref: headRef, inView: headInView } = useInView();

  return (
    <section id="services" className="section relative overflow-hidden">
      {/* Section bg */}
      <div className="absolute inset-0 bg-surface/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn("reveal mb-14 max-w-2xl", headInView && "visible")}
        >
          <div className="inline-flex items-center gap-3 glass-gold rounded-full px-5 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
              What We Do
            </span>
          </div>
          <h2
            className="font-display font-light tracking-tight mb-5"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1 }}
          >
            <span className="text-gradient-white">Production</span>{" "}
            <span className="text-gradient-gold italic">Reimagined</span>
          </h2>
          <p className="font-sans text-text-muted text-lg leading-relaxed">
            Six integrated disciplines. One unified vision. From the first
            concept to the final cut — and everything in between.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
