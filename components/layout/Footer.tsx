import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
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

// Inline SVG brand icons — lucide-react v1.x removed social icons
function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l16 16M4 20L20 4" strokeLinecap="round" />
      <path d="M20 4h-5l-11 16H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { Icon: InstagramIcon, href: COMPANY.socials.instagram, label: "Instagram" },
  { Icon: FacebookIcon, href: COMPANY.socials.facebook, label: "Facebook" },
  { Icon: YoutubeIcon, href: COMPANY.socials.youtube, label: "YouTube" },
  { Icon: LinkedinIcon, href: COMPANY.socials.linkedin, label: "LinkedIn" },
  { Icon: TwitterIcon, href: COMPANY.socials.twitter, label: "Twitter / X" },
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
