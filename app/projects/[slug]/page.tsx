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
    <main className="min-h-screen px-5 py-28 md:px-10 lg:px-16 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      <section className="mx-auto max-w-7xl">
        {/* Back Link Wrapper */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="project-back-link inline-flex items-center gap-2 font-medium"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </div>

        {/* Top Project Hero Grid */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          {/* Left Details Block */}
          <div
            className="rounded-[2rem] border border-neutral-200 bg-white/70 p-7 shadow-xl backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-900/70 md:p-9"
            style={{ opacity: 1, transform: "none" }}
          >
            <p className="mono-text mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#ff7474]">
              Project Details
            </p>

            <h1 className="text-3xl font-bold leading-tight md:text-5xl tracking-tight text-neutral-900 dark:text-white">
              {project.title}
            </h1>

            <p className="mt-5 text-base leading-8 text-neutral-600 dark:text-neutral-300">
              {project.description}
            </p>

            {/* Technical Sub-cards Row */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border p-5 background-muted">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff7474] text-white shadow-lg">
                  <Layers size={20} />
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-white">
                  Project Type
                </h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {project.type}
                </p>
              </div>

              <div className="rounded-2xl border p-5 background-muted">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff7474] text-white shadow-lg">
                  <Code2 size={20} />
                </div>
                <h3 className="font-bold text-neutral-900 dark:text-white">
                  Tech Used
                </h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {project.tech.length} Technologies
                </p>
              </div>
            </div>

            {/* Tech Stack Badge Cloud */}
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-bold text-neutral-900 dark:text-white">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[#ff7474]/25 bg-[#ff7474]/5 px-4 py-2 text-xs font-semibold text-[#ff7474] transition-all duration-300 hover:bg-[#ff7474] hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="project-action-row mt-8 flex flex-wrap gap-4">
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

          {/* Right Presentation Mockup Wrapper */}
          <div
            className="rounded-[2rem] border border-neutral-200 bg-white/70 p-5 shadow-xl backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-900/70 md:p-7"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="flex items-center justify-between gap-4 mb-5">
              <span className="rounded-full border border-[#ff7474]/25 bg-[#ff7474]/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ff7474]">
                {project.type}
              </span>
              <span className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white dark:bg-neutral-800 dark:text-neutral-200 border dark:border-neutral-700">
                Showcase
              </span>
            </div>

            {/* Standard Next.js Image Container Canvas */}
            <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] w-full flex items-center justify-center rounded-[1.5rem] border border-neutral-200/60 bg-gradient-to-br from-[#fff7f7] via-white to-[#fff0f0] dark:border-neutral-800/40 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 p-4 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-w-1024px) 100vw, 50vw"
                className="object-contain p-4 drop-shadow-md transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* Highlighted Project Features Section */}
        <div
          className="mt-8 rounded-[2rem] border border-neutral-200 bg-white/70 p-7 shadow-xl backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-900/70 md:p-9"
          style={{ opacity: 1, transform: "none" }}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff7474] text-white shadow-md">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="mono-text text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7474]">
                Main Highlights
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Key Features
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {project.features.map((feature) => (
              <div
                key={feature}
                className="group flex gap-4 rounded-2xl border border-neutral-200 bg-neutral-50/30 p-5 transition-all duration-300 hover:-translate-y-0.5 dark:border-neutral-800/50 dark:bg-neutral-800/20"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ff7474]/10 text-[#ff7474] transition-all duration-300 group-hover:bg-[#ff7474] group-hover:text-white">
                  <CheckCircle2 size={16} />
                </span>
                <p className="text-sm leading-7 feature-text">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
