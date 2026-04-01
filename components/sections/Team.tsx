"use client";

import { TEAM } from "@/lib/data";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { Award } from "lucide-react";

function LinkedinIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const GRADIENTS = [
    "from-gold/25 to-gold-dark/5",
    "from-rose-500/15 to-pink-600/5",
    "from-sky-400/15 to-blue-600/5",
    "from-violet-500/15 to-purple-600/5",
    "from-emerald-400/15 to-teal-600/5",
    "from-cyan-400/15 to-blue-500/5",
  ];

  return (
    <div
      className={cn(
        "w-full aspect-square rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl font-display font-light text-text-muted/60 mb-4",
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
    <section id="team" className="section relative overflow-hidden bg-surface/15">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-0 w-[350px] h-[350px] rounded-full blur-[130px] opacity-40"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn("reveal text-center max-w-2xl mx-auto mb-10 md:mb-14", headIn && "visible")}
        >
          <div className="inline-flex items-center gap-3 glass-gold rounded-full px-5 py-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
              Our People
            </span>
          </div>
          <h2
            className="font-display font-light tracking-tight mb-4"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", lineHeight: 1.1 }}
          >
            <span className="text-gradient-white">The Minds</span>{" "}
            <span className="text-gradient-gold italic">Behind the Magic</span>
          </h2>
          <p className="font-sans text-text-muted text-sm md:text-base leading-relaxed">
            Notable talents from the African production community, united by an
            obsession with excellence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {TEAM.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({
  member,
  index,
}: {
  member: (typeof TEAM)[0];
  index: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.08 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "reveal group relative p-5 rounded-2xl glass border border-border hover:border-gold/15 transition-all duration-400 overflow-hidden",
        inView && "visible"
      )}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(circle at top center, rgba(201,168,76,0.04), transparent 70%)" }}
      />

      <Avatar name={member.name} index={index} />

      <div className="space-y-1.5 mb-3.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-medium text-text">
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
            aria-label={`${member.name} on LinkedIn`}
          >
            <LinkedinIcon size={13} />
          </a>
        </div>
      </div>

      <p className="font-sans text-sm text-text-muted leading-relaxed mb-3.5">
        {member.bio}
      </p>

      {member.accolades.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {member.accolades.map((accolade) => (
            <span
              key={accolade}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full glass-gold text-[10px] font-sans text-gold"
            >
              <Award size={9} />
              {accolade}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}