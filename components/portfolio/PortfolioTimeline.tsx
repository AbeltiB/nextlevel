"use client";

import { useState, useMemo } from "react";
import { PORTFOLIO } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { ExternalLink, ChevronDown, Film, Tv, Music, Zap, Briefcase, Video } from "lucide-react";
import type { ElementType } from "react";

const CATEGORIES = [
  "All",
  "TV Commercial",
  "Film / Documentary",
  "Documentary",
  "Short Film",
  "Music Video",
  "Corporate Film",
  "Live Event",
];

const CATEGORY_ICONS: Record<string, ElementType> = {
  "TV Commercial": Tv,
  "Documentary": Film,
  "Short Film": Film,
  "Music Video": Music,
  "Corporate Film": Briefcase,
  "Live Event": Zap,
  "Film / Documentary": Film,
  Default: Video,
};

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function PortfolioCard({
  project,
  index,
  isLeft,
}: {
  project: (typeof PORTFOLIO)[0];
  index: number;
  isLeft: boolean;
}) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [expanded, setExpanded] = useState(false);
  const Icon = CATEGORY_ICONS[project.category] ?? CATEGORY_ICONS.Default;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "relative grid md:grid-cols-2 gap-0 md:gap-8 mb-10 reveal",
        inView && "visible"
      )}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      {/* Timeline dot — centered on md+ */}
      <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10 flex-col items-center">
        <div
          className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
          style={{
            borderColor: project.categoryColor,
            backgroundColor: `rgba(${hexToRgb(project.categoryColor)}, 0.2)`,
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: project.categoryColor }}
          />
        </div>
        {/* Year badge */}
        <div
          className="mt-2 px-3 py-0.5 rounded-full text-[10px] font-sans tracking-widest uppercase font-medium"
          style={{
            color: project.categoryColor,
            background: `rgba(${hexToRgb(project.categoryColor)}, 0.1)`,
            border: `1px solid rgba(${hexToRgb(project.categoryColor)}, 0.3)`,
          }}
        >
          {project.year}
        </div>
      </div>

      {/* Mobile: dot on left */}
      <div className="md:hidden absolute left-6 top-6 z-10 flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: project.categoryColor }}
        />
      </div>

      {/* Left slot — content or spacer */}
      <div className={cn("md:text-right", !isLeft && "md:order-2")}>
        {isLeft ? (
          <CardContent
            project={project}
            expanded={expanded}
            setExpanded={setExpanded}
            Icon={Icon}
            align="right"
          />
        ) : (
          <div className="hidden md:block" />
        )}
      </div>

      {/* Right slot — content or spacer */}
      <div className={cn(!isLeft && "md:order-1")}>
        {!isLeft ? (
          <CardContent
            project={project}
            expanded={expanded}
            setExpanded={setExpanded}
            Icon={Icon}
            align="left"
          />
        ) : (
          <div className="hidden md:block" />
        )}
      </div>

      {/* Mobile: always full width */}
      <div className="md:hidden col-span-2 pl-14">
        <CardContent
          project={project}
          expanded={expanded}
          setExpanded={setExpanded}
          Icon={Icon}
          align="left"
          mobile
        />
      </div>
    </div>
  );
}

