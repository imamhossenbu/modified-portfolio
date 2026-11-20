"use client";

import { useRef } from "react";
import { Briefcase, Code2, Sparkles } from "lucide-react";
import SectionHead from "@/components/SectionHead";
import ScrollWords from "@/components/motion/ScrollWords";
import { useReveal } from "@/components/motion/useReveal";

const education = [
  {
    degree: "BSc. in Computer Science & Engineering",
    institute: "University of Barishal",
    year: "2022 - Present",
    details:
      "Focused on web development, software engineering, database systems, and modern application development.",
  },
  {
    degree: "Higher Secondary Certificate",
    institute: "Gachbaria Government College",
    year: "2019 - 2021",
    details:
      "Completed higher secondary education with a strong foundation in science, mathematics, and technology.",
  },
  {
    degree: "Secondary School Certificate",
    institute: "Chamball High School",
    year: "2017 - 2019",
    details:
      "Built early academic foundation and interest in computer technology, logic, and problem solving.",
  },
];

const focus = [
  { label: "Clean UI", icon: Sparkles },
  { label: "Projects", icon: Briefcase },
  { label: "Full Stack", icon: Code2 },
];

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useReveal(sectionRef);

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

        <div className="about-x">
          <div className="about-x-bio">
            <h3 data-reveal>Hi, I&apos;m Imam Hossen</h3>

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
          </div>

          <div className="about-x-edu">
            <p className="sec-kicker" data-reveal>
              Education — Academic Timeline
            </p>

            {education.map((item, index) => (
              <article key={item.degree} className="edu-row" data-reveal>
                <span className="row-line" data-line />
                <span className="edu-year">{item.year}</span>

                <div>
                  <h4>{item.degree}</h4>
                  <p className="edu-institute">{item.institute}</p>
                  <p className="edu-details">{item.details}</p>
                </div>

                <span className="edu-num">0{index + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
