"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHead from "@/components/SectionHead";
import { useReveal } from "@/components/motion/useReveal";

gsap.registerPlugin(ScrollTrigger);

const experience = {
  role: "Full Stack Developer",
  company: "Adsfixter",
  duration: "Feb 2026 - Present",
  type: "Full-Time",
  description:
    "Building scalable e-commerce SaaS solutions and high-converting web applications. Focused on engineering production-ready web products, real-time features, secure backend flows, and optimized frontend architecture.",
  points: [
    {
      title: "E-commerce SaaS platform",
      text: "Developing a modern e-commerce SaaS platform focusing on feature scalability, dashboard metrics, and interactive controls.",
    },
    {
      title: "Digital commerce systems",
      text: "Engineered full-featured digital e-commerce web systems with secure database workflows and dynamic management panels.",
    },
    {
      title: "Corporate websites",
      text: "Designed and optimized core corporate websites for company presence and marketing deployment.",
    },
    {
      title: "Motion & UI architecture",
      text: "Crafted premium fluid animations and reusable UI component architectures using Next.js, Tailwind, and GSAP.",
    },
  ],
  now: "Currently focusing on scaling the SaaS platform, improving system security with proper server architecture, real-time sync systems, and standard automated testing workflows.",
  stats: [
    { label: "Role", value: "Full Stack" },
    { label: "Core", value: "SaaS Product" },
    { label: "Status", value: "Active" },
  ],
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  useReveal(sectionRef);

  // Each card sticks, and sinks back a little as the next one slides over it
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".xp-card");

      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return;

        gsap.to(card.querySelector(".xp-card-inner"), {
          scale: 1 - (cards.length - 1 - index) * 0.035,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top 22%",
            scrub: true,
          },
        });
      });
    }, stack);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="sec">
      <div className="sec-inner">
        <SectionHead
          index="02"
          label="Experience"
          title="My working journey"
          description="A focused overview of my hands-on development work, production SaaS experience, and technical contribution at Adsfixter."
        />

        <div className="xp-head">
          <div>
            <p className="exp-x-when" data-reveal>
              <span>{experience.type}</span>
              {experience.duration}
            </p>
            <h3 className="exp-x-company" data-reveal>
              {experience.company}
            </h3>
            <p className="exp-x-role" data-reveal>
              {experience.role}
            </p>
          </div>

          <div>
            <p className="exp-x-desc" data-reveal>
              {experience.description}
            </p>
            <dl className="exp-x-stats" data-reveal>
              {experience.stats.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div ref={stackRef} className="xp-stack">
          {experience.points.map((point, index) => (
            <article
              key={point.title}
              className="xp-card"
              style={{ top: `${96 + index * 14}px` }}
            >
              <div className={`xp-card-inner tone-${index % 3}`}>
                <span className="xp-card-num">0{index + 1}</span>
                <div>
                  <h4>{point.title}</h4>
                  <p>{point.text}</p>
                </div>
                <span className="xp-card-tag">What I worked on</span>
              </div>
            </article>
          ))}

          <article
            className="xp-card"
            style={{ top: `${96 + experience.points.length * 14}px` }}
          >
            <div className="xp-card-inner is-now">
              <span className="xp-card-num">Now</span>
              <div>
                <h4>What I&apos;m focused on</h4>
                <p>{experience.now}</p>
              </div>
              <span className="xp-card-tag">
                <i />
                In progress
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
