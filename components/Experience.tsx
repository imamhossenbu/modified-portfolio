"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Code2,
  Layers,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experience = {
  role: "Full Stack Developer",
  company: "Adsfixter",
  duration: "Feb 2026 - Present",
  type: "Full-Time",
  description:
    "Building scalable e-commerce SaaS solutions and high-converting web applications. Focused on engineering production-ready web products, real-time features, secure backend flows, and optimized frontend architecture.",
  points: [
    "Developing a modern e-commerce SaaS platform focusing on feature scalability, dashboard metrics, and interactive controls.",
    "Engineered full-featured digital e-commerce web systems with secure database workflows and dynamic management panels.",
    "Designed and optimized core corporate websites for company presence and marketing deployment.",
    "Crafted premium fluid animations and reusable UI component architectures using Next.js, Tailwind, and GSAP.",
  ],
  stats: [
    { label: "Role", value: "Full Stack" },
    { label: "Core", value: "SaaS Product" },
    { label: "Status", value: "Active" },
  ],
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experience-animate",
        {
          y: 70,
          opacity: 0,
          filter: "blur(10px)",
        },
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

      gsap.to(".experience-floating-icon", {
        y: -14,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.25,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    gsap.to(cardRef.current, {
      "--mouse-x": `${x}px`,
      "--mouse-y": `${y}px`,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <div className="experience-animate mb-14 text-center">
          <p className="mono-text mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
            Experience
          </p>

          <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            My working journey
          </h2>

          <p className="hero-description mx-auto mt-5 max-w-2xl leading-8">
            A focused overview of my hands-on development work, production SaaS
            experience, and technical contribution at Adsfixter.
          </p>
        </div>

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="experience-animate experience-modern-card !shadow-none border border-[var(--panel-border)]"
        >
          {/* Subtle background glow effects without harsh shadows */}
          <div className="experience-glow-orb experience-orb-one opacity-40" />
          <div className="experience-glow-orb experience-orb-two opacity-40" />

          <div className="experience-floating-icon experience-float-one">
            <Code2 size={22} />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative z-10">
              <div className="mb-6 inline-flex rounded-3xl bg-[var(--accent-dim)] p-5 text-[var(--accent)]">
                <BriefcaseBusiness size={34} />
              </div>

              <p className="mono-text mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                {experience.type}
              </p>

              <h3 className="mb-3 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                {experience.role}
              </h3>

              <p className="mb-5 text-lg font-semibold text-[var(--accent)]">
                {experience.company}
              </p>

              <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[var(--accent-dim)] px-4 py-2 text-sm font-bold text-[var(--accent)]">
                <CalendarDays size={16} />
                {experience.duration}
              </div>

              <p className="hero-description max-w-xl leading-8">
                {experience.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {experience.stats.map((item) => (
                  <div
                    key={item.label}
                    className="experience-stat-card !shadow-none border border-[var(--panel-border)]"
                  >
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-[var(--accent-dim)] p-3 text-[var(--accent)]">
                  <Layers size={24} />
                </div>

                <h4 className="text-2xl font-bold text-[var(--foreground)]">
                  What I worked on
                </h4>
              </div>

              <div className="space-y-4">
                {experience.points.map((point) => (
                  <div key={point} className="experience-modern-point">
                    <CheckCircle2 size={19} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-[var(--accent-dim)] bg-[var(--panel-soft)] p-5 !shadow-none backdrop-blur-md">
                <p className="experience-description text-sm leading-7 text-[var(--foreground-muted)]">
                  Currently focusing on scaling the SaaS platform, improving
                  system security with proper server architecture, real-time
                  sync systems, and standard automated testing workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
