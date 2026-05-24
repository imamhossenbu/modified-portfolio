import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    ExternalLink,
    Layers,
    Code2,
    CheckCircle2,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projects } from "@/data/projects";

type ProjectDetailsPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProjectDetailsPage({
    params,
}: ProjectDetailsPageProps) {
    const { slug } = await params;

    const project = projects.find((item) => item.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen overflow-hidden px-5 py-28 md:px-10 lg:px-16">
            <section className="mx-auto max-w-7xl">
                <Link href="/#projects" className="project-back-link">
                    <ArrowLeft size={18} />
                    Back to Projects
                </Link>

                {/* Top Project Hero */}
                <div className="mt-8 grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
                    {/* Left Content */}
                    <div className="rounded-[2rem] border border-[#ff9494]/20 bg-white/75 p-7 shadow-[0_24px_70px_rgba(255,116,116,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 md:p-9">
                        <p className="mono-text mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#ff7474]">
                            Project Details
                        </p>

                        <h1 className="text-4xl font-bold leading-tight text-[var(--foreground)] md:text-5xl">
                            {project.title}
                        </h1>

                        <p className="hero-description mt-5 leading-8">
                            {project.description}
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-[#ff9494]/20 bg-[#ff7474]/5 p-5 dark:border-white/10 dark:bg-white/5">
                                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff7474] text-white shadow-[0_10px_25px_rgba(255,116,116,0.28)]">
                                    <Layers size={20} />
                                </div>

                                <h3 className="font-bold text-[var(--foreground)]">
                                    Project Type
                                </h3>

                                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                    {project.type}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-[#ff9494]/20 bg-[#ff7474]/5 p-5 dark:border-white/10 dark:bg-white/5">
                                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff7474] text-white shadow-[0_10px_25px_rgba(255,116,116,0.28)]">
                                    <Code2 size={20} />
                                </div>

                                <h3 className="font-bold text-[var(--foreground)]">
                                    Tech Used
                                </h3>

                                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                    {project.tech.length} Technologies
                                </p>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="mt-8">
                            <h2 className="mb-4 text-lg font-bold text-[var(--foreground)]">
                                Tech Stack
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-[#ff9494]/25 bg-[#ff7474]/8 px-4 py-2 text-xs font-semibold text-[#ff7474] transition-all duration-300 hover:bg-[#ff7474] hover:text-white dark:border-white/10 dark:bg-white/5"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-wrap gap-3">
                            {project.live && (
                                <a
                                    href={project.live}
                                    className="project-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink size={17} />
                                    Live Preview
                                </a>
                            )}

                            {project.github && (
                                <a
                                    href={project.github}
                                    className="project-link secondary"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <SiGithub size={17} />
                                    Source Code
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right Mockup Image */}
                    <div className="relative overflow-hidden rounded-[2rem] border border-[#ff9494]/20 bg-white/70 p-5 shadow-[0_24px_70px_rgba(255,116,116,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 md:p-7">
                        {/* Background Glow */}
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#ff7474]/20 blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#ff7474]/10 blur-3xl" />

                        <div className="relative">
                            <div className="mb-5 flex items-center justify-between gap-4">
                                <span className="rounded-full border border-[#ff9494]/25 bg-[#ff7474]/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ff7474] dark:border-white/10 dark:bg-white/5">
                                    {project.type}
                                </span>

                                <span className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-neutral-900">
                                    Showcase
                                </span>
                            </div>

                            <div className="relative flex min-h-[260px] items-center justify-center rounded-[1.5rem] border border-[#ff9494]/15 bg-gradient-to-br from-[#fff7f7] via-white to-[#fff0f0] p-4 dark:border-white/10 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 md:min-h-[340px] lg:min-h-[390px]">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    priority
                                    className="object-contain p-4 drop-shadow-[0_24px_35px_rgba(0,0,0,0.18)] transition-transform duration-700 hover:scale-[1.03]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Features */}
                <div className="mt-8 rounded-[2rem] border border-[#ff9494]/20 bg-white/70 p-7 shadow-[0_24px_70px_rgba(255,116,116,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 md:p-9">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff7474] text-white shadow-[0_10px_25px_rgba(255,116,116,0.28)]">
                            <CheckCircle2 size={22} />
                        </div>

                        <div>
                            <p className="mono-text text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7474]">
                                Main Highlights
                            </p>

                            <h2 className="text-2xl font-bold text-[var(--foreground)]">
                                Key Features
                            </h2>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {project.features.map((feature) => (
                            <div
                                key={feature}
                                className="group flex gap-4 rounded-2xl border border-[#ff9494]/20 bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff7474]/45 hover:shadow-[0_16px_35px_rgba(255,116,116,0.12)] dark:border-white/10 dark:bg-white/5"
                            >
                                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ff7474]/10 text-[#ff7474] transition-all duration-300 group-hover:bg-[#ff7474] group-hover:text-white">
                                    <CheckCircle2 size={16} />
                                </span>

                                <h6 className="text-sm feature-text leading-7 text-neutral-600 dark:text-neutral-300">
                                    {feature}
                                </h6>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}