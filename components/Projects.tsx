"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projectCategories, projects } from "@/data/projects";
import SectionHead from "@/components/SectionHead";
import Magnetic from "@/components/motion/Magnetic";
import { useReveal } from "@/components/motion/useReveal";

const PAGE_SIZE = 6;

export default function Projects() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
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

  const handleCategory = (value: string) => {
    setActiveCategory(value);
    setVisibleCount(PAGE_SIZE);
  };

  // Curtain-wipe each card in when the filter changes or more are loaded
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const fresh = gsap.utils.toArray<HTMLElement>(
        ".work-card:not([data-shown])",
      );

      fresh.forEach((card, index) => {
        card.dataset.shown = "true";
        const media = card.querySelector(".work-card-media");
        const info = card.querySelector(".work-card-info");

        gsap.fromTo(
          media,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power4.inOut",
            delay: (index % 2) * 0.12,
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          },
        );
        gsap.fromTo(
          media?.querySelector("img") ?? null,
          { scale: 1.35 },
          {
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            delay: (index % 2) * 0.12,
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          },
        );
        gsap.fromTo(
          info,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.35 + (index % 2) * 0.12,
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          },
        );
      });
    }, grid);

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

        <div ref={gridRef} key={activeCategory} className="work-grid">
          {displayedProjects.map((project, index) => (
            <article
              key={project.id}
              className="work-card"
              onClick={() => router.push(`/projects/${project.slug}`)}
            >
              <div className="work-card-media">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                  preload={index < 2}
                />
                <span className="work-card-view" aria-hidden="true">
                  View
                  <ArrowUpRight size={18} />
                </span>
              </div>

              <div className="work-card-info">
                <span className="work-card-num">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="work-card-text">
                  <h3>{project.title}</h3>
                  <p>{project.shortDescription}</p>
                </div>

                <div
                  className="work-card-links"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link href={`/projects/${project.slug}`}>Details</Link>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={13} />
                    {project.category === "mobile" ? "APK" : "Live"}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length > visibleCount && (
          <div className="work-more">
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="round-btn"
              >
                View
                <br />
                More
              </button>
            </Magnetic>
          </div>
        )}
      </div>
    </section>
  );
}
