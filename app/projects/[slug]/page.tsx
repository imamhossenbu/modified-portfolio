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
    <main className="min-h-screen px-5 py-28 md:px-10 lg:px-16 transition-colors duration-300">
      <section className="mx-auto max-w-7xl">
        {/* Back Link */}
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
          <div className="left-card rounded-[2rem] p-7 backdrop-blur-xl md:p-9">
            <p className="mono-text mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Project Details
            </p>

            <h1 className="title text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              {project.title}
            </h1>

            <p className="description mt-5 text-base leading-8">
              {project.description}
            </p>

            {/* Technical Sub-cards Row */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="background-muted rounded-xl p-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-white shadow-[0_4px_14px_var(--accent-dim)]">
                  <Layers size={20} />
                </div>
                <h3 className="subtitle font-bold">Project Type</h3>
                <p className="description mt-1 text-sm">{project.type}</p>
              </div>

              <div className="background-muted rounded-xl p-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-white shadow-[0_4px_14px_var(--accent-dim)]">
                  <Code2 size={20} />
                </div>
                <h3 className="subtitle font-bold">Architecture</h3>
                <p className="description mt-1 text-sm">
                  {isMultiLayer ? "Multi-layer Stack" : "Frontend Stack"}
                </p>
              </div>
            </div>

            {/* Technical Stack Badge Cloud */}
            {project.tech && project.tech.length > 0 && (
              <div className="mt-8">
                <div className="mb-4 flex items-center gap-2 border-b border-[var(--panel-border)] pb-2">
                  <Cpu size={20} className="text-accent" />
                  <h2 className="stack text-xl font-bold">Technical Stack</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="mono-text rounded-md border border-accent/25 bg-accent/5 px-3.5 py-2 text-xs font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ================= RIGHT SIDE: IMAGE SHOWCASE & ALL LINKS ================= */}
          <div className="right-card rounded-[2rem] p-5 backdrop-blur-xl md:p-7">
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="mono-text rounded-md border border-accent/25 bg-accent/5 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                {project.category}
              </span>
              <span className="mono-text rounded-md border border-[var(--panel-border)] px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
                Showcase
              </span>
            </div>

            {/* Standard Next.js Image Container Canvas */}
            <div className="project-image-wrapper">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-4 drop-shadow-md transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>

            {/* Action Buttons Section (Live Link + Repositories) */}
            <div className="mt-6 space-y-4 border-t border-[var(--panel-border)] pt-5">
              <h4 className="source text-xs font-bold uppercase tracking-wider">
                Project Links & Source Code
              </h4>

              <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:flex sm:flex-wrap sm:items-center">
                {/* Live Preview Button */}
                {project.live && project.live !== "#" && (
                  <a
                    href={project.live}
                    className="project-link flex w-full items-center justify-center gap-2 whitespace-nowrap text-center sm:w-auto"
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
                    className="project-link secondary flex w-full items-center justify-center gap-2 whitespace-nowrap px-4 py-2.5 text-center text-xs sm:w-auto"
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
                    className="project-link secondary flex w-full items-center justify-center gap-2 whitespace-nowrap px-4 py-2.5 text-center text-xs sm:w-auto"
                  >
                    <SiGithub size={15} /> Backend Code
                  </a>
                )}

                {/* Socket.io Code Button — uses the signal (data) token
                    instead of a hardcoded indigo, so it stays inside the
                    schematic palette instead of introducing a third color. */}
                {project.github?.socket && (
                  <a
                    href={project.github.socket}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link secondary flex w-full items-center justify-center gap-2 whitespace-nowrap border-[var(--signal)]/25 px-4 py-2.5 text-center text-xs text-[var(--signal)] sm:w-auto"
                  >
                    <Code2 size={14} className="text-[var(--signal)]" />
                    Socket.io Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM SIDE: KEY FEATURES (FULL WIDTH) ================= */}
        <div className="bottom-card mt-8 rounded-[2rem] p-7 shadow-xl backdrop-blur-xl md:p-9">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-white shadow-[0_4px_14px_var(--accent-dim)]">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="mono-text text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Main Highlights
              </p>
              <h2 className="subtitle text-2xl font-bold tracking-tight">
                Key Features
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {project.features.map((feature) => (
              <div
                key={feature}
                className="feature-card group flex gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                  <CheckCircle2 size={16} />
                </span>
                <p className="text-sm leading-7">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
