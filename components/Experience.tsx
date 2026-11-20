"use client";

import { useRef } from "react";
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
  useReveal(sectionRef);

  return (
    <section id="experience" ref={sectionRef} className="sec">
      <div className="sec-inner">
        <SectionHead
          index="02"
          label="Experience"
          title="My working journey"
          description="A focused overview of my hands-on development work, production SaaS experience, and technical contribution at Adsfixter."
        />

        <div className="exp-x">
          <aside className="exp-x-aside">
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
          </aside>

          <div className="exp-x-list">
            <p className="sec-kicker" data-reveal>
              What I worked on
            </p>

            {experience.points.map((point, index) => (
              <div key={point} className="exp-x-point" data-reveal>
                <span className="row-line" data-line />
                <span className="exp-x-num">0{index + 1}</span>
                <p>{point}</p>
              </div>
            ))}

            <p className="exp-x-now" data-reveal>
              <span className="row-line" data-line />
              <strong>Now —</strong> Currently focusing on scaling the SaaS
              platform, improving system security with proper server
              architecture, real-time sync systems, and standard automated
              testing workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
