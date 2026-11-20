"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactTyped } from "react-typed";
import { ArrowDownRight, ArrowUpRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaFacebook } from "react-icons/fa";
import Magnetic from "@/components/motion/Magnetic";
import { PRELOADER_EVENT } from "@/components/motion/Preloader";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { label: "Github", href: "https://github.com/imamhossenbu", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/imam-hossen-ub",
    icon: FaLinkedinIn,
  },
  { label: "Email", href: "mailto:imam62310@gmail.com", icon: Mail },
  {
    label: "Facebook",
    href: "https://www.facebook.com/imamhossainbu",
    icon: FaFacebook,
  },
];

const SPECS = [
  { label: "Role", value: "Full Stack Developer" },
  { label: "Focus", value: "Next.js + TypeScript" },
  { label: "Status", value: "Open to Work", accent: true },
];

function Chars({ text }: { text: string }) {
  return (
    <span className="hero-x-word" aria-hidden="true">
      {text.split("").map((char, index) => (
        <span key={index} className="hero-x-char-wrap">
          <span className="hero-x-char">{char}</span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    let removeListeners = () => {};

    const ctx = gsap.context(() => {
      /* ---------- Intro: plays once the preloader curtain lifts ---------- */
      const intro = gsap.timeline({
        paused: true,
        defaults: { ease: "power4.out" },
      });

      intro
        .fromTo(
          ".hero-x-char",
          { yPercent: 112 },
          { yPercent: 0, duration: 1.15, stagger: 0.045 },
        )
        .fromTo(
          ".hero-x-pill-bg",
          { clipPath: "inset(0% 100% 0% 0% round 999px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 999px)",
            duration: 1.2,
            ease: "power4.inOut",
          },
          0.15,
        )
        .fromTo(
          ".hero-x-pill-img",
          { yPercent: 55, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.3, ease: "power4.out" },
          0.6,
        )
        .fromTo(
          ".hero-x-badge",
          { scale: 0, rotate: -120 },
          { scale: 1, rotate: 0, duration: 1.1, ease: "back.out(1.6)" },
          0.55,
        )
        .fromTo(
          ".hero-x-fade",
          { y: 36, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.09,
            ease: "power3.out",
          },
          0.55,
        );

      const play = () => intro.play();
      const fallback = gsap.delayedCall(4.5, play);

      if (document.documentElement.dataset.preloader === "done") {
        play();
      } else {
        window.addEventListener(PRELOADER_EVENT, play, { once: true });
      }

      /* ---------- Scroll: the two name lines slide apart ---------- */
      const scrub = {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      };

      gsap.to(".hero-x-line-1", { xPercent: -9, ease: "none", scrollTrigger: scrub });
      gsap.to(".hero-x-line-2", { xPercent: 9, ease: "none", scrollTrigger: scrub });
      gsap.to(".hero-x-bottom", {
        y: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...scrub, end: "60% top" },
      });

      /* ---------- Cursor parallax on portrait ---------- */
      const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;

      if (canHover) {
        const imgX = gsap.quickTo(".hero-x-pill-img", "x", { duration: 0.8, ease: "power3.out" });

        const handleMove = (e: MouseEvent) => {
          const rect = hero.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;

          imgX(px * -18);
        };

        hero.addEventListener("mousemove", handleMove);
        removeListeners = () => hero.removeEventListener("mousemove", handleMove);
      }

      return () => {
        fallback.kill();
        window.removeEventListener(PRELOADER_EVENT, play);
      };
    }, hero);

    return () => {
      removeListeners();
      ctx.revert();
    };
  }, []);

  return (
    <section id="home" ref={heroRef} className="hero-x">
      <div className="hero-x-inner">
        <div className="hero-x-top">
          <span className="hero-x-fade hero-x-status">
            <i />
            Open to work
          </span>
          <span className="hero-x-fade">Full Stack Developer</span>
          <span className="hero-x-fade">Barishal, Bangladesh</span>
        </div>

        <h1 className="hero-x-title">
          <span className="sr-only">Imam Hossen — Full Stack Developer</span>

          <span className="hero-x-line hero-x-line-1">
            <Chars text="IMAM" />
            <span className="hero-x-pill">
              <span className="hero-x-pill-bg" />
              <span className="hero-x-pill-clip">
                <span className="hero-x-pill-img">
                  <Image
                    src="/images/imam1.png"
                    alt="Portrait of Imam Hossen"
                    fill
                    preload
                    sizes="(max-width: 768px) 45vw, 340px"
                    className="object-contain object-bottom"
                  />
                </span>
              </span>
            </span>
          </span>

          <span className="hero-x-line hero-x-line-2">
            <Chars text="HOSSEN" />
            <a href="#contact" className="hero-x-badge" aria-label="Contact me">
              <svg viewBox="0 0 100 100" className="hero-x-badge-ring">
                <defs>
                  <path
                    id="hero-badge-circle"
                    d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                  />
                </defs>
                <text>
                  <textPath href="#hero-badge-circle" textLength="232">
                    OPEN TO WORK • AVAILABLE FOR PROJECTS •
                  </textPath>
                </text>
              </svg>
              <span className="hero-x-badge-core">
                <ArrowDownRight />
              </span>
            </a>
          </span>
        </h1>

        <div className="hero-x-bottom">
          <div className="hero-x-copy">
            <h2 className="hero-x-fade hero-x-typed">
              <span>I build </span>
              <span className="hero-typed-text">
                <ReactTyped
                  strings={[
                    "Modern Websites",
                    "Full Stack Apps",
                    "Clean UI Designs",
                    "Scalable Web Solutions",
                  ]}
                  typeSpeed={70}
                  backSpeed={40}
                  backDelay={1200}
                  loop
                />
              </span>
            </h2>

            <p className="hero-x-fade hero-description">
              I create responsive, fast, and user-friendly web applications
              using Next.js, TypeScript, Tailwind CSS, and modern backend
              technologies.
            </p>
          </div>

          <div className="hero-x-actions">
            <div className="hero-x-fade hero-x-cta">
              <Magnetic>
                <a href="#projects" className="hero-x-btn is-primary">
                  <span>View Projects</span>
                  <ArrowUpRight size={18} />
                </a>
              </Magnetic>

              <Magnetic>
                <a href="#contact" className="hero-x-btn">
                  <span>Contact Me</span>
                </a>
              </Magnetic>

              <a
                href="/resume.pdf"
                download="Imam-Hossen-CV.pdf"
                className="hero-x-cv"
              >
                <Download size={16} />
                Download CV
              </a>
            </div>

            <div className="hero-x-fade hero-x-socials">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-link"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        <dl className="hero-x-specs">
          {SPECS.map((spec) => (
            <div key={spec.label} className="hero-x-fade hero-x-spec">
              <dt>{spec.label}</dt>
              <dd className={spec.accent ? "is-accent" : ""}>{spec.value}</dd>
            </div>
          ))}

          <a href="#about" className="hero-x-fade hero-x-scroll">
            Scroll
            <span />
          </a>
        </dl>
      </div>
    </section>
  );
}
