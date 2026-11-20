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
    file: "frontend.tsx",
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
    file: "mobile.dart",
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
    file: "backend.ts",
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
    file: "languages.py",
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
    file: "database.sql",
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
    file: "data-ai.ipynb",
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
    file: "testing.test.ts",
    icon: TestTube2,
    skills: [
      { name: "Jest", icon: SiJest },
      { name: "React Testing Library", icon: SiTestinglibrary },
      { name: "SonarQube", icon: SiSonarqubecloud },
    ],
  },
  {
    title: "DevOps & Tools",
    file: "devops.yml",
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
    file: "cms.php",
    icon: Brain,
    skills: [{ name: "WordPress", icon: SiWordpress }],
  },
];

/** camelCase identifier for the exported array: "Data & AI Tools" → "dataAiTools" */
const toIdentifier = (title: string) =>
  title
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word[0].toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("");

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const codeRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  useReveal(sectionRef);

  const current = skillCategories[active];
  const total = skillCategories.reduce(
    (sum, category) => sum + category.skills.length,
    0,
  );

  // Each time a file opens, its lines are "typed" in from the gutter
  useEffect(() => {
    const code = codeRef.current;
    if (!code) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".editor-line",
        { opacity: 0, x: -14 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.045,
          ease: "power2.out",
          scrollTrigger: { trigger: code, start: "top 85%", once: true },
        },
      );
    }, code);

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

        <div className="editor" data-reveal>
          <div className="editor-bar">
            <span className="editor-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="editor-title">imam-hossen / stack</span>
          </div>

          <div className="editor-body">
            {/* File tree: one "file" per skill group */}
            <aside className="editor-tree">
              <p className="editor-tree-head">Explorer</p>
              <p className="editor-tree-folder">▾ stack</p>

              {skillCategories.map((category, index) => (
                <button
                  key={category.file}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`editor-file ${index === active ? "is-active" : ""}`}
                  aria-pressed={index === active}
                >
                  <category.icon size={14} />
                  <span>{category.file}</span>
                  <em>{category.skills.length}</em>
                </button>
              ))}
            </aside>

            <div className="editor-main">
              <div className="editor-tabs">
                {skillCategories.map((category, index) => (
                  <button
                    key={category.file}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`editor-tab ${index === active ? "is-active" : ""}`}
                  >
                    {category.file}
                  </button>
                ))}
              </div>

              <div ref={codeRef} key={active} className="editor-code">
                <p className="editor-line">
                  <span className="tok-comment">
                    {"// "}
                    {current.title} — {current.skills.length} tools
                  </span>
                </p>

                <p className="editor-line">
                  <span className="tok-key">export const</span>{" "}
                  <span className="tok-name">{toIdentifier(current.title)}</span>{" "}
                  <span className="tok-punct">= [</span>
                </p>

                {current.skills.map((skill) => {
                  const SkillIcon = skill.icon;

                  return (
                    <p key={skill.name} className="editor-line is-skill">
                      <SkillIcon className="editor-skill-icon" />
                      <span className="tok-string">&quot;{skill.name}&quot;</span>
                      <span className="tok-punct">,</span>
                    </p>
                  );
                })}

                <p className="editor-line">
                  <span className="tok-punct">];</span>
                  <span className="editor-caret" />
                </p>
              </div>
            </div>
          </div>

          <div className="editor-status">
            <span>
              <i />
              {current.file}
            </span>
            <span>
              {skillCategories.length} files · {total} tools
            </span>
            <span>UTF-8</span>
          </div>
        </div>
      </div>
    </section>
  );
}
