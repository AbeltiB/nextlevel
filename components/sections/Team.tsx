"use client";

import { TEAM } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { Linkedin, Award } from "lucide-react";

// Avatar initials generator
function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const GRADIENTS = [
    "from-gold/30 to-gold-dark/10",
    "from-rose-500/20 to-pink-600/5",
    "from-sky-400/20 to-blue-600/5",
    "from-violet-500/20 to-purple-600/5",
    "from-emerald-400/20 to-teal-600/5",
    "from-cyan-400/20 to-blue-500/5",
  ];

  return (
    <div
      className={cn(
        "w-full aspect-square rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl font-display font-light text-text-muted/70 mb-5",
        GRADIENTS[index % GRADIENTS.length]
      )}
    >
      {initials}
    </div>
  );
}

export function Team() {
  const { ref: headRef, inView: headIn } = useInView();

  return (
    <section id="team" className="section relative overflow-hidden bg-surface/20">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-[140px] opacity-50"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn("reveal text-center max-w-2xl mx-auto mb-14", headIn && "visible")}
        >
          <div className="inline-flex items-center gap-3 glass-gold rounded-full px-5 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
              Our People
            </span>
          </div>
          <h2
            className="font-display font-light tracking-tight mb-5"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1 }}
          >
            <span className="text-gradient-white">The Minds</span>{" "}
            <span className="text-gradient-gold italic">Behind the Magic</span>
          </h2>
          <p className="font-sans text-text-muted text-base leading-relaxed">
            Notable talents from the African production community, united by an obsession with excellence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member, index }: { member: (typeof TEAM)[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "reveal group relative p-6 rounded-2xl glass border border-border hover:border-gold/20 transition-all duration-500 overflow-hidden",
        inView && "visible"
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(circle at top center, rgba(201,168,76,0.05), transparent 70%)" }}
      />

      <Avatar name={member.name} index={index} />

      <div className="space-y-2 mb-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-xl font-medium text-text">
              {member.name}
            </h3>
            <p className="font-sans text-xs text-gold tracking-wide mt-0.5">
              {member.title}
            </p>
          </div>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg glass flex items-center justify-center text-text-muted hover:text-gold transition-colors duration-200 shrink-0"
          >
            <Linkedin size={13} />
          </a>
        </div>
      </div>

      <p className="font-sans text-sm text-text-muted leading-relaxed mb-4">
        {member.bio}
      </p>

      {member.accolades.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {member.accolades.map((accolade) => (
            <span
              key={accolade}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-gold text-xs font-sans text-gold"
            >
              <Award size={10} />
              {accolade}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
