"use client";

import { useState, useMemo } from "react";
import { PORTFOLIO } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import {
  ExternalLink,
  ChevronDown,
  Film,
  Tv,
  Music,
  Zap,
  Briefcase,
  Video,
} from "lucide-react";
import type { ElementType } from "react";

const CATEGORY_ICONS: Record<string, ElementType> = {
  "TV Commercial": Tv,
  Documentary: Film,
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
  const { ref, inView } = useInView({ threshold: 0.08 });
  const [expanded, setExpanded] = useState(false);
  const Icon = CATEGORY_ICONS[project.category] ?? CATEGORY_ICONS.Default;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "relative grid md:grid-cols-2 gap-0 md:gap-8 mb-6 md:mb-8 reveal",
        inView && "visible"
      )}
      style={{ transitionDelay: `${(index % 3) * 70}ms` }}
    >
      {/* Timeline dot — desktop */}
      <div className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 z-10 flex-col items-center">
        <div
          className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
          style={{
            borderColor: project.categoryColor,
            backgroundColor: `rgba(${hexToRgb(project.categoryColor)}, 0.15)`,
          }}
        >
          <div
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: project.categoryColor }}
          />
        </div>
        <div
          className="mt-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-sans tracking-widest uppercase font-medium"
          style={{
            color: project.categoryColor,
            background: `rgba(${hexToRgb(project.categoryColor)}, 0.08)`,
            border: `1px solid rgba(${hexToRgb(project.categoryColor)}, 0.25)`,
          }}
        >
          {project.year}
        </div>
      </div>

      {/* Mobile dot */}
      <div className="md:hidden absolute left-5 top-5 z-10">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: project.categoryColor }}
        />
      </div>

      {/* Desktop: left slot */}
      <div className={cn("hidden md:block md:text-right", !isLeft && "md:order-2")}>
        {isLeft && (
          <CardContent
            project={project}
            expanded={expanded}
            setExpanded={setExpanded}
            Icon={Icon}
            align="right"
          />
        )}
      </div>

      {/* Desktop: right slot */}
      <div className={cn("hidden md:block", !isLeft && "md:order-1")}>
        {!isLeft && (
          <CardContent
            project={project}
            expanded={expanded}
            setExpanded={setExpanded}
            Icon={Icon}
            align="left"
          />
        )}
      </div>

      {/* Mobile: full width */}
      <div className="md:hidden col-span-2 pl-12">
        <CardContent
          project={project}
          expanded={expanded}
          setExpanded={setExpanded}
          Icon={Icon}
          align="left"
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
}: {
  project: (typeof PORTFOLIO)[0];
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  Icon: ElementType;
  align: "left" | "right";
}) {
  return (
    <div className="group relative rounded-xl glass border border-border hover:border-[rgba(201,168,76,0.18)] transition-all duration-300 overflow-hidden">
      {/* Top accent */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(to ${align === "right" ? "left" : "right"}, ${project.categoryColor}, transparent)`,
        }}
      />

      <div className="p-5">
        {/* Header */}
        <div
          className={cn(
            "flex items-start gap-3 mb-3.5",
            align === "right" ? "flex-row-reverse" : "flex-row"
          )}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: `rgba(${hexToRgb(project.categoryColor)}, 0.1)`,
              border: `1px solid rgba(${hexToRgb(project.categoryColor)}, 0.2)`,
            }}
          >
            <Icon size={13} style={{ color: project.categoryColor }} />
          </div>
          <div className={cn("flex-1", align === "right" && "text-right")}>
            <div
              className="font-sans text-[9px] tracking-[0.18em] uppercase mb-0.5"
              style={{ color: project.categoryColor }}
            >
              {project.category}
            </div>
            <div className="md:hidden font-sans text-[9px] text-text-muted/40">
              {project.year}
            </div>
          </div>
        </div>

        {/* Title & client */}
        <div className={cn("mb-2.5", align === "right" ? "text-right" : "text-left")}>
          <h3 className="font-display text-lg md:text-xl font-medium text-text group-hover:text-gold transition-colors duration-300 leading-snug">
            {project.title}
          </h3>
          <p className="font-sans text-xs text-text-muted mt-0.5 tracking-wide">
            {project.client}
          </p>
        </div>

        {/* Description */}
        <p
          className={cn(
            "font-sans text-sm text-text-muted/75 leading-relaxed mb-3.5",
            align === "right" ? "text-right" : "text-left"
          )}
        >
          {project.description}
        </p>

        {/* Deliverables */}
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className={cn(
              "flex items-center gap-1.5 font-sans text-xs text-text-muted hover:text-text transition-colors duration-200 mb-2.5",
              align === "right" ? "ml-auto flex-row-reverse" : ""
            )}
          >
            <ChevronDown
              size={11}
              className={cn("transition-transform duration-300", expanded && "rotate-180")}
            />
            {expanded ? "Hide" : "View"} deliverables
          </button>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              expanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <ul
              className={cn(
                "flex flex-wrap gap-1.5 mb-3",
                align === "right" ? "justify-end" : "justify-start"
              )}
            >
              {project.deliverables.map((d) => (
                <li
                  key={d}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-sans text-text-muted"
                  style={{
                    background: `rgba(${hexToRgb(project.categoryColor)}, 0.07)`,
                    border: `1px solid rgba(${hexToRgb(project.categoryColor)}, 0.18)`,
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
              className="px-2 py-0.5 rounded-full text-[9px] font-sans tracking-widest uppercase"
              style={{
                color: project.categoryColor,
                background: `rgba(${hexToRgb(project.categoryColor)}, 0.08)`,
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
            <ExternalLink size={9} />
          </a>
        </div>
      </div>
    </div>
  );
}

export function PortfolioTimeline() {
  const [activeCategory, setActiveCategory] = useState("All");

  const availableCategories = useMemo(() => {
    const cats = new Set(PORTFOLIO.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return PORTFOLIO;
    return PORTFOLIO.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const byYear = useMemo(() => {
    const map = new Map<string, (typeof PORTFOLIO)>();
    filtered.forEach((p) => {
      if (!map.has(p.year)) map.set(p.year, []);
      map.get(p.year)!.push(p);
    });
    return Array.from(map.entries()).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [filtered]);

  return (
    <section className="relative py-12 md:py-20">
      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-12 md:mb-16">
        <div className="flex flex-wrap justify-center gap-2">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full font-sans text-xs md:text-sm tracking-wide transition-all duration-200",
                activeCategory === cat
                  ? "bg-gold text-bg font-semibold"
                  : "glass border border-border text-text-muted hover:text-text hover:border-gold/15"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {byYear.map(([year, projects]) => (
          <div key={year} className="relative mb-12 md:mb-16 last:mb-0">
            {/* Year header */}
            <div className="relative flex items-center justify-center mb-8 md:mb-10">
              <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="relative glass-gold rounded-full px-5 py-1.5 z-10">
                <span className="font-display text-xl md:text-2xl font-light text-gold">
                  {year}
                </span>
              </div>
            </div>

            {/* Cards */}
            <div className="relative">
              <div className="timeline-line" />
              <div className="relative z-10">
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
          <div className="text-center py-16">
            <p className="font-display text-xl text-text-muted">
              No projects in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mt-16 text-center">
        <div className="divider-gold mb-10" />
        <p className="font-display text-2xl md:text-3xl font-light text-gradient-white mb-2">
          Ready to be on this list?
        </p>
        <p className="font-sans text-text-muted text-sm mb-7">
          Let&apos;s create something remarkable together.
        </p>
        <a
          href="/#contact"
          className="inline-flex items-center gap-2.5 px-9 py-3.5 rounded-full bg-gold text-bg font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_36px_rgba(201,168,76,0.3)]"
        >
          Start a Project
          <span>→</span>
        </a>
      </div>
    </section>
  );
}