"use client";

import { CLIENTS } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export function Partners() {
  const { ref: headRef, inView: headIn } = useInView();

  return (
    <section id="partners" className="section relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn("reveal text-center max-w-xl mx-auto mb-10 md:mb-14", headIn && "visible")}
        >
          <div className="inline-flex items-center gap-3 glass-gold rounded-full px-5 py-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
              Trusted By
            </span>
          </div>
          <h2
            className="font-display font-light tracking-tight mb-4"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", lineHeight: 1.15 }}
          >
            <span className="text-gradient-white">Partners &</span>{" "}
            <span className="text-gradient-gold italic">Clients</span>
          </h2>
          <p className="font-sans text-text-muted text-sm md:text-base leading-relaxed">
            From Ethiopia&apos;s top banks and NGOs to international
            organizations — brands that demand excellence choose Next Level.
          </p>
        </div>

        <ClientGrid />

        {/* CTA */}
        <div className="mt-10 md:mt-14 text-center">
          <p className="font-sans text-sm text-text-muted mb-4">
            Ready to join Africa&apos;s most distinguished client roster?
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full glass-gold font-sans text-sm text-gold tracking-wide hover:glow-gold transition-all duration-300"
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
  const { ref, inView } = useInView({ threshold: 0.08 });

  const categories = [
    { label: "Banking & Finance", items: CLIENTS.slice(0, 5), color: "#C9A84C" },
    { label: "International Orgs", items: CLIENTS.slice(5, 8), color: "#10B981" },
    { label: "Real Estate", items: CLIENTS.slice(8, 11), color: "#8B5CF6" },
    { label: "Enterprise", items: CLIENTS.slice(11), color: "#0EA5E9" },
  ];

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="space-y-5">
      {categories.map(({ label, items, color }, catIdx) => (
        <div
          key={label}
          className={cn("reveal", inView && "visible")}
          style={{ transitionDelay: `${catIdx * 100}ms` }}
        >
          <div className="flex items-center gap-4 mb-3">
            <span
              className="font-sans text-[10px] tracking-[0.18em] uppercase shrink-0"
              style={{ color }}
            >
              {label}
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background: `linear-gradient(to right, rgba(${hexToRgb(color)},0.25), transparent)`,
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {items.map((client, i) => (
              <div
                key={client}
                className="group relative px-4 py-2 rounded-xl glass border border-border hover:border-[rgba(201,168,76,0.15)] transition-all duration-300 overflow-hidden"
                style={{ transitionDelay: `${i * 25}ms` }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  style={{ background: `rgba(${hexToRgb(color)}, 0.04)` }}
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