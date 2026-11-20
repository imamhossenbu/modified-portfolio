"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  Layers,
  Network,
  HardDrive,
  KeyRound,
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
  SiMaterialdesign,
  SiAndroid,
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
      { name: "Provider", icon: Layers },
      { name: "Material 3", icon: SiMaterialdesign },
      { name: "MVVM", icon: Network },
      { name: "SharedPreferences", icon: HardDrive },
      { name: "Secure Storage", icon: KeyRound },
      { name: "Android", icon: SiAndroid },
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

/* Two-letter "element symbols" for the periodic table of the stack. */
const SYMBOLS: Record<string, string> = {
  "Next.js": "Nx",
  React: "Re",
  TypeScript: "Ts",
  JavaScript: "Js",
  "Tailwind CSS": "Tw",
  "Framer Motion": "Fm",
  GSAP: "Gs",
  Flutter: "Fl",
  Dart: "Dt",
  Provider: "Pv",
  "Material 3": "M3",
  MVVM: "Mv",
  SharedPreferences: "Sp",
  "Secure Storage": "Ss",
  Android: "An",
  Firebase: "Fb",
  "REST API": "Api",
  "Node.js": "Nd",
  "Express.js": "Ex",
  NestJS: "Ns",
  "Socket.io": "Io",
  Python: "Py",
  Java: "Jv",
  PHP: "Ph",
  C: "C",
  "C++": "C+",
  MongoDB: "Mg",
  PostgreSQL: "Pg",
  MySQL: "My",
  Redis: "Rd",
  Prisma: "Pr",
  Pandas: "Pd",
  "Google Colab": "Co",
  "Generative AI": "Ai",
  Jest: "Je",
  "React Testing Library": "Rt",
  SonarQube: "Sq",
  Git: "Gt",
  GitHub: "Gh",
  "GitHub Actions": "Ga",
  Docker: "Dk",
  Vercel: "Vc",
  Figma: "Fg",
  WordPress: "Wp",
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  useReveal(sectionRef);

  // One tile per technology; a tile remembers every group it belongs to
  const elements = useMemo(() => {
    const map = new Map<
      string,
      { name: string; icon: (typeof skillCategories)[number]["skills"][number]["icon"]; groups: number[] }
    >();

    skillCategories.forEach((category, groupIndex) => {
      category.skills.forEach((skill) => {
        const existing = map.get(skill.name);
        if (existing) existing.groups.push(groupIndex);
        else map.set(skill.name, { ...skill, groups: [groupIndex] });
      });
    });

    return Array.from(map.values());
  }, []);

  // Tiles flip up in a random order as the table scrolls into view
  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".element",
        { rotateX: -90, y: 30, opacity: 0, transformPerspective: 700 },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.5)",
          stagger: { each: 0.028, from: "random" },
          clearProps: "transform",
          scrollTrigger: { trigger: table, start: "top 82%", once: true },
        },
      );
    }, table);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="sec">
      <div className="sec-inner">
        <SectionHead
          index="03"
          label="My Skills"
          title="The periodic table of my stack"
          description="I use modern frontend, backend, programming, database, data, and deployment tools to build clean, scalable, and production-ready web applications."
        />

        <div
          className="element-groups"
          data-reveal
          onMouseLeave={() => setActive(null)}
        >
          {skillCategories.map((category, index) => (
            <button
              key={category.title}
              type="button"
              className={`element-group ${active === index ? "is-active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(active === index ? null : index)}
              aria-pressed={active === index}
            >
              <i>{String(index + 1).padStart(2, "0")}</i>
              {category.title}
              <sup>{category.skills.length}</sup>
            </button>
          ))}
        </div>

        <div
          ref={tableRef}
          className={`element-table ${active !== null ? "has-active" : ""}`}
        >
          {elements.map((element, index) => {
            const ElementIcon = element.icon;
            const isLit = active !== null && element.groups.includes(active);

            return (
              <div
                key={element.name}
                className={`element ${isLit ? "is-lit" : ""}`}
                title={element.name}
              >
                <span className="element-num">{index + 1}</span>
                <ElementIcon className="element-icon" />
                <span className="element-symbol">
                  {SYMBOLS[element.name] ?? element.name.slice(0, 2)}
                </span>
                <span className="element-name">{element.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
