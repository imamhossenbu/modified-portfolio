"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink, Plus } from "lucide-react";
import { projectCategories, projects } from "@/data/projects";
import SectionHead from "@/components/SectionHead";
import BrowserFrame, { displayHost } from "@/components/BrowserFrame";
import { useReveal } from "@/components/motion/useReveal";

gsap.registerPlugin(ScrollTrigger);

const PAGE_SIZE = 7;

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState(0);
  useReveal(sectionRef);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length };
    projects.forEach((project) => {
      map[project.category] = (map[project.category] ?? 0) + 1;
    });
    return map;
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const current = displayedProjects[Math.min(activeIndex, displayedProjects.length - 1)];

  const handleCategory = (value: string) => {
    setActiveCategory(value);
    setVisibleCount(PAGE_SIZE);
    setActiveIndex(0);
  };

  // Rows slide in, and the row crossing mid-screen drives the sticky preview
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const fresh = gsap.utils.toArray<HTMLElement>(".proj-row:not([data-shown])");

      fresh.forEach((row) => {
        row.dataset.shown = "true";
        gsap.fromTo(
          row,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 92%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".proj-row").forEach((row, index) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(index);
          },
        });
      });
    }, list);

    return () => ctx.revert();
  }, [activeCategory, visibleCount]);

  return (
    <section id="projects" ref={sectionRef} className="sec">
      <div className="sec-inner">
        <SectionHead
          index="04"
          label="My Projects"
          title="Selected work by category"
          description="Here are some projects organized by frontend, full stack, mobile app, landing page, and AI-based work."
        />

        <div className="work-filters" data-reveal>
          {projectCategories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => handleCategory(category.value)}
              className={`work-filter ${
                activeCategory === category.value ? "is-active" : ""
              }`}
            >
              {category.label}
              <sup>{counts[category.value] ?? 0}</sup>
            </button>
          ))}
        </div>

        <div className="proj">
          {/* Sticky live preview (desktop): swaps as rows are hovered or scrolled */}
          <aside className="proj-preview" data-reveal>
            <BrowserFrame url={current ? displayHost(current.live) : undefined}>
              {displayedProjects.map((project, index) => (
                <Image
                  key={project.id}
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 1px, 46vw"
                  className={`proj-preview-img ${
                    project.category === "mobile" ? "is-contain" : ""
                  } ${current?.id === project.id ? "is-active" : ""}`}
                  preload={index === 0}
                />
              ))}
            </BrowserFrame>

            {current && (
              <div className="proj-preview-meta" key={current.id}>
                <p className="proj-preview-type">{current.type}</p>
                <h3 className="proj-preview-title">{current.title}</h3>
                <p className="proj-preview-desc">{current.shortDescription}</p>

                <div className="proj-actions">
                  <Link
                    href={`/projects/${current.slug}`}
                    className="hero-x-btn is-primary"
                  >
                    <span>View Details</span>
                    <ArrowUpRight size={15} />
                  </Link>
                  <a
                    href={current.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-x-btn"
                  >
                    <span>
                      {current.category === "mobile" ? "Get APK" : "Live Site"}
                    </span>
                    <ExternalLink size={14} />
                  </a>
                </div>

                <ul>
                  {current.tech.slice(0, 6).map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          <ol ref={listRef} key={activeCategory} className="proj-list">
            {displayedProjects.map((project, index) => (
              <li
                key={project.id}
                className={`proj-row ${current?.id === project.id ? "is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="row-line" />

                {/* Inline screenshot for small screens, where there is no sticky preview */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="proj-row-thumb"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <BrowserFrame url={displayHost(project.live)}>
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 1px"
                      className={`proj-preview-img is-active ${
                        project.category === "mobile" ? "is-contain" : ""
                      }`}
                    />
                  </BrowserFrame>
                </Link>

                <span className="proj-row-num">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="proj-row-body">
                  <h3>
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p>{project.shortDescription}</p>

                  <div className="proj-actions">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="hero-x-btn is-primary"
                    >
                      <span>View Details</span>
                      <ArrowUpRight size={15} />
                    </Link>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-x-btn"
                    >
                      <span>
                        {project.category === "mobile" ? "Get APK" : "Live Site"}
                      </span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <span className="proj-row-arrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </li>
            ))}
          </ol>
        </div>

        {filteredProjects.length > visibleCount && (
          <div className="work-more">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="btn-x"
            >
              <span className="btn-x-label" data-text="View More">
                <span>View More</span>
              </span>
              <span className="btn-x-icon">
                <Plus />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
