"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { Award, Globe2, Users } from "lucide-react";

const PILLARS = [
  {
    Icon: Award,
    title: "Award-Winning Craft",
    desc: "Our productions have screened at FESPACO, received Cannes Lions recognition, and set the benchmark for African media quality.",
  },
  {
    Icon: Globe2,
    title: "Pan-African Reach",
    desc: "Strategic partnerships with broadcasters, streaming platforms, and distribution networks across 30+ African countries.",
  },
  {
    Icon: Users,
    title: "A-List Talent Roster",
    desc: "Directors, cinematographers, composers, and editors who have worked with the world's most respected production companies.",
  },
];

export function About() {
  const { ref: leftRef, inView: leftIn } = useInView({ threshold: 0.15 });
  const { ref: rightRef, inView: rightIn } = useInView({ threshold: 0.15 });

  return (
    <section id="about" className="section relative overflow-hidden">
      {/* Diagonal bg accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(201,168,76,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — text */}
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            className={cn("reveal space-y-8", leftIn && "visible")}
          >
            <div>
              <div className="inline-flex items-center gap-3 glass-gold rounded-full px-5 py-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
                  Who We Are
                </span>
              </div>

              <h2
                className="font-display font-light tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1 }}
              >
                <span className="text-gradient-white">Storytellers.</span>
                <br />
                <span className="text-gradient-gold italic">Innovators.</span>
                <br />
                <span className="text-gradient-white">Africans.</span>
              </h2>
            </div>

            <div className="space-y-5 font-sans text-text-muted leading-relaxed">
              <p>
                Founded in{" "}
                <span className="text-gold font-medium">Addis Ababa</span> with
                a mandate to elevate African storytelling to global standards,
                Next Level Media Events and Communication PLC has grown into the
                continent&apos;s most trusted full-service production company.
              </p>
              <p>
                We serve banks, NGOs, real estate developers, government bodies,
                FMCG brands, and independent artists who demand more than
                competent execution — they demand work that moves people and
                endures.
              </p>
              <p>
                Our studio in Addis Ababa houses cutting-edge production
                infrastructure: 4K cinema cameras, Dolby-certified sound stages,
                color grading suites, and a post-production pipeline built to
                international broadcast standards.
              </p>
            </div>

            <a
              href="/#contact"
              className="inline-flex items-center gap-3 font-sans text-sm text-gold hover-underline tracking-wide group"
            >
              Work with us
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Right — pillars */}
          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            className={cn("reveal space-y-4", rightIn && "visible")}
            style={{ transitionDelay: "150ms" }}
          >
            {PILLARS.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className="group flex gap-5 p-6 glass rounded-2xl border border-border hover:border-gold/20 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl glass-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium text-text mb-1.5">
                    {title}
                  </h3>
                  <p className="font-sans text-sm text-text-muted leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Decorative element */}
            <div className="mt-4 glass-gold rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans text-xs tracking-widest uppercase text-gold">
                  Production Capabilities
                </span>
                <span className="font-display text-xl text-gold">100%</span>
              </div>
              <div className="h-px bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
              <p className="mt-3 font-sans text-xs text-text-muted">
                Full in-house capabilities — development through distribution
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
