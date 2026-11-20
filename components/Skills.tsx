"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Matter from "matter-js";
import { RotateCcw } from "lucide-react";
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

const skillCategories = [
  {
    title: "Frontend",
    tab: "Frontend",
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
    tab: "Mobile",
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
    tab: "Backend",
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
    tab: "Languages",
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
    tab: "Database",
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
    tab: "Data & AI",
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
    tab: "Testing",
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
    tab: "DevOps",
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
    tab: "CMS",
    file: "cms.php",
    icon: Brain,
    skills: [{ name: "WordPress", icon: SiWordpress }],
  },
];

type MouseWithHandlers = Matter.Mouse & {
  mousemove: EventListener;
  mousedown: EventListener;
  mouseup: EventListener;
  mousewheel: EventListener;
};

const random = (min: number, max: number) => min + Math.random() * (max - min);

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const arenaRef = useRef<HTMLDivElement | null>(null);
  const bodiesRef = useRef<Map<string, Matter.Body>>(new Map());
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  useReveal(sectionRef);

  // The dark pill slides to the selected tab
  useEffect(() => {
    const move = () => {
      const tabs = tabsRef.current;
      const indicator = indicatorRef.current;
      const current = tabs?.querySelector<HTMLElement>(".seg-tab.is-active");
      if (!tabs || !indicator || !current) return;

      gsap.to(indicator, {
        x: current.offsetLeft,
        width: current.offsetWidth,
        opacity: 1,
        duration: 0.55,
        ease: "power4.out",
        overwrite: true,
      });
    };

    move();
    window.addEventListener("resize", move);
    document.fonts?.ready.then(move);

    return () => window.removeEventListener("resize", move);
  }, [active]);

  // One pill per technology; a pill remembers every group it belongs to
  const tools = useMemo(() => {
    const map = new Map<
      string,
      {
        name: string;
        icon: (typeof skillCategories)[number]["skills"][number]["icon"];
        groups: number[];
      }
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

  // Physics: pills are real bodies that fall, pile up and can be thrown
  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      arena.classList.add("is-static");
      return;
    }

    const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint } = Matter;
    const bodies = bodiesRef.current;

    // Pill elements and sizes are measured once per build, never per frame
    let sprites: { el: HTMLElement; body: Matter.Body; w: number; h: number }[] = [];
    let arenaWidth = 0;
    let arenaHeight = 0;
    let engine: Matter.Engine | null = null;
    let mouse: MouseWithHandlers | null = null;
    let frame = 0;
    let visible = false;
    let built = false;
    let lastWidth = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const releaseMouse = () => {
      if (!mouse) return;
      const el = mouse.element;
      el.removeEventListener("mousemove", mouse.mousemove);
      el.removeEventListener("mousedown", mouse.mousedown);
      el.removeEventListener("mouseup", mouse.mouseup);
      mouse = null;
    };

    const build = () => {
      if (engine) {
        Engine.clear(engine);
        Composite.clear(engine.world, false);
      }
      releaseMouse();
      bodies.clear();

      const width = arena.clientWidth;
      const height = arena.clientHeight;
      lastWidth = width;
      arenaWidth = width;
      arenaHeight = height;
      sprites = [];

      engine = Engine.create();
      engine.gravity.y = 1.1;

      const wall = { isStatic: true };
      // Thick walls and a far-off ceiling: nothing can tunnel out, however hard it is thrown
      const walls = [
        Bodies.rectangle(width / 2, height + 150, width * 3, 300, wall),
        Bodies.rectangle(-150, 0, 300, height * 14, wall),
        Bodies.rectangle(width + 150, 0, 300, height * 14, wall),
        Bodies.rectangle(width / 2, -height * 6, width * 3, 300, wall),
      ];

      const pills = Array.from(
        arena.querySelectorAll<HTMLElement>(".gravity-pill"),
      );

      pills.forEach((el, index) => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;

        // Staggered heights above the arena, so they rain in one after another
        const body = Bodies.rectangle(
          random(w / 2 + 12, Math.max(w / 2 + 13, width - w / 2 - 12)),
          -60 - index * 46,
          w,
          h,
          {
            chamfer: { radius: h / 2 },
            restitution: 0.38,
            friction: 0.35,
            frictionAir: 0.014,
            angle: random(-0.5, 0.5),
          },
        );

        bodies.set(el.dataset.name ?? String(index), body);
        sprites.push({ el, body, w, h });
      });

      Composite.add(engine.world, [...walls, ...bodies.values()]);

      // Dragging with the mouse; wheel and touch are handed back to the page
      mouse = Mouse.create(arena) as MouseWithHandlers;
      arena.removeEventListener("wheel", mouse.mousewheel);
      arena.removeEventListener("touchmove", mouse.mousemove);
      arena.removeEventListener("touchstart", mouse.mousedown);
      arena.removeEventListener("touchend", mouse.mouseup);

      Composite.add(
        engine.world,
        MouseConstraint.create(engine, {
          mouse,
          constraint: { stiffness: 0.18, render: { visible: false } },
        }),
      );

      arena.classList.add("is-live");
      built = true;
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!engine || !visible) return;

      Engine.update(engine, 1000 / 60);

      sprites.forEach(({ el, body, w, h }) => {
        // A pill that escapes (or whose maths blew up) is dropped back in from
        // the top, at a random spot so returning pills never land on each other
        const lost =
          !Number.isFinite(body.position.x) ||
          !Number.isFinite(body.position.y) ||
          body.position.y > arenaHeight + 120 ||
          body.position.x < -120 ||
          body.position.x > arenaWidth + 120;

        if (lost) {
          Body.setPosition(body, {
            x: random(80, Math.max(81, arenaWidth - 80)),
            y: random(-420, -80),
          });
          Body.setVelocity(body, { x: 0, y: 0 });
          Body.setAngularVelocity(body, 0);
          Body.setAngle(body, random(-0.4, 0.4));
        }

        el.style.transform = `translate(${body.position.x - w / 2}px, ${
          body.position.y - h / 2
        }px) rotate(${body.angle}rad)`;
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !built) build();
      },
      { threshold: 0.15 },
    );

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (built && arena.clientWidth !== lastWidth) build();
      }, 250);
    };

    observer.observe(arena);
    window.addEventListener("resize", handleResize);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      releaseMouse();
      if (engine) {
        Composite.clear(engine.world, false);
        Engine.clear(engine);
      }
      bodies.clear();
      arena.classList.remove("is-live");
    };
  }, []);

  /** Toss pills into the air: one group, or everything when no group is given. */
  const kick = useCallback(
    (group: number | null) => {
      tools.forEach((tool) => {
        if (group !== null && !tool.groups.includes(group)) return;
        const body = bodiesRef.current.get(tool.name);
        if (!body) return;

        Matter.Body.setVelocity(body, { x: random(-4, 4), y: random(-14, -8) });
        Matter.Body.setAngularVelocity(body, random(-0.2, 0.2));
      });
    },
    [tools],
  );

  const selectGroup = (index: number) => {
    const next = active === index ? null : index;
    setActive(next);
    if (next !== null) kick(next);
  };

  return (
    <section id="skills" ref={sectionRef} className="sec">
      <div className="sec-inner">
        <SectionHead
          index="03"
          label="My Skills"
          title="Technologies I work with"
          description="I use modern frontend, backend, programming, database, data, and deployment tools to build clean, scalable, and production-ready web applications."
        />

        <div className="seg-wrap" data-reveal>
          <div ref={tabsRef} className="seg" role="tablist" aria-label="Skill groups">
            <span ref={indicatorRef} className="seg-indicator" />

            <button
              type="button"
              role="tab"
              aria-selected={active === null}
              className={`seg-tab ${active === null ? "is-active" : ""}`}
              onClick={() => setActive(null)}
            >
              All
              <sup>{tools.length}</sup>
            </button>

            {skillCategories.map((category, index) => (
              <button
                key={category.title}
                type="button"
                role="tab"
                aria-selected={active === index}
                title={category.title}
                className={`seg-tab ${active === index ? "is-active" : ""}`}
                onClick={() => selectGroup(index)}
              >
                {category.tab}
                <sup>{category.skills.length}</sup>
              </button>
            ))}
          </div>
        </div>

        <div
          ref={arenaRef}
          className={`gravity ${active !== null ? "has-active" : ""}`}
          data-reveal
        >
          <p className="gravity-hint">Grab one and throw it</p>

          <button
            type="button"
            className="gravity-shake"
            onClick={() => kick(active)}
          >
            <RotateCcw size={14} />
            Shake
          </button>

          {tools.map((tool) => {
            const ToolIcon = tool.icon;
            const isLit = active !== null && tool.groups.includes(active);

            return (
              <span
                key={tool.name}
                data-name={tool.name}
                className={`gravity-pill ${isLit ? "is-lit" : ""}`}
              >
                <ToolIcon />
                {tool.name}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
