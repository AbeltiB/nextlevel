import Link from "next/link";
import { Instagram, Facebook, Youtube, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { COMPANY } from "@/lib/data";

const FOOTER_LINKS = {
  Services: [
    { label: "TV Commercials", href: "/#services" },
    { label: "Music & Video", href: "/#services" },
    { label: "Social Media", href: "/#services" },
    { label: "Film & Movies", href: "/#services" },
    { label: "Live Events", href: "/#services" },
    { label: "Corporate Comms", href: "/#services" },
  ],
  Company: [
    { label: "About Us", href: "/#about" },
    { label: "Our Team", href: "/#team" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Mission & Vision", href: "/#mission" },
    { label: "Partners", href: "/#partners" },
  ],
  Connect: [
    { label: "Start a Project", href: "/#contact" },
    { label: "hello@nextlevelmedia.et", href: `mailto:${COMPANY.email}` },
  ],
};

const SOCIAL_LINKS = [
  { Icon: Instagram, href: COMPANY.socials.instagram, label: "Instagram" },
  { Icon: Facebook, href: COMPANY.socials.facebook, label: "Facebook" },
  { Icon: Youtube, href: COMPANY.socials.youtube, label: "YouTube" },
  { Icon: Linkedin, href: COMPANY.socials.linkedin, label: "LinkedIn" },
  { Icon: Twitter, href: COMPANY.socials.twitter, label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="relative bg-surface border-t border-border overflow-hidden">
      {/* Top gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gold/3 rounded-full blur-[80px] pointer-events-none" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg glass-gold flex items-center justify-center">
                <span className="font-display font-bold text-gold text-xl leading-none">N</span>
              </div>
              <div>
                <div className="font-display font-semibold text-text text-base leading-none">Next Level</div>
                <div className="font-sans text-[10px] tracking-[0.15em] uppercase text-text-muted mt-0.5">
                  Media Events & Communication
                </div>
              </div>
            </div>

            <p className="font-sans text-text-muted text-sm leading-relaxed max-w-xs">
              Africa&apos;s premier integrated media production company. Crafting stories that move people, build brands, and define culture.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { Icon: Mail, text: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { Icon: Phone, text: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                { Icon: MapPin, text: COMPANY.address, href: "#" },
              ].map(({ Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-center gap-3 text-text-muted hover:text-gold transition-colors duration-200 group"
                >
                  <Icon size={14} className="text-gold/60 group-hover:text-gold transition-colors shrink-0" />
                  <span className="font-sans text-sm">{text}</span>
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/30 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="space-y-4">
              <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-gold font-medium">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="font-sans text-sm text-text-muted hover:text-text hover-underline transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-text-muted/50">
            © {new Date().getFullYear()} Next Level Media Events and Communication PLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <Link
                key={item}
                href="#"
                className="font-sans text-xs text-text-muted/50 hover:text-text-muted transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
