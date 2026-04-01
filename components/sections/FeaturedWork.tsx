"use client";

import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { PORTFOLIO } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const featured = PORTFOLIO.filter((p) => p.featured).slice(0, 4);

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export function FeaturedWork() {
  const { ref: headRef, inView: headIn } = useInView();

  return (
    <section id="work" className="section relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn(
            "reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-12",
            headIn && "visible"
          )}
        >
          <div>
            <div className="inline-flex items-center gap-3 glass-gold rounded-full px-5 py-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
                Featured Work
              </span>
            </div>
            <h2
              className="font-display font-light tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", lineHeight: 1.1 }}
            >
              <span className="text-gradient-white">Defining</span>{" "}
              <span className="text-gradient-gold italic">Projects</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group flex items-center gap-2 font-sans text-sm text-gold hover-underline tracking-wide shrink-0"
          >
            View Full Portfolio
            <ArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              featured={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: (typeof PORTFOLIO)[0];
  index: number;
  featured?: boolean;
}) {
  const { ref, inView } = useInView({ threshold: 0.12 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "reveal group relative rounded-2xl overflow-hidden border border-border hover:border-[rgba(201,168,76,0.2)] transition-all duration-400",
        featured && "md:col-span-2 lg:col-span-2",
        inView && "visible"
      )}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* Visual placeholder */}
      <div
        className="relative w-full overflow-hidden"
        style={{ paddingBottom: featured ? "42%" : "58%" }}
      >
        <div className="absolute inset-0 bg-surface-2 flex items-center justify-center">
          {/* Letterbox bars */}
          <div className="absolute top-0 left-0 right-0 h-7 bg-bg/70" />
          <div className="absolute bottom-0 left-0 right-0 h-7 bg-bg/70" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Play button */}
          <div className="flex flex-col items-center gap-2.5">
            <div
              className="w-14 h-14 rounded-full border flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ borderColor: project.categoryColor, color: project.categoryColor }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 translate-x-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span
              className="font-sans text-[10px] tracking-widest uppercase opacity-50"
              style={{ color: project.categoryColor }}
            >
              {project.category}
            </span>
          </div>
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              background: `radial-gradient(circle at center, rgba(${hexToRgb(project.categoryColor)}, 0.07), transparent 70%)`,
            }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="p-5 space-y-2.5 bg-surface/50">
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-sans tracking-widest uppercase"
            style={{ color: project.categoryColor }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: project.categoryColor }}
            />
            {project.category}
          </span>
          <span className="font-sans text-xs text-text-muted">{project.year}</span>
        </div>

        <h3 className="font-display text-lg md:text-xl font-medium text-text group-hover:text-gold transition-colors duration-300">
          {project.title}
        </h3>

        <p className="font-sans text-xs text-text-muted tracking-wide">{project.client}</p>

        <p className="font-sans text-sm text-text-muted/70 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans text-xs tracking-wide mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: project.categoryColor }}
        >
          View Project
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}