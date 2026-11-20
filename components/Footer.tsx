"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import GiantName from "@/components/motion/GiantName";
import Magnetic from "@/components/motion/Magnetic";
import { useReveal } from "@/components/motion/useReveal";

const MENU = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/imamhossenbu" },
  { label: "LinkedIn", href: "https://linkedin.com/in/imam-hossen-ub" },
  { label: "Facebook", href: "https://facebook.com/imamhossainbu" },
  { label: "Email", href: "mailto:ihossen22.cse@bu.ac.bd" },
];

const clock = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Dhaka",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [time, setTime] = useState("--:--:--");
  const lenis = useLenis();
  useReveal(footerRef);

  // Live local time, so a visitor knows whether it's a sane hour to call
  useEffect(() => {
    const tick = () => setTime(clock.format(new Date()));
    const frame = requestAnimationFrame(tick);
    const interval = setInterval(tick, 1000);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="foot">
      <div className="foot-inner">
        <div className="foot-top">
          <p className="foot-lead" data-reveal>
            Full Stack Developer — building clean and modern web experiences.
          </p>

          <Magnetic strength={0.3}>
            <button type="button" onClick={toTop} className="foot-top-btn">
              <ArrowUp />
              <span>Back to top</span>
            </button>
          </Magnetic>
        </div>

        <div className="foot-grid">
          <span className="foot-line" data-line />

          <nav className="foot-col" data-reveal aria-label="Footer">
            <p className="foot-label">Menu</p>
            {MENU.map((item) => (
              <a key={item.label} href={item.href} className="foot-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="foot-col" data-reveal>
            <p className="foot-label">Socials</p>
            {SOCIALS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="foot-link"
              >
                {item.label}
                <ArrowUpRight />
              </a>
            ))}
          </div>

          <div className="foot-col" data-reveal>
            <p className="foot-label">Contact</p>
            <a href="mailto:imam62310@gmail.com" className="foot-link">
              imam62310@gmail.com
            </a>
            <a href="tel:+8801624994532" className="foot-link">
              +880 1624-994532
            </a>
            <p className="foot-text">Barishal, Bangladesh</p>
          </div>

          <div className="foot-col" data-reveal>
            <p className="foot-label">Local time</p>
            <p className="foot-clock" suppressHydrationWarning>
              {time}
            </p>
            <p className="foot-text">GMT+6 · Barishal</p>
            <p className="foot-status">
              <i />
              Available for work
            </p>
          </div>
        </div>
      </div>

      <GiantName />

      <p className="foot-copy">
        <span>© {new Date().getFullYear()} Imam Hossen</span>
        <span>All rights reserved</span>
      </p>
    </footer>
  );
}
