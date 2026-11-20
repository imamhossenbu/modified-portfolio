"use client";

import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import toast from "react-hot-toast";
import SectionHead from "@/components/SectionHead";
import Magnetic from "@/components/motion/Magnetic";
import { useReveal } from "@/components/motion/useReveal";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzvU1CT9uVu-19r_S6hdW9ALqOlBMehklIT6tzx61Mfy0NynM6hrxDJB8eyDGsm2wd8bQ/exec";

const EMAIL = "imam62310@gmail.com";

const SOCIALS = [
  { label: "Github", href: "https://github.com/imamhossenbu", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/imam-hossen-ub",
    icon: FaLinkedinIn,
  },
  { label: "Email", href: `mailto:${EMAIL}`, icon: Mail },
  {
    label: "Facebook",
    href: "https://facebook.com/imamhossainbu",
    icon: FaFacebook,
  },
];

/* What the visitor needs: picking one fills the form's subject. */
const TOPICS = [
  "a website",
  "a full stack app",
  "a dashboard",
  "a landing page",
  "a mobile app",
  "something else",
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [copied, setCopied] = useState(false);
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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success("Email copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy. Please copy it manually.");
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

        {/* The form is written as a letter: fill in the blanks and send */}
        <form onSubmit={handleSubmit} className="letter">
          <input
            type="hidden"
            name="subject"
            value={`Project enquiry: ${topic}`}
          />

          <p className="letter-line" data-reveal>
            Hello Imam, my name is{" "}
            <label className="letter-blank">
              <span className="sr-only">Your name</span>
              <input type="text" name="name" placeholder="your name" required />
            </label>{" "}
            and I&apos;m looking for help with
          </p>

          <div
            className="letter-topics"
            data-reveal
            role="radiogroup"
            aria-label="Project type"
          >
            {TOPICS.map((item) => (
              <button
                key={item}
                type="button"
                role="radio"
                aria-checked={topic === item}
                onClick={() => setTopic(item)}
                className={`letter-topic ${topic === item ? "is-active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>

          <p className="letter-line" data-reveal>
            You can reach me at{" "}
            <label className="letter-blank is-wide">
              <span className="sr-only">Your email</span>
              <input
                type="email"
                name="email"
                placeholder="your email address"
                required
              />
            </label>
          </p>

          <p className="letter-line" data-reveal>
            Here&apos;s a little more about it:
          </p>

          <label className="letter-message" data-reveal>
            <span className="sr-only">Project details</span>
            <textarea
              name="message"
              rows={3}
              placeholder="Tell me about your project..."
              required
            />
          </label>

          <div className="letter-foot" data-reveal>
            <button
              type="submit"
              className="btn-x is-accent"
              disabled={loading}
            >
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

            <span className="letter-note">Or reach me directly below.</span>
          </div>
        </form>

        {/* Prefer to reach out directly? */}
        <div className="reach">
          <div className="reach-item is-mail" data-reveal>
            <span className="row-line" data-line />
            <p className="reach-label">Email</p>
            <a href={`mailto:${EMAIL}`} className="reach-value">
              {EMAIL}
              <ArrowUpRight />
            </a>
            <button type="button" onClick={copyEmail} className="reach-copy">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="reach-item" data-reveal>
            <span className="row-line" data-line />
            <p className="reach-label">
              <Phone size={13} />
              Phone
            </p>
            <a href="tel:+8801624994532" className="reach-value">
              +880 1624-994532
            </a>
          </div>

          <div className="reach-item" data-reveal>
            <span className="row-line" data-line />
            <p className="reach-label">
              <MapPin size={13} />
              Location
            </p>
            <p className="reach-value">Barishal, Bangladesh</p>
          </div>

          <div className="reach-item" data-reveal>
            <span className="row-line" data-line />
            <p className="reach-label">Socials</p>
            <div className="reach-socials">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="contact-social-link shadow-none"
                  >
                    <Icon size={18} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
