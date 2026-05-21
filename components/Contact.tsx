"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail, MapPin, Send, Phone } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);

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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <div className="contact-animate mb-14 text-center">
          <p className="mono-text mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#ff7474]">
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
                <Mail size={20} />
                <span>ihossen22.cse@bu.ac.bd</span>
              </div>

              <div className="contact-info-item">
                <Phone size={20} />
                <span>+880 1624-994532</span>
              </div>

              <div className="contact-info-item">
                <MapPin size={20} />
                <span>Bangladesh</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {/* Github */}
              <a
                href="https://github.com/imamhossenbu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
                className="contact-social-link"
              >
                <FaGithub size={19} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/imam-hossen-ub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="contact-social-link"
              >
                <FaLinkedinIn size={19} />
              </a>

              {/* Email */}
              <a
                href="mailto:ihossen22.cse@bu.ac.bd"
                aria-label="Email"
                className="contact-social-link"
              >
                <Mail size={19} />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/imamhossainbu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="contact-social-link"
              >
                <FaFacebook size={19} />
              </a>
            </div>
          </div>

          <form className="contact-animate contact-form-card">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name"
                className="contact-input"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="contact-input"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="contact-input"
            />

            <textarea
              placeholder="Tell me about your project..."
              rows={6}
              className="contact-input resize-none"
            />

            <button type="submit" className="contact-submit-btn">
              Send Message
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
