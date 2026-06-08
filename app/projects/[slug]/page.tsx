import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  Code2,
  CheckCircle2,
  Cpu,
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

  const isMultiLayer =
    project.github &&
    typeof project.github === "object" &&
    Object.keys(project.github).length > 1;

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
        <div className="grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          {/* ================= LEFT SIDE: DETAILS & TECH STACK ================= */}
          <div
            className="rounded-[2rem] border left-card border-neutral-200 bg-white/70 p-7 backdrop-blur-xl dark:border-neutral-800/80  md:p-9"
            style={{ opacity: 1, transform: "none" }}
          >
            <p className="mono-text mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-blue-main">
              Project Details
            </p>

            <h1 className="text-3xl title font-bold leading-tight md:text-5xl tracking-tight text-neutral-900 dark:text-white">
              {project.title}
            </h1>

            <p className="mt-5 text-base leading-8 text-neutral-600 dark:text-neutral-300">
              {project.description}
            </p>

            {/* Technical Sub-cards Row */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border p-5 background-muted">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-main text-white shadow-[0_4px_14px_rgba(79,110,247,0.3)]">
                  <Layers size={20} />
                </div>
                <h3 className="font-bold subtitle text-neutral-900 dark:text-white">
                  Project Type
                </h3>
                <p className="mt-1  text-sm text-neutral-500 dark:text-neutral-400">
                  {project.type}
                </p>
              </div>

              <div className="rounded-2xl border p-5 background-muted">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-main text-white shadow-[0_4px_14px_rgba(79,110,247,0.3)]">
                  <Code2 size={20} />
                </div>
                <h3 className="font-bold subtitle text-neutral-900 dark:text-white">
                  Architecture
                </h3>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {isMultiLayer ? "Multi-layer Stack" : "Frontend Stack"}
                </p>
              </div>
            </div>

            {/* Technical Stack Badge Cloud */}
            {project.tech && project.tech.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4 text-xl font-bold text-neutral-900 dark:text-white border-b pb-2 border-neutral-200 dark:border-neutral-800">
                  <Cpu size={20} className="text-blue-main" />
                  <h2 className="stack">Technical Stack</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-blue-main/25 bg-blue-main/5 px-4 py-2 text-xs font-semibold text-blue-main transition-all duration-300 hover:bg-blue-main hover:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ================= RIGHT SIDE: IMAGE SHOWCASE & ALL LINKS ================= */}
          <div
            className="rounded-[2rem] right-card border border-neutral-200 bg-white/70 p-5 backdrop-blur-xl dark:border-neutral-800/80 dark:bg-white md:p-7"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="flex items-center justify-between gap-4 mb-5">
              <span className="rounded-full border border-blue-main/25 bg-blue-main/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-main">
                {project.category.toUpperCase()}
              </span>
              <span className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white dark:bg-neutral-800 dark:text-neutral-200 border dark:border-neutral-700">
                Showcase
              </span>
            </div>

            {/* Standard Next.js Image Container Canvas */}
            <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] w-full flex items-center justify-center rounded-[1.5rem] border border-neutral-200/60 bg-gradient-to-br from-blue-light/15 via-white to-cream/15 dark:border-neutral-800/40 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 p-4 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-w-1024px) 100vw, 50vw"
                className="object-contain p-4 drop-shadow-md transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>

            {/* Action Buttons Section (Live Link + Repositories) */}
            <div className="mt-6 pt-5 border-t border-neutral-200/60 dark:border-neutral-800/60 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Project Links & Source Code
              </h4>

              <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:flex sm:flex-wrap sm:items-center">
                {/* Live Preview Button */}
                {project.live && project.live !== "#" && (
                  <a
                    href={project.live}
                    className="project-link flex items-center justify-center gap-2 w-full sm:w-auto text-center whitespace-nowrap"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} />
                    Live Preview
                  </a>
                )}

                {/* Frontend Code Button */}
                {project.github?.frontend && (
                  <a
                    href={project.github.frontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="github"
                    className="project-link secondary text-xs py-2.5 px-4 flex items-center justify-center gap-2 w-full sm:w-auto text-center whitespace-nowrap"
                  >
                    <SiGithub size={15} /> Frontend Code
                  </a>
                )}

                {/* Backend Code Button */}
                {project.github?.backend && (
                  <a
                    href={project.github.backend}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="github"
                    className="project-link secondary text-xs py-2.5 px-4 flex items-center justify-center gap-2 w-full sm:w-auto text-center whitespace-nowrap"
                  >
                    <SiGithub size={15} /> Backend Code
                  </a>
                )}

                {/* Socket.io Code Button */}
                {project.github?.socket && (
                  <a
                    href={project.github.socket}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="github"
                    className="project-link secondary text-xs py-2.5 px-4 flex items-center justify-center gap-2 w-full sm:w-auto text-center text-indigo-500 dark:text-indigo-400 border-indigo-500/25 whitespace-nowrap"
                  >
                    <Code2
                      size={14}
                      className="text-indigo-500 dark:text-indigo-400"
                    />{" "}
                    Socket.io Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM SIDE: KEY FEATURES (FULL WIDTH) ================= */}
        <div
          className="mt-8 rounded-[2rem] bottom-card bg-white/70 p-7 shadow-xl backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-900/70 md:p-9"
          style={{ opacity: 1, transform: "none" }}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-main text-white shadow-md">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="mono-text text-xs font-semibold uppercase tracking-[0.22em] text-blue-main">
                Main Highlights
              </p>
              <h2 className="text-2xl subtitle font-bold tracking-tight text-neutral-900 dark:text-white">
                Key Features
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {project.features.map((feature) => (
              <div
                key={feature}
                className="group flex feature-card gap-4 rounded-2xl bg-neutral-50 p-5 transition-all duration-300 hover:-translate-y-0.5 dark:bg-neutral-900/30"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-main/10 text-blue-main transition-all duration-300 group-hover:bg-blue-main group-hover:text-white">
                  <CheckCircle2 size={16} />
                </span>
                <p className="text-sm leading-7 text-neutral-700 dark:text-neutral-300">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
