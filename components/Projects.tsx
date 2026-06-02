/* eslint-disable react-hooks/set-state-in-render */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ExternalLink } from "lucide-react";
import { projectCategories, projects } from "@/data/projects";
import Link from "next/link";

export default function Projects() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    setVisibleCount(6);
    if (activeCategory === "all") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  // Handle pagination/visible limit
  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  // Initial GSAP scroll animation for the section layout
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-animate",
        { y: 50, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP animation triggered when changing filters or loading more items
  useEffect(() => {
    gsap.fromTo(
      ".project-card",
      { y: 25, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
      },
    );
  }, [activeCategory, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="project-animate mb-12 text-center">
          <p className="mono-text mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-main">
            My Projects
          </p>
          <h2 className="project-section-title text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
            Selected work by category
          </h2>
          <p className="hero-description mx-auto mt-4 max-w-2xl text-base text-neutral-600 dark:text-neutral-400 leading-7">
            Here are some projects organized by frontend, full stack, landing
            page, and AI-based work.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="project-animate mb-12 flex flex-wrap justify-center gap-3">
          {projectCategories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`project-filter-btn ${
                activeCategory === category.value ? "active" : ""
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group cursor-pointer"
              onClick={() => router.push(`/projects/${project.slug}`)}
            >
              {/* Image Container - Fixed Aspect Ratio */}
              <div className="project-image-wrap">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                  className="object-contain transition-transform duration-500"
                  priority={project.id <= 3}
                />
              </div>

              {/* Bottom Content Area - Handles Mobile vs Desktop layout via CSS */}
              <div className="project-card-content">
                <h3 className="mb-1 text-lg font-bold text-neutral-900 dark:text-white truncate">
                  {project.title}
                </h3>
                <p className="mb-4 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                  {project.shortDescription}
                </p>

                <div
                  className="project-action-row"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <button className="project-hover-link">Details</button>
                  </Link>
                  <a
                    href={project.live}
                    className="project-hover-link secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={13} />
                    Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Trigger */}
        {filteredProjects.length > visibleCount && (
          <div className="mt-14 text-center">
            <button
              onClick={handleLoadMore}
              className="project-back-link font-bold px-8 py-3.5"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
