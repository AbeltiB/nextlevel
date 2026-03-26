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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-dark border-b border-border py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                {/* Logo mark */}
                <div className="w-9 h-9 rounded-lg glass-gold flex items-center justify-center">
                  <span className="font-display font-bold text-gold text-lg leading-none">
                    N
                  </span>
                </div>
                <div className="absolute -inset-0.5 rounded-lg bg-gold/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-semibold text-text text-base tracking-wide leading-none">
                  Next Level
                </span>
                <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-text-muted leading-none mt-0.5">
                  Media & Events
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative px-4 py-2 font-sans text-sm tracking-wide transition-colors duration-200",
                    pathname === href || (href === "/portfolio" && pathname.startsWith("/portfolio"))
                      ? "text-gold"
                      : "text-text-muted hover:text-text"
                  )}
                >
                  {label}
                  {(pathname === href || (href === "/portfolio" && pathname.startsWith("/portfolio"))) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/#contact"
                className="group relative overflow-hidden px-6 py-2.5 rounded-full glass-gold font-sans text-sm text-gold tracking-wide transition-all duration-300 hover:glow-gold"
              >
                <span className="relative z-10">Start a Project</span>
                <div className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden glass rounded-lg p-2 text-text-muted hover:text-text transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
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
          className="absolute inset-0 bg-bg/80 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />

        {/* Drawer */}
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-72 glass-dark border-l border-border transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6">
            <nav className="flex flex-col gap-1 flex-1">
              {NAV_LINKS.map(({ href, label }, i) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "py-3 font-display text-2xl font-light tracking-wide border-b border-border transition-colors duration-200",
                    pathname === href ? "text-gold" : "text-text-muted hover:text-text"
                  )}
                  style={{ transitionDelay: `${i * 50}ms` }}
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

            <div className="mt-6 text-center">
              <p className="font-sans text-xs text-text-muted/50 tracking-widest uppercase">
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