function CardContent({
  project,
  expanded,
  setExpanded,
  Icon,
  align,
  mobile = false,
}: {
  project: (typeof PORTFOLIO)[0];
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  Icon: ElementType;
  align: "left" | "right";
  mobile?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl glass border border-border hover:border-[rgba(201,168,76,0.2)] transition-all duration-400 overflow-hidden",
        mobile && "hidden"
      )}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(to ${align === "right" ? "left" : "right"}, ${project.categoryColor}, transparent)` }}
      />

      <div className="p-6">
        {/* Header */}
        <div
          className={cn(
            "flex items-start gap-3 mb-4",
            align === "right" ? "flex-row-reverse" : "flex-row"
          )}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: `rgba(${hexToRgb(project.categoryColor)}, 0.1)`,
              border: `1px solid rgba(${hexToRgb(project.categoryColor)}, 0.25)`,
            }}
          >
            <Icon size={15} style={{ color: project.categoryColor }} />
          </div>
          <div className={cn("flex-1", align === "right" && "text-right")}>
            <div
              className="font-sans text-[10px] tracking-[0.2em] uppercase mb-0.5"
              style={{ color: project.categoryColor }}
            >
              {project.category}
            </div>
            {/* Mobile year badge */}
            <div className="md:hidden font-sans text-[10px] text-text-muted/50 mb-1">
              {project.year}
            </div>
          </div>
        </div>

        {/* Title & client */}
        <div className={cn("mb-3", align === "right" ? "text-right" : "text-left")}>
          <h3 className="font-display text-xl font-medium text-text group-hover:text-gradient-gold transition-all duration-300 leading-snug">
            {project.title}
          </h3>
          <p className="font-sans text-xs text-text-muted mt-1 tracking-wide">
            {project.client}
          </p>
        </div>

        {/* Description */}
        <p
          className={cn(
            "font-sans text-sm text-text-muted/80 leading-relaxed mb-4",
            align === "right" ? "text-right" : "text-left"
          )}
        >
          {project.description}
        </p>

        {/* Deliverables — expandable */}
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "flex items-center gap-2 font-sans text-xs text-text-muted hover:text-text transition-colors duration-200 mb-3",
              align === "right" ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <ChevronDown
              size={12}
              className={cn("transition-transform duration-300", expanded && "rotate-180")}
            />
            {expanded ? "Hide" : "View"} deliverables
          </button>

          <div
            className={cn(
              "overflow-hidden transition-all duration-400",
              expanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <ul
              className={cn(
                "flex flex-wrap gap-2 mb-4",
                align === "right" ? "justify-end" : "justify-start"
              )}
            >
              {project.deliverables.map((d) => (
                <li
                  key={d}
                  className="px-3 py-1 rounded-full text-[11px] font-sans text-text-muted"
                  style={{
                    background: `rgba(${hexToRgb(project.categoryColor)}, 0.08)`,
                    border: `1px solid rgba(${hexToRgb(project.categoryColor)}, 0.2)`,
                  }}
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div
          className={cn(
            "flex items-center gap-3 pt-3 border-t border-border",
            align === "right" ? "justify-end flex-row-reverse" : "justify-start"
          )}
        >
          {project.featured && (
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-sans tracking-widest uppercase"
              style={{
                color: project.categoryColor,
                background: `rgba(${hexToRgb(project.categoryColor)}, 0.1)`,
              }}
            >
              Featured
            </span>
          )}
          <div className="flex-1" />
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-xs tracking-wide transition-colors duration-200 hover:underline"
            style={{ color: project.categoryColor }}
          >
            View Project
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
}

export function PortfolioTimeline() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories from data
  const availableCategories = useMemo(() => {
    const cats = new Set(PORTFOLIO.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return PORTFOLIO;
    return PORTFOLIO.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Group by year
  const byYear = useMemo(() => {
    const map = new Map<string, (typeof PORTFOLIO)>();
    filtered.forEach((p) => {
      if (!map.has(p.year)) map.set(p.year, []);
      map.get(p.year)!.push(p);
    });
    // Sort years descending
    return Array.from(map.entries()).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [filtered]);

  return (
    <section className="relative py-16 md:py-24">
      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-wrap justify-center gap-2">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full font-sans text-sm tracking-wide transition-all duration-200",
                activeCategory === cat
                  ? "bg-gold text-bg font-semibold"
                  : "glass border border-border text-text-muted hover:text-text hover:border-gold/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {byYear.map(([year, projects]) => (
          <div key={year} className="relative mb-16 last:mb-0">
            {/* Year header */}
            <div className="relative flex items-center justify-center mb-10">
              <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="relative glass-gold rounded-full px-6 py-2 z-10">
                <span className="font-display text-2xl font-light text-gold">{year}</span>
              </div>
            </div>

            {/* Central timeline line */}
            <div className="relative">
              <div className="timeline-line" />

              {/* Cards */}
              <div className="relative z-10 space-y-0">
                {projects.map((project, idx) => (
                  <PortfolioCard
                    key={project.id}
                    project={project}
                    index={idx}
                    isLeft={idx % 2 === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-text-muted">
              No projects in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center">
        <div className="divider-gold mb-12" />
        <p className="font-display text-3xl md:text-4xl font-light text-gradient-white mb-3">
          Ready to be on this list?
        </p>
        <p className="font-sans text-text-muted mb-8">
          Let&apos;s create something remarkable together.
        </p>
        <a
          href="/#contact"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gold text-bg font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.35)]"
        >
          Start a Project
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
