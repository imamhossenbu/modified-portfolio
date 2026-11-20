"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Globe,
  Server,
  Smartphone,
  Sparkles,
} from "lucide-react";
import SectionHead from "@/components/SectionHead";
import ScrollWords from "@/components/motion/ScrollWords";
import { useReveal } from "@/components/motion/useReveal";

gsap.registerPlugin(ScrollTrigger);

/* Oldest first: the timeline is read left to right as a journey. */
const education = [
  {
    degree: "Secondary School Certificate",
    institute: "Chamball High School",
    year: "2017 - 2019",
    start: "2017",
    details:
      "Built early academic foundation and interest in computer technology, logic, and problem solving.",
  },
  {
    degree: "Higher Secondary Certificate",
    institute: "Gachbaria Government College",
    year: "2019 - 2021",
    start: "2019",
    details:
      "Completed higher secondary education with a strong foundation in science, mathematics, and technology.",
  },
  {
    degree: "BSc. in Computer Science & Engineering",
    institute: "University of Barishal",
    year: "2022 - Present",
    start: "2022",
    details:
      "Focused on web development, software engineering, database systems, and modern application development.",
  },
];

const focus = [
  { label: "Clean UI", icon: Sparkles },
  { label: "Projects", icon: Briefcase },
  { label: "Full Stack", icon: Code2 },
];

/* What the work covers, grounded in the stack and projects on this site. */
const services = [
  {
    title: "Web applications",
    text: "Responsive, fast full stack apps with Next.js, React and TypeScript.",
    icon: Globe,
  },
  {
    title: "Backend & APIs",
    text: "REST APIs, real-time features and databases with Node.js, Express and NestJS.",
    icon: Server,
  },
  {
    title: "Mobile apps",
    text: "Cross-platform apps built with Flutter, Dart and Firebase.",
    icon: Smartphone,
  },
  {
    title: "UI & motion",
    text: "Clean interfaces, reusable components and smooth GSAP animation.",
    icon: Sparkles,
  },
];

const facts = [
  { label: "Role", value: "Full Stack Developer" },
  { label: "Based in", value: "Barishal, Bangladesh" },
  { label: "Working at", value: "Adsfixter" },
  { label: "Studying", value: "CSE, University of Barishal" },
  { label: "Focus", value: "Next.js + TypeScript" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const eduRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLSpanElement | null>(null);
  useReveal(sectionRef);

  // The ID card leans toward the pointer
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
    const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
    gsap.set(card, { transformPerspective: 900 });

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      rotateY(((e.clientX - rect.left) / rect.width - 0.5) * 14);
      rotateX(((e.clientY - rect.top) / rect.height - 0.5) * -12);
    };
    const handleLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Desktop: the timeline pins and vertical scroll drives it sideways
  useEffect(() => {
    const edu = eduRef.current;
    const track = trackRef.current;
    if (!edu || !track) return;

    const media = gsap.matchMedia();

    media.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () => Math.max(0, track.scrollWidth - edu.clientWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: edu,
            start: "center center",
            end: () => `+=${distance() + 200}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barRef.current) {
                barRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => tween.kill();
      },
    );

    return () => media.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="sec">
      <div className="sec-inner">
        <SectionHead
          index="01"
          label="About Me"
          title="Building clean, modern and useful web experiences"
        />

        <ScrollWords
          className="about-x-statement"
          highlight={["responsive,", "fast,", "user-friendly", "clean", "scalable"]}
          text="I'm a Full Stack Developer building responsive, fast, and user-friendly web applications — clean code, smooth interfaces, and scalable products from the first pixel to production."
        />

        <div className="about-id">
          {/* Developer ID card */}
          <div className="idcard-wrap" data-reveal>
            <div ref={cardRef} className="idcard">
              <div className="idcard-top">
                <span>Developer ID</span>
                <span>IH — 2026</span>
              </div>

              <div className="idcard-photo">
                <Image
                  src="/images/imam.jpeg"
                  alt="Imam Hossen"
                  fill
                  sizes="(max-width: 768px) 80vw, 380px"
                  className="object-cover"
                />
              </div>

              <h3 className="idcard-name">Imam Hossen</h3>

              <dl className="idcard-facts">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="idcard-code" aria-hidden="true">
                <i />
                <span>OPEN TO WORK</span>
              </div>
            </div>
          </div>

          <div className="about-id-bio">
            <p className="sec-kicker" data-reveal>
              Who I am
            </p>

            <h3 data-reveal>Hi, I&apos;m Imam Hossen</h3>

            <p className="about-id-lead" data-reveal>
              I work full-time at Adsfixter building e-commerce SaaS products,
              while completing my BSc in Computer Science &amp; Engineering at
              the University of Barishal.
            </p>

            <p data-reveal>
              I am a Full Stack Developer focused on creating responsive, fast,
              and user-friendly web applications. I enjoy working with modern
              technologies like Next.js, TypeScript, Tailwind CSS, and backend
              tools to build complete digital solutions.
            </p>

            <p data-reveal>
              My goal is to write clean code, design smooth user interfaces, and
              develop websites that are visually attractive, practical,
              scalable, and easy to use.
            </p>

            <ul className="about-x-focus" data-reveal>
              {focus.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <Icon size={16} />
                  {label}
                </li>
              ))}
            </ul>

            <p className="sec-kicker about-do-kicker" data-reveal>
              What I do
            </p>

            <div className="about-do">
              {services.map(({ title, text, icon: Icon }, index) => (
                <div key={title} className="about-do-item" data-reveal>
                  <span className="row-line" data-line />
                  <span className="about-do-num">0{index + 1}</span>
                  <Icon className="about-do-icon" />
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education: a sideways journey */}
        <div ref={eduRef} className="edu-x">
          <div className="edu-x-head">
            <p className="sec-kicker">Education — Academic Timeline</p>
            <span className="edu-x-hint">
              Keep scrolling
              <ArrowRight size={14} />
            </span>
          </div>

          <div ref={trackRef} className="edu-x-track">
            {education.map((item, index) => (
              <article key={item.degree} className="edu-x-card">
                <div className="edu-x-top">
                  <p className="edu-x-when">
                    <i>0{index + 1}</i>
                    {item.year}
                  </p>
                  <span className="edu-x-year" aria-hidden="true">
                    {item.start}
                  </span>
                </div>

                <h4>{item.degree}</h4>
                <p className="edu-x-inst">{item.institute}</p>
                <p className="edu-x-details">{item.details}</p>
              </article>
            ))}
          </div>

          <div className="edu-x-progress" aria-hidden="true">
            <span ref={barRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
