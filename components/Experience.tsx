"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHead from "@/components/SectionHead";
import { useReveal } from "@/components/motion/useReveal";

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
      tags: [
        "Feature scalability",
        "Dashboard metrics",
        "Interactive controls",
      ],
    },
    {
      title: "Digital commerce systems",
      text: "Engineered full-featured digital e-commerce web systems with secure database workflows and dynamic management panels.",
      tags: ["Secure database workflows", "Dynamic management panels"],
    },
    {
      title: "Corporate websites",
      text: "Designed and optimized core corporate websites for company presence and marketing deployment.",
      tags: ["Company presence", "Marketing deployment"],
    },
    {
      title: "Motion & UI architecture",
      text: "Crafted premium fluid animations and reusable UI component architectures using Next.js, Tailwind, and GSAP.",
      tags: ["Next.js", "Tailwind", "GSAP"],
    },
  ],
  nowTags: ["Scaling", "Security", "Real-time sync", "Automated testing"],
  now: "Currently focusing on scaling the SaaS platform, improving system security with proper server architecture, real-time sync systems, and standard automated testing workflows.",
  stats: [
    { label: "Role", value: "Full Stack" },
    { label: "Core", value: "SaaS Product" },
    { label: "Status", value: "Active" },
  ],
};

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  useReveal(sectionRef);

  // A card keeps its soft tint while it is being read; the moment the next
  // card slides over it, it switches to its full, solid colour.
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".xp-card");

      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return;

        ScrollTrigger.create({
          trigger: next,
          start: () =>
            `top ${parseFloat(getComputedStyle(card).top) + card.offsetHeight}px`,
          endTrigger: stack,
          end: "bottom top",
          toggleClass: { targets: card, className: "is-covered" },
          invalidateOnRefresh: true,
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

        <div className="xp-layout">
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

          {/* Layered cards: each sticks a step lower, so every title stays readable */}
          <div ref={stackRef} className="xp-stack">
            {experience.points.map((point, index) => (
              <article
                key={point.title}
                className="xp-card"
                style={{ "--layer": index } as React.CSSProperties}
              >
                <div className={`xp-card-inner tone-${index}`}>
                  <header className="xp-card-head">
                    <span className="xp-card-num">0{index + 1}</span>
                    <h4>{point.title}</h4>
                    <span className="xp-card-tag">What I worked on</span>
                  </header>

                  <div className="xp-card-body">
                    <p>{point.text}</p>
                    <ul>
                      {point.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}

            <article
              className="xp-card"
              style={
                { "--layer": experience.points.length } as React.CSSProperties
              }
            >
              <div className="xp-card-inner tone-4 is-now">
                <header className="xp-card-head">
                  <span className="xp-card-num">Now</span>
                  <h4>What I&apos;m focused on</h4>
                  <span className="xp-card-tag">
                    <i />
                    In progress
                  </span>
                </header>

                <div className="xp-card-body">
                  <p>{experience.now}</p>
                  <ul>
                    {experience.nowTags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
