"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Send, Phone } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState(false);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzvU1CT9uVu-19r_S6hdW9ALqOlBMehklIT6tzx61Mfy0NynM6hrxDJB8eyDGsm2wd8bQ/exec";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-animate",
        { y: 70, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      toast.success("Message sent successfully!");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <div className="contact-animate mb-14 text-center">
          <p className="mono-text mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
            Contact
          </p>

          <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">
            Let&apos;s build something together
          </h2>

          <p className="hero-description mx-auto mt-5 max-w-2xl leading-8">
            Have a project idea, website, dashboard, landing page, or full stack
            app? Send me a message.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="contact-animate contact-info-card">
            <h3 className="mb-5 text-2xl font-bold text-[var(--foreground)]">
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="contact-info-item">
                <Mail size={20} className="text-[var(--accent)]" />
                <span className="text-[var(--foreground)]">
                  imam62310@gmail.com
                </span>
              </div>

              <div className="contact-info-item">
                <Phone size={20} className="text-[var(--accent)]" />
                <span className="text-[var(--foreground)]">
                  +880 1624-994532
                </span>
              </div>

              <div className="contact-info-item">
                <MapPin size={20} className="text-[var(--accent)]" />
                <span className="text-[var(--foreground)]">Barishal, Bangladesh</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://github.com/imamhossenbu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
                className="contact-social-link shadow-none"
              >
                <FaGithub size={19} />
              </a>

              <a
                href="https://linkedin.com/in/imam-hossen-ub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="contact-social-link shadow-none"
              >
                <FaLinkedinIn size={19} />
              </a>

              <a
                href="mailto:imam62310@gmail.com"
                aria-label="Email"
                className="contact-social-link shadow-none"
              >
                <Mail size={19} />
              </a>

              <a
                href="https://facebook.com/imamhossainbu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="contact-social-link shadow-none"
              >
                <FaFacebook size={19} />
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="contact-animate contact-form-card"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="contact-input"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="contact-input"
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="contact-input"
              required
            />

            <textarea
              name="message"
              placeholder="Tell me about your project..."
              rows={6}
              className="contact-input resize-none"
              required
            />

            <button
              type="submit"
              className="contact-submit-btn shadow-none"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
