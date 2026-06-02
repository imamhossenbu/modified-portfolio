"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Code2, Briefcase, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
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

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-animate",
        {
          y: 60,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        lineRef.current,
        {
          height: "0%",
        },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".education-timeline",
            start: "top 75%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".timeline-item",
        {
          x: 40,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.22,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".education-timeline",
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <div className="about-animate mb-14 text-center">
          <p className="mono-text mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-main">
            About Me
          </p>

          <h2 className="text-3xl font-bold text-(--foreground) md:text-4xl">
            Building clean, modern and useful web experiences
          </h2>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="about-animate soft-card self-start rounded-[2rem] p-7 md:p-9">
            <div className="mb-6 inline-flex rounded-2xl bg-blue-main/15 p-4 text-blue-main">
              <Code2 size={28} />
            </div>

            <h3 className="mb-5 text-2xl font-bold text-[var(--foreground)]">
              Hi, I&apos;m Imam Hossen
            </h3>

            <p className="hero-description mb-5 leading-8">
              I am a Full Stack Developer focused on creating responsive, fast,
              and user-friendly web applications. I enjoy working with modern
              technologies like Next.js, TypeScript, Tailwind CSS, and backend
              tools to build complete digital solutions.
            </p>

            <p className="hero-description leading-8">
              My goal is to write clean code, design smooth user interfaces,
              and develop websites that are visually attractive, practical,
              scalable, and easy to use.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="about-mini-card">
                <Sparkles size={22} />
                <strong>Clean UI</strong>
              </div>

              <div className="about-mini-card">
                <Briefcase size={22} />
                <strong>Projects</strong>
              </div>

              <div className="about-mini-card">
                <Code2 size={22} />
                <strong>Full Stack</strong>
              </div>
            </div>
          </div>

          <div className="about-animate soft-card rounded-[2rem] p-7 md:p-9">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-blue-main/15 p-4 text-blue-main">
                <GraduationCap size={28} />
              </div>

              <div>
                <p className="mono-text text-sm font-semibold text-blue-main">
                  Education
                </p>

                <h3 className="text-2xl font-bold text-[var(--foreground)]">
                  Academic Timeline
                </h3>
              </div>
            </div>

            <div className="education-timeline">
              <div className="timeline-line">
                <div ref={lineRef} className="timeline-line-fill" />
              </div>

              <div className="space-y-7">
                {education.map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-dot">
                      <GraduationCap size={17} />
                    </div>

                    <div className="timeline-card">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                        <h4 className="text-lg font-bold text-[var(--foreground)]">
                          {item.degree}
                        </h4>

                        <span className="timeline-year">{item.year}</span>
                      </div>

                      <p className="mb-2 font-semibold text-[var(--foreground)]">
                        {item.institute}
                      </p>

                      <p className="hero-description text-sm leading-7">
                        {item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}