"use client";

import Link from "next/link";
import { ArrowDown, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const REEL_WORDS = ["Commercials.", "Music.", "Films.", "Events.", "Legacies."];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % REEL_WORDS.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f12] via-[#121215] to-[#0f0f14]" />

      {/* Gradient orbs — toned down */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none animate-float"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full blur-[130px] pointer-events-none opacity-60"
        style={{ background: "radial-gradient(circle, rgba(255,59,92,0.04) 0%, transparent 70%)", animationDelay: "2s" }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-[20%] w-px h-full opacity-[0.05]"
          style={{ background: "linear-gradient(to bottom, transparent, #C9A84C, transparent)" }}
        />
        <div
          className="absolute top-0 left-[15%] w-px h-full opacity-[0.03]"
          style={{ background: "linear-gradient(to bottom, transparent, #fff, transparent)" }}
        />
      </div>

      {/* Floating badge — desktop only */}
      <div
        className="absolute top-28 right-8 md:right-16 hidden lg:flex flex-col items-center gap-2 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="glass-gold rounded-2xl px-4 py-3 text-center">
          <div className="font-display text-3xl font-semibold text-gold leading-none">9+</div>
          <div className="font-sans text-[10px] tracking-widest uppercase text-text-muted mt-1">Years</div>
        </div>
      </div>

      {/* Status badge */}
      <div
        className="absolute bottom-28 left-6 md:left-16 hidden md:flex items-center gap-3 glass rounded-xl px-4 py-2.5 animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
        <span className="font-sans text-xs text-text-muted">Now Accepting Projects</span>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 md:pt-20">
        <div className="max-w-5xl">
          {/* Tag */}
          <div
            className="inline-flex items-center gap-3 glass-gold rounded-full px-5 py-2 mb-6 md:mb-8 animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
              Addis Ababa · Ethiopia
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-light tracking-tight mb-5 md:mb-6"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7.5rem)", lineHeight: 1.02 }}
          >
            <span
              className="block text-gradient-white animate-fade-up opacity-0"
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              We Create
            </span>
            <div
              className="block animate-fade-up opacity-0 overflow-hidden"
              style={{
                animationDelay: "200ms",
                animationFillMode: "forwards",
                height: "1.1em",
              }}
            >
              <span
                className="block text-gradient-gold italic"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {REEL_WORDS[wordIndex]}
              </span>
            </div>
          </h1>

          {/* Subheadline */}
          <p
            className="font-sans text-text-muted text-base md:text-lg leading-relaxed max-w-lg mb-8 md:mb-10 animate-fade-up opacity-0"
            style={{ animationDelay: "330ms", animationFillMode: "forwards" }}
          >
            Africa&apos;s most ambitious production company. From TV commercials
            to feature films — turning bold visions into cultural milestones.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-3 md:gap-4 animate-fade-up opacity-0"
            style={{ animationDelay: "480ms", animationFillMode: "forwards" }}
          >
            <Link
              href="/portfolio"
              className="group relative overflow-hidden px-7 py-3.5 md:px-8 md:py-4 rounded-full bg-gold text-bg font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_36px_rgba(201,168,76,0.35)]"
            >
              <span className="relative z-10">View Our Work</span>
              <div className="absolute inset-0 bg-gold-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </Link>

            <Link
              href="/#contact"
              className="group flex items-center gap-2.5 px-7 py-3.5 md:px-8 md:py-4 rounded-full glass hover:glass-gold font-sans text-sm tracking-wide text-text-muted hover:text-gold transition-all duration-300"
            >
              <Play size={13} className="fill-current" />
              Start a Project
            </Link>
          </div>

          {/* Stats strip */}
          <div
            className="mt-12 md:mt-16 flex flex-wrap items-center gap-6 md:gap-8 animate-fade-up opacity-0"
            style={{ animationDelay: "620ms", animationFillMode: "forwards" }}
          >
            <div
              className="h-px flex-1 max-w-[60px] hidden sm:block"
              style={{ background: "linear-gradient(to right, rgba(201,168,76,0.35), transparent)" }}
            />
            {[
              { n: "500+", label: "Projects" },
              { n: "80+", label: "Clients" },
              { n: "500M+", label: "Views" },
            ].map(({ n, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="font-display text-xl md:text-2xl font-semibold text-gold">{n}</span>
                <span className="font-sans text-xs text-text-muted uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0"
        style={{ animationDelay: "1100ms", animationFillMode: "forwards" }}
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-text-muted/40">Scroll</span>
        <div className="w-px h-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/40 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
        </div>
        <ArrowDown size={11} className="text-text-muted/40 animate-bounce" />
      </div>
    </section>
  );
}