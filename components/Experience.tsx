"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    Code2,
    Sparkles,

} from "lucide-react";

const experience = {
    role: "Full Stack Developer",
    company: "Freelance / Personal Projects",
    duration: "2024 - Present",
    type: "Remote / Project Based",
    description:
        "I work on modern web applications using Next.js, TypeScript, Tailwind CSS, backend APIs, databases, and smooth UI animations. My focus is to build clean, responsive, and user-friendly digital products.",
    points: [
        "Developed modern frontend interfaces with React, Next.js, and Tailwind CSS.",
        "Built reusable components with clean structure and responsive layouts.",
        "Worked with backend APIs, database flow, authentication, and deployment.",
        "Added smooth user experience using GSAP animations and modern UI effects.",
    ],
    stats: [
        { label: "Role", value: "Full Stack" },
        { label: "Focus", value: "Web Apps" },
        { label: "Status", value: "Open" },
    ],
};

export default function Experience() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".experience-animate",
                {
                    y: 70,
                    opacity: 0,
                    filter: "blur(10px)",
                },
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

            gsap.to(".experience-floating-icon", {
                y: -14,
                duration: 2.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.25,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        gsap.to(cardRef.current, {
            "--mouse-x": `${x}px`,
            "--mouse-y": `${y}px`,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="section-padding relative overflow-hidden"
        >
            <div className="mx-auto max-w-7xl">
                <div className="experience-animate mb-14 text-center">
                    <p className="mono-text mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#ff7474]">
                        Experience
                    </p>

                    <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">
                        My working journey
                    </h2>

                    <p className="hero-description mx-auto mt-5 max-w-2xl leading-8">
                        A focused overview of my hands-on development work, project
                        experience, and technical growth as a full stack developer.
                    </p>
                </div>

                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    className="experience-animate experience-modern-card"
                >
                    <div className="experience-glow-orb experience-orb-one" />
                    <div className="experience-glow-orb experience-orb-two" />

                    <div className="experience-floating-icon experience-float-one">
                        <Code2 size={22} />
                    </div>



                    <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="relative z-10">
                            <div className="mb-6 inline-flex rounded-3xl bg-[#ff9494]/15 p-5 text-[#ff7474] shadow-[0_18px_40px_rgba(255,148,148,0.18)]">
                                <BriefcaseBusiness size={34} />
                            </div>

                            <p className="mono-text mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#ff7474]">
                                {experience.type}
                            </p>

                            <h3 className="mb-3 text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                                {experience.role}
                            </h3>

                            <p className="mb-5 text-lg font-semibold text-[#ff7474]">
                                {experience.company}
                            </p>

                            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#ff9494]/12 px-4 py-2 text-sm font-bold text-[#ff7474]">
                                <CalendarDays size={16} />
                                {experience.duration}
                            </div>

                            <p className="hero-description max-w-xl leading-8">
                                {experience.description}
                            </p>

                            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                {experience.stats.map((item) => (
                                    <div key={item.label} className="experience-stat-card">
                                        <span>{item.label}</span>
                                        <strong>{item.value}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="rounded-2xl bg-[#ff9494]/15 p-3 text-[#ff7474]">
                                    <Sparkles size={24} />
                                </div>

                                <h4 className="text-2xl font-bold text-[var(--foreground)]">
                                    What I worked on
                                </h4>
                            </div>

                            <div className="space-y-4">
                                {experience.points.map((point) => (
                                    <div key={point} className="experience-modern-point">
                                        <CheckCircle2 size={19} />
                                        <span>{point}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 rounded-3xl border border-[#ff9494]/20 bg-white/45 p-5 shadow-[0_14px_35px_rgba(255,148,148,0.12)] backdrop-blur-md dark:bg-white/5">
                                <p className="hero-description text-sm leading-7">
                                    Currently improving my skills in scalable full stack
                                    architecture, clean UI systems, testing, deployment, and
                                    AI-powered web applications.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}