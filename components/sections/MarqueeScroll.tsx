import { CLIENTS, PORTFOLIO } from "@/lib/data";

interface MarqueeScrollProps {
  variant?: "clients" | "projects";
}

export function MarqueeScroll({ variant = "clients" }: MarqueeScrollProps) {
  const items =
    variant === "clients"
      ? CLIENTS
      : PORTFOLIO.map((p) => `${p.title} — ${p.client}`);

  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative py-6 overflow-hidden border-y border-border bg-surface/50">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--color-bg), transparent)" }}
      />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--color-bg), transparent)" }}
      />

      <div className={variant === "clients" ? "animate-marquee flex whitespace-nowrap" : "animate-marquee-reverse flex whitespace-nowrap"}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-6 font-sans text-sm text-text-muted/60 tracking-wide shrink-0"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: variant === "clients" ? "rgba(201,168,76,0.5)" : "rgba(255,59,92,0.5)" }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
