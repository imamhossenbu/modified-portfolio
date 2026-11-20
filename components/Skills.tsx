"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHead from "@/components/SectionHead";
import { useReveal } from "@/components/motion/useReveal";
import {
  Code2,
  Database,
  Server,
  Wrench,
  Brain,
  TestTube2,
  Zap,
  Smartphone,
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
  SiFlutter,
  SiDart,
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
    title: "Mobile Development",
    icon: Smartphone,
    skills: [
      { name: "Flutter", icon: SiFlutter },
      { name: "Dart", icon: SiDart },
      { name: "Firebase", icon: SiFirebase },
      { name: "REST API", icon: Server },
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
      { name: "Dart", icon: SiDart },
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

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  useReveal(sectionRef);

  const current = skillCategories[active];

  // Re-deal the chips every time the category changes
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-x-chip",
        { y: 28, opacity: 0, rotate: -3 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.55,
          stagger: 0.045,
          ease: "back.out(1.6)",
          overwrite: true,
        },
      );
      gsap.fromTo(
        ".skills-x-ghost",
        { xPercent: 8, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      );
    }, panel);

    return () => ctx.revert();
  }, [active]);

  return (
    <section id="skills" ref={sectionRef} className="sec">
      <div className="sec-inner">
        <SectionHead
          index="03"
          label="My Skills"
          title="Technologies I work with"
          description="I use modern frontend, backend, programming, database, data, and deployment tools to build clean, scalable, and production-ready web applications."
        />

        <div className="skills-x">
          <ul className="skills-x-cats" data-reveal>
            {skillCategories.map((category, index) => (
              <li key={category.title}>
                <button
                  type="button"
                  className={`skills-x-cat ${index === active ? "is-active" : ""}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={index === active}
                >
                  <span className="skills-x-cat-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="skills-x-cat-name">{category.title}</span>
                  <span className="skills-x-cat-count">
                    {category.skills.length}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="skills-x-panel" ref={panelRef} data-reveal>
            <span className="skills-x-ghost" aria-hidden="true">
              {String(active + 1).padStart(2, "0")}
            </span>

            <p className="sec-kicker">{current.title}</p>

            <div className="skills-x-grid">
              {current.skills.map((skill) => {
                const SkillIcon = skill.icon;

                return (
                  <span key={skill.name} className="skills-x-chip">
                    <SkillIcon size={22} />
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
