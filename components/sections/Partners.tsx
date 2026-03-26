"use client";

import { CLIENTS } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

export function Partners() {
  const { ref: headRef, inView: headIn } = useInView();

  return (
    <section id="partners" className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn("reveal text-center max-w-xl mx-auto mb-14", headIn && "visible")}
        >
          <div className="inline-flex items-center gap-3 glass-gold rounded-full px-5 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
              Trusted By
            </span>
          </div>
          <h2
            className="font-display font-light tracking-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", lineHeight: 1.15 }}
          >
            <span className="text-gradient-white">Partners &</span>{" "}
            <span className="text-gradient-gold italic">Clients</span>
          </h2>
          <p className="font-sans text-text-muted text-base leading-relaxed">
            From Ethiopia&apos;s top banks and NGOs to international organizations —
            brands that demand excellence choose Next Level.
          </p>
        </div>

        {/* Logo pill grid */}
        <ClientGrid />

        {/* CTA strip */}
        <div className="mt-14 text-center">
          <p className="font-sans text-sm text-text-muted mb-4">
            Ready to join Africa&apos;s most distinguished client roster?
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full glass-gold font-sans text-sm text-gold tracking-wide hover:glow-gold transition-all duration-300"
          >
            Let&apos;s Create Together
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ClientGrid() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  // Group clients into categories for visual variety
  const categories = [
    { label: "Banking & Finance", items: CLIENTS.slice(0, 5), color: "#C9A84C" },
    { label: "International Orgs", items: CLIENTS.slice(5, 8), color: "#10B981" },
    { label: "Real Estate", items: CLIENTS.slice(8, 11), color: "#8B5CF6" },
    { label: "Enterprise", items: CLIENTS.slice(11), color: "#0EA5E9" },
  ];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="space-y-6"
    >
      {categories.map(({ label, items, color }, catIdx) => (
        <div
          key={label}
          className={cn("reveal", inView && "visible")}
          style={{ transitionDelay: `${catIdx * 120}ms` }}
        >
          {/* Category label */}
          <div className="flex items-center gap-4 mb-3">
            <span
              className="font-sans text-[10px] tracking-[0.2em] uppercase shrink-0"
              style={{ color }}
            >
              {label}
            </span>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, rgba(${hexToRgb(color)},0.3), transparent)` }} />
          </div>

          {/* Pills */}
          <div className="flex flex-wrap gap-2">
            {items.map((client, i) => (
              <div
                key={client}
                className="group relative px-5 py-2.5 rounded-xl glass border border-border hover:border-[rgba(201,168,76,0.2)] transition-all duration-300 overflow-hidden"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {/* Hover accent */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  style={{ background: `rgba(${hexToRgb(color)}, 0.05)` }}
                />
                <span className="relative font-sans text-sm text-text-muted group-hover:text-text transition-colors duration-200">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
