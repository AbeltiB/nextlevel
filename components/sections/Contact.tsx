"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { COMPANY, SERVICES } from "@/lib/data";

type FormState = "idle" | "loading" | "success" | "error";

const BUDGETS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000 – $150,000",
  "$150,000+",
];

export function Contact() {
  const { ref: headRef, inView: headIn } = useInView();
  const { ref: formRef, inView: formIn } = useInView({ threshold: 0.1 });

  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    // Simulated submission — wire up to your API/email handler
    await new Promise((res) => setTimeout(res, 1800));
    setFormState("success");
  };

  const inputClass =
    "w-full glass rounded-xl px-5 py-3.5 font-sans text-sm text-text placeholder:text-text-muted/50 border border-border focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all duration-200 bg-transparent";

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-surface/40 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.05), transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn("reveal text-center max-w-2xl mx-auto mb-16", headIn && "visible")}
        >
          <div className="inline-flex items-center gap-3 glass-gold rounded-full px-5 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
              Get In Touch
            </span>
          </div>
          <h2
            className="font-display font-light tracking-tight mb-5"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1 }}
          >
            <span className="text-gradient-white">Start Your</span>
            <br />
            <span className="text-gradient-gold italic">Next Project</span>
          </h2>
          <p className="font-sans text-text-muted text-lg leading-relaxed">
            Tell us about your vision. We&apos;ll tell you how to make it legendary.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Contact info — left column */}
          <div
            className={cn("reveal lg:col-span-2 space-y-8", headIn && "visible")}
            style={{ transitionDelay: "100ms" }}
          >
            {/* Info cards */}
            {[
              { Icon: Mail, label: "Email Us", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
              { Icon: Phone, label: "Call Us", value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
              { Icon: MapPin, label: "Visit Us", value: COMPANY.address, href: "#" },
            ].map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="group flex items-start gap-5 p-5 rounded-2xl glass border border-border hover:border-gold/20 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl glass-gold flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={16} className="text-gold" />
                </div>
                <div>
                  <div className="font-sans text-xs tracking-widest uppercase text-text-muted mb-1">
                    {label}
                  </div>
                  <div className="font-sans text-sm text-text group-hover:text-gold transition-colors duration-200">
                    {value}
                  </div>
                </div>
              </a>
            ))}

            {/* Office hours */}
            <div className="p-5 rounded-2xl glass-gold border border-gold/15">
              <h4 className="font-display text-lg text-gold mb-3">Studio Hours</h4>
              <div className="space-y-2 font-sans text-sm text-text-muted">
                {[
                  ["Monday – Friday", "8:00 AM – 7:00 PM"],
                  ["Saturday", "9:00 AM – 5:00 PM"],
                  ["Sunday", "By Appointment"],
                ].map(([day, hrs]) => (
                  <div key={day} className="flex justify-between">
                    <span>{day}</span>
                    <span className="text-text">{hrs}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="pl-4 border-l-2 border-gold/40">
              <p className="font-display text-xl italic text-text-muted/80 leading-relaxed">
                &ldquo;Every great production begins with a single conversation.&rdquo;
              </p>
              <footer className="mt-2 font-sans text-xs text-text-muted/50 tracking-widest uppercase">
                — Next Level Media
              </footer>
            </blockquote>
          </div>

          {/* Form — right column */}
          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={cn("reveal lg:col-span-3", formIn && "visible")}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="glass rounded-3xl border border-border p-8 md:p-10 relative overflow-hidden">
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, rgba(201,168,76,0.06), transparent 70%)" }}
              />

              {formState === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-16 gap-5">
                  <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center">
                    <CheckCircle2 size={28} className="text-gold" />
                  </div>
                  <h3 className="font-display text-3xl font-light text-gradient-gold">
                    Message Sent!
                  </h3>
                  <p className="font-sans text-text-muted text-base max-w-sm leading-relaxed">
                    Thank you for reaching out. Our team will review your project and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormState("idle");
                      setForm({ name: "", email: "", company: "", service: "", budget: "", message: "" });
                    }}
                    className="mt-2 font-sans text-sm text-gold hover-underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-sans text-xs tracking-widest uppercase text-text-muted">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-sans text-xs tracking-widest uppercase text-text-muted">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-xs tracking-widest uppercase text-text-muted">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your organization"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="font-sans text-xs tracking-widest uppercase text-text-muted">
                        Service Needed *
                      </label>
                      <select
                        name="service"
                        required
                        value={form.service}
                        onChange={handleChange}
                        className={cn(inputClass, "appearance-none")}
                      >
                        <option value="" disabled>Select a service</option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id} className="bg-surface">
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-sans text-xs tracking-widest uppercase text-text-muted">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className={cn(inputClass, "appearance-none")}
                      >
                        <option value="" disabled>Select budget</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b} className="bg-surface">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-xs tracking-widest uppercase text-text-muted">
                      Project Brief *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, goals, timeline, and anything else that will help us understand your vision..."
                      className={cn(inputClass, "resize-none")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="group w-full relative overflow-hidden px-8 py-4 rounded-full bg-gold text-bg font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.35)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <div className="absolute inset-0 bg-gold-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                    <span className="relative z-10 flex items-center gap-2">
                      {formState === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Send Project Brief
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-center font-sans text-xs text-text-muted/50">
                    We typically respond within 24 hours · All inquiries are confidential
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
