"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import toast from "react-hot-toast";
import SectionHead from "@/components/SectionHead";
import Magnetic from "@/components/motion/Magnetic";
import { useReveal } from "@/components/motion/useReveal";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzvU1CT9uVu-19r_S6hdW9ALqOlBMehklIT6tzx61Mfy0NynM6hrxDJB8eyDGsm2wd8bQ/exec";

const SOCIALS = [
  { label: "Github", href: "https://github.com/imamhossenbu", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/imam-hossen-ub",
    icon: FaLinkedinIn,
  },
  { label: "Email", href: "mailto:imam62310@gmail.com", icon: Mail },
  {
    label: "Facebook",
    href: "https://facebook.com/imamhossainbu",
    icon: FaFacebook,
  },
];

const FIELDS = [
  { name: "name", label: "Your Name", type: "text" },
  { name: "email", label: "Your Email", type: "email" },
  { name: "subject", label: "Subject", type: "text" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState(false);
  useReveal(sectionRef);

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
    <section id="contact" ref={sectionRef} className="sec">
      <div className="sec-inner">
        <SectionHead
          index="06"
          label="Contact"
          title="Let's build something together"
          description="Have a project idea, website, dashboard, landing page, or full stack app? Send me a message."
        />

        <div className="contact-x">
          <div className="contact-x-info">
            <a
              href="mailto:imam62310@gmail.com"
              className="contact-x-mail"
              data-reveal
            >
              <span>imam62310@gmail.com</span>
              <ArrowUpRight />
            </a>

            <ul className="contact-x-list" data-reveal>
              <li>
                <Phone size={18} />
                <a href="tel:+8801624994532">+880 1624-994532</a>
              </li>
              <li>
                <MapPin size={18} />
                Barishal, Bangladesh
              </li>
            </ul>

            <div className="contact-x-socials" data-reveal>
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="contact-social-link shadow-none"
                  >
                    <Icon size={19} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-x-form">
            {FIELDS.map((field, index) => (
              <label key={field.name} className="field-x" data-reveal>
                <span className="field-x-label">
                  0{index + 1} — {field.label}
                </span>
                <input type={field.type} name={field.name} required />
                <span className="field-x-line" />
              </label>
            ))}

            <label className="field-x" data-reveal>
              <span className="field-x-label">04 — Tell me about your project</span>
              <textarea name="message" rows={4} required />
              <span className="field-x-line" />
            </label>

            <div className="contact-x-submit" data-reveal>
              <button type="submit" className="btn-x is-accent" disabled={loading}>
                <span
                  className="btn-x-label"
                  data-text={loading ? "Sending…" : "Send Message"}
                >
                  <span>{loading ? "Sending…" : "Send Message"}</span>
                </span>
                <span className="btn-x-icon">
                  <Send />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
