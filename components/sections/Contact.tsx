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
  const { ref: formRef, inView: formIn } = useInView({ threshold: 0.08 });

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    await new Promise((res) => setTimeout(res, 1600));
    setFormState("success");
  };

  const inputClass =
    "w-full glass rounded-xl px-4 py-3 font-sans text-sm text-text placeholder:text-text-muted/40 border border-border focus:border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold/15 transition-all duration-200 bg-transparent";

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-surface/30 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.04), transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={cn("reveal text-center max-w-2xl mx-auto mb-10 md:mb-14", headIn && "visible")}
        >
          <div className="inline-flex items-center gap-3 glass-gold rounded-full px-5 py-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" />
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold">
              Get In Touch
            </span>
          </div>
          <h2
            className="font-display font-light tracking-tight mb-4"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", lineHeight: 1.1 }}
          >
            <span className="text-gradient-white">Start Your</span>
            <br />
            <span className="text-gradient-gold italic">Next Project</span>
          </h2>
          <p className="font-sans text-text-muted text-sm md:text-base leading-relaxed">
            Tell us about your vision. We&apos;ll tell you how to make it legendary.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact info */}
          <div
            className={cn("reveal lg:col-span-2 space-y-4", headIn && "visible")}
            style={{ transitionDelay: "80ms" }}
          >
            {[
              {
                Icon: Mail,
                label: "Email Us",
                value: COMPANY.email,
                href: `mailto:${COMPANY.email}`,
              },
              {
                Icon: Phone,
                label: "Call Us",
                value: COMPANY.phone,
                href: `tel:${COMPANY.phone}`,
              },
              {
                Icon: MapPin,
                label: "Visit Us",
                value: COMPANY.address,
                href: "#",
              },
            ].map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="group flex items-start gap-4 p-4 rounded-xl glass border border-border hover:border-gold/15 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl glass-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Icon size={15} className="text-gold" />
                </div>
                <div>
                  <div className="font-sans text-[10px] tracking-widest uppercase text-text-muted mb-0.5">
                    {label}
                  </div>
                  <div className="font-sans text-sm text-text group-hover:text-gold transition-colors duration-200">
                    {value}
                  </div>
                </div>
              </a>
            ))}

            {/* Office hours */}
            <div className="p-5 rounded-xl glass-gold border border-gold/12">
              <h4 className="font-display text-lg text-gold mb-3">Studio Hours</h4>
              <div className="space-y-2 font-sans text-sm text-text-muted">
                {[
                  ["Monday – Friday", "8:00 AM – 7:00 PM"],
                  ["Saturday", "9:00 AM – 5:00 PM"],
                  ["Sunday", "By Appointment"],
                ].map(([day, hrs]) => (
                  <div key={day} className="flex justify-between gap-4">
                    <span>{day}</span>
                    <span className="text-text text-right">{hrs}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="pl-4 border-l-2 border-gold/30 hidden md:block">
              <p className="font-display text-lg italic text-text-muted/70 leading-relaxed">
                &ldquo;Every great production begins with a single
                conversation.&rdquo;
              </p>
              <footer className="mt-1.5 font-sans text-xs text-text-muted/40 tracking-widest uppercase">
                — Next Level Media
              </footer>
            </blockquote>
          </div>

          {/* Form */}
          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={cn("reveal lg:col-span-3", formIn && "visible")}
            style={{ transitionDelay: "160ms" }}
          >
            <div className="glass rounded-2xl border border-border p-6 md:p-8 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(201,168,76,0.05), transparent 70%)",
                }}
              />

              {formState === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-14 gap-4">
                  <div className="w-14 h-14 rounded-full glass-gold flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-gold" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-light text-gradient-gold">
                    Message Sent!
                  </h3>
                  <p className="font-sans text-text-muted text-sm max-w-sm leading-relaxed">
                    Thank you for reaching out. Our team will review your
                    project and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormState("idle");
                      setForm({
                        name: "",
                        email: "",
                        company: "",
                        service: "",
                        budget: "",
                        message: "",
                      });
                    }}
                    className="mt-1 font-sans text-sm text-gold hover-underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-sans text-[10px] tracking-widest uppercase text-text-muted">
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
                      <label className="font-sans text-[10px] tracking-widest uppercase text-text-muted">
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
                    <label className="font-sans text-[10px] tracking-widest uppercase text-text-muted">
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-sans text-[10px] tracking-widest uppercase text-text-muted">
                        Service Needed *
                      </label>
                      <select
                        name="service"
                        required
                        value={form.service}
                        onChange={handleChange}
                        className={cn(inputClass, "appearance-none")}
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id} className="bg-surface">
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-sans text-[10px] tracking-widest uppercase text-text-muted">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className={cn(inputClass, "appearance-none")}
                      >
                        <option value="" disabled>
                          Select budget
                        </option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b} className="bg-surface">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-[10px] tracking-widest uppercase text-text-muted">
                      Project Brief *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, goals, timeline, and vision..."
                      className={cn(inputClass, "resize-none")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="group w-full relative overflow-hidden px-7 py-3.5 rounded-full bg-gold text-bg font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_32px_rgba(201,168,76,0.3)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <div className="absolute inset-0 bg-gold-light translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                    <span className="relative z-10 flex items-center gap-2">
                      {formState === "loading" ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          Send Project Brief
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-center font-sans text-xs text-text-muted/40">
                    We typically respond within 24 hours · All inquiries are
                    confidential
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