"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Database,
  Server,
  Wrench,
  Brain,
  TestTube2,
  Zap,
} from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiRedis,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiPrisma,
  SiSonarqubecloud,
  SiNestjs,
  SiGithubactions,
  SiFramer,
  SiGreensock,
  SiWordpress,
  SiJest,
  SiDocker,
  SiTestinglibrary,
  SiPython,
  SiOpenjdk,
  SiPhp,
  SiC,
  SiCplusplus,
  SiPandas,
  SiGooglecolab,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
      { name: "GSAP", icon: SiGreensock },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "NestJS", icon: SiNestjs },
      { name: "Socket.io", icon: Zap },
      { name: "REST API", icon: Server },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    title: "Programming Languages",
    icon: Code2,
    skills: [
      { name: "Python", icon: SiPython },
      { name: "Java", icon: SiOpenjdk },
      { name: "PHP", icon: SiPhp },
      { name: "C", icon: SiC },
      { name: "C++", icon: SiCplusplus },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
    ],
  },
  {
    title: "Database, Cache & ORM",
    icon: Database,
    skills: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "Redis", icon: SiRedis },
      { name: "Prisma", icon: SiPrisma },
    ],
  },
  {
    title: "Data & AI Tools",
    icon: Brain,
    skills: [
      { name: "Python", icon: SiPython },
      { name: "Pandas", icon: SiPandas },
      { name: "Google Colab", icon: SiGooglecolab },
      { name: "Generative AI", icon: Brain },
    ],
  },
  {
    title: "Testing & Quality",
    icon: TestTube2,
    skills: [
      { name: "Jest", icon: SiJest },
      { name: "React Testing Library", icon: SiTestinglibrary },
      { name: "SonarQube", icon: SiSonarqubecloud },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Wrench,
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "Docker", icon: SiDocker },
      { name: "Vercel", icon: SiVercel },
      { name: "Figma", icon: SiFigma },
    ],
  },
  {
    title: "CMS",
    icon: Brain,
    skills: [{ name: "WordPress", icon: SiWordpress }],
  },
];

const marqueeSkills = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Framer Motion",
  "GSAP",
  "Node.js",
  "Express.js",
  "NestJS",
  "REST API",
  "Python",
  "Java",
  "PHP",
  "C",
  "C++",
  "Prisma",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Firebase",
  "Pandas",
  "Google Colab",
  "Jest",
  "React Testing Library",
  "SonarQube",
  "Docker",
  "Git",
  "GitHub",
  "GitHub Actions",
  "Vercel",
  "Figma",
  "WordPress",
  "Generative AI",
];

const reversedMarqueeSkills = [...marqueeSkills].reverse();

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-animate",
        {
          y: 60,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <div className="skills-animate mb-14 text-center">
          <p className="mono-text mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
            My Skills
          </p>

          <h2 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl">
            Technologies I work with
          </h2>

          <p className="hero-description mx-auto mt-5 max-w-2xl leading-8">
            I use modern frontend, backend, programming, database, data, and
            deployment tools to build clean, scalable, and production-ready web
            applications.
          </p>
        </div>

        <div className="skills-animate mb-12 space-y-5">
          <div className="skills-marquee">
            <div className="skills-marquee-track">
              {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
                <span
                  key={`${skill}-top-${index}`}
                  className="skills-marquee-item"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="skills-marquee reverse">
            <div className="skills-marquee-track">
              {[...reversedMarqueeSkills, ...reversedMarqueeSkills].map(
                (skill, index) => (
                  <span
                    key={`${skill}-bottom-${index}`}
                    className="skills-marquee-item"
                  >
                    {skill}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((category, index) => {
            const CategoryIcon = category.icon;

            return (
              <div key={index} className="skills-animate skill-category-card">
                <div className="mb-6 flex items-center gap-3">
                  <div className="skill-category-icon">
                    <CategoryIcon size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-[var(--foreground)]">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => {
                    const SkillIcon = skill.icon;

                    return (
                      <div key={skillIndex} className="skill-item">
                        <div className="flex items-center gap-3">
                          <SkillIcon size={20} />
                          <span>{skill.name}</span>
                        </div>

                        <span className="skill-dot" />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
