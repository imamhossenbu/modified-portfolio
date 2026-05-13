import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
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
        <main className="min-h-screen px-5 py-32 md:px-10 lg:px-16">
            <section className="mx-auto max-w-6xl">
                <Link href="/#projects" className="project-back-link">
                    <ArrowLeft size={18} />
                    Back to Projects
                </Link>

                <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#ff9494]/25 bg-white/60 shadow-[0_24px_60px_rgba(255,148,148,0.18)] backdrop-blur-xl dark:bg-white/5">
                    <div className="relative h-[280px] md:h-[430px]">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                    <div className="p-7 md:p-10">
                        <p className="mono-text mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#ff7474]">
                            {project.type}
                        </p>

                        <h1 className="mb-5 text-4xl font-bold text-[var(--foreground)] md:text-5xl">
                            {project.title}
                        </h1>

                        <p className="hero-description mb-8 max-w-3xl leading-8">
                            {project.description}
                        </p>

                        <div className="mb-9 flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                                <span key={tech} className="project-tech">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="mb-9">
                            <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)]">
                                Key Features
                            </h2>

                            <div className="grid gap-3 md:grid-cols-2">
                                {project.features.map((feature) => (
                                    <div key={feature} className="project-feature-item">
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <a
                                href={project.live}
                                className="project-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink size={17} />
                                Live Preview
                            </a>

                            <a
                                href={project.github}
                                className="project-link secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <SiGithub size={17} />
                                Source Code
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}