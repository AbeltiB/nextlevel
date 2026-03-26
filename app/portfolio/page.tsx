import type { Metadata } from "next";
import { PortfolioTimeline } from "@/components/portfolio/PortfolioTimeline";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our complete portfolio of TV commercials, films, documentaries, music videos, and live events produced for leading brands across Africa.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-bg pt-24">
      {/* Page Header */}
      <div className="relative overflow-hidden py-20 md:py-32">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 glass-gold rounded-full px-5 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" />
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
                Our Work
              </span>
            </div>
            <h1
              className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight"
              style={{ lineHeight: 1.05 }}
            >
              <span className="text-gradient-white">The Stories</span>
              <br />
              <span className="text-gradient-gold italic">We&apos;ve Told</span>
            </h1>
            <p className="max-w-2xl mx-auto font-sans text-text-muted text-lg leading-relaxed">
              From landmark TV commercials to award-winning films — a curated
              timeline of projects that define our legacy and push the boundaries
              of African media.
            </p>

            {/* Category legend */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {[
                { label: "TV Commercial", color: "#C9A84C" },
                { label: "Film / Documentary", color: "#10B981" },
                { label: "Music Video", color: "#FF3B5C" },
                { label: "Live Event", color: "#0EA5E9" },
                { label: "Corporate Film", color: "#06B6D4" },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-sans text-text-muted"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider-gold mx-auto max-w-4xl" />

      {/* Timeline */}
      <PortfolioTimeline />
    </div>
  );
}
