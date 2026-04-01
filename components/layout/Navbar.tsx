"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#team", label: "Team" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href ||
    (href === "/portfolio" && pathname.startsWith("/portfolio"));

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-dark border-b border-border py-3"
            : "bg-transparent py-4 md:py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg glass-gold flex items-center justify-center">
                  <span className="font-display font-bold text-gold text-base leading-none">
                    N
                  </span>
                </div>
                <div className="absolute -inset-0.5 rounded-lg bg-gold/15 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-semibold text-text text-sm tracking-wide leading-none">
                  Next Level
                </span>
                <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-text-muted leading-none mt-0.5">
                  Media & Events
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative px-3.5 py-2 font-sans text-sm tracking-wide transition-colors duration-200",
                    isActive(href)
                      ? "text-gold"
                      : "text-text-muted hover:text-text"
                  )}
                >
                  {label}
                  {isActive(href) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/#contact"
                className="hidden md:flex group relative overflow-hidden px-5 py-2 rounded-full glass-gold font-sans text-sm text-gold tracking-wide transition-all duration-300 hover:glow-gold"
              >
                <span className="relative z-10">Start a Project</span>
                <div className="absolute inset-0 bg-gold/8 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>

              <button
                className="md:hidden glass rounded-lg p-2 text-text-muted hover:text-text transition-colors"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-bg/85 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-72 max-w-[85vw] glass-dark border-l border-border transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6">
            <nav className="flex flex-col flex-1">
              {NAV_LINKS.map(({ href, label }, i) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "py-4 font-display text-2xl font-light tracking-wide border-b border-border transition-colors duration-200",
                    isActive(href) ? "text-gold" : "text-text-muted hover:text-text"
                  )}
                  style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <Link
              href="/#contact"
              className="mt-6 text-center py-3.5 rounded-full glass-gold font-sans text-sm text-gold tracking-wide"
            >
              Start a Project
            </Link>

            <p className="mt-5 text-center font-sans text-xs text-text-muted/40 tracking-widest uppercase">
              Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
      </div>
    </>
  );
}