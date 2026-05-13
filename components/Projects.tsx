"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ExternalLink, Layers } from "lucide-react";
import { projectCategories, projects } from "@/data/projects";

export default function Projects() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredProjects = useMemo(() => {
        if (activeCategory === "all") return projects;
        return projects.filter((project) => project.category === activeCategory);
    }, [activeCategory]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".project-animate",
                { y: 70, opacity: 0, filter: "blur(10px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.9,
                    stagger: 0.14,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        gsap.fromTo(
            ".project-card",
            { y: 30, opacity: 0, scale: 0.97 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.45,
                stagger: 0.08,
                ease: "power3.out",
            }
        );
    }, [activeCategory]);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="section-padding relative overflow-hidden"
        >
            <div className="mx-auto max-w-7xl">
                <div className="project-animate mb-12 text-center">
                    <p className="mono-text mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#ff7474]">
                        My Projects
                    </p>

                    <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">
                        Selected work by category
                    </h2>

                    <p className="hero-description mx-auto mt-5 max-w-2xl leading-8">
                        Here are some projects organized by frontend, full stack, landing
                        page, and AI-based work.
                    </p>
                </div>

                <div className="project-animate mb-10 flex flex-wrap justify-center gap-3">
                    {projectCategories.map((category) => (
                        <button
                            key={category.value}
                            onClick={() => setActiveCategory(category.value)}
                            className={`project-filter-btn ${activeCategory === category.value ? "active" : ""
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="project-card">
                            <div className="project-image-wrap">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition duration-500"
                                />

                                {project.featured && (
                                    <span className="project-featured">Featured</span>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="mb-5 flex items-center justify-between gap-4">
                                    <div className="project-icon">
                                        <Layers size={22} />
                                    </div>

                                    <span className="project-type">{project.type}</span>
                                </div>

                                <h3 className="mb-3 text-2xl font-bold text-[var(--foreground)]">
                                    {project.title}
                                </h3>

                                <p className="hero-description mb-5 text-sm leading-7">
                                    {project.shortDescription}
                                </p>

                                <div className="mb-6 flex flex-wrap gap-2">
                                    {project.tech.slice(0, 4).map((item) => (
                                        <span key={item} className="project-tech">
                                            {item}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="project-link"
                                    >
                                        Details
                                    </Link>

                                    <a
                                        href={project.live}
                                        className="project-link secondary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink size={17} />
                                        Live
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}