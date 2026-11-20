import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projectCategories, projects } from "@/data/projects";
import { projectShots } from "@/data/projectShots";
import { site } from "@/lib/site";
import { displayHost } from "@/components/BrowserFrame";
import ProjectGallery from "@/components/ProjectGallery";
import RevealScope from "@/components/motion/RevealScope";

type ProjectDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  const url = `/projects/${project.slug}`;
  const description = toMetaDescription(project.description);

  return {
    title: `${project.title} — ${project.type}`,
    description,
    keywords: [project.title, project.type, ...project.tech],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${project.title} — ${project.type}`,
      description,
      images: [{ url: project.image, alt: `${project.title} screenshot` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.type}`,
      description,
      images: [project.image],
    },
  };
}

/** Plain text, cut at a word boundary to the ~155 characters search results show. */
function toMetaDescription(text: string, max = 155) {
  const plain = text.replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
  if (plain.length <= max) return plain;
  return `${plain.slice(0, plain.lastIndexOf(" ", max - 1)).replace(/[,.;:—-]+$/, "")}…`;
}

/** Project copy uses **double asterisks** for emphasis; render them as bold. */
function renderRich(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
  );
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { slug } = await params;

  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const isMobile = project.category === "mobile";
  const hasLive = Boolean(project.live) && project.live !== "#";
  const extraShots = projectShots[project.slug];

  const categoryLabel =
    projectCategories.find((item) => item.value === project.category)?.label ??
    project.category;

  const architecture = isMobile
    ? "Mobile App Stack"
    : Object.keys(project.github ?? {}).length > 1
      ? "Multi-layer Stack"
      : "Frontend Stack";

  const repos = [
    {
      label: isMobile ? "App Code" : "Frontend Code",
      href: project.github?.frontend,
    },
    { label: "App Code", href: project.github?.app },
    { label: "Backend Code", href: project.github?.backend },
    { label: "Socket.io Code", href: project.github?.socket },
  ].filter((repo): repo is { label: string; href: string } => Boolean(repo.href));

  const liveLabel = project.live.includes(".apk")
    ? "Download APK"
    : isMobile
      ? "Live / Download"
      : "Live Preview";

  const pageUrl = `${site.url}/projects/${project.slug}`;

  // Tells search engines what this page is and where it sits in the site
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#project`,
        name: project.title,
        headline: `${project.title} — ${project.type}`,
        description: project.description.replace(/\*\*/g, ""),
        url: pageUrl,
        image: `${site.url}${project.image}`,
        genre: project.type,
        keywords: project.tech.join(", "),
        author: { "@id": `${site.url}/#person` },
        creator: { "@id": `${site.url}/#person` },
        ...(hasLive && !isMobile ? { sameAs: project.live } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${site.url}/#projects`,
          },
          { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <main id="main" className="detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevealScope className="sec-inner">
        <Link href="/#projects" className="detail-back" data-reveal>
          <ArrowLeft size={16} />
          All projects
        </Link>

        <header className="detail-head">
          <p className="sec-head-meta" data-reveal>
            <span className="sec-head-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{categoryLabel}</span>
            <span className="sec-head-index">{project.type}</span>
          </p>

          <h1 className="detail-title" data-reveal>
            {project.title}
          </h1>

          <p className="detail-desc" data-reveal>
            {renderRich(project.description)}
          </p>

          <div className="detail-actions" data-reveal>
            {hasLive && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-x-btn is-primary"
              >
                <span>{liveLabel}</span>
                <ExternalLink size={16} />
              </a>
            )}

            {repos.map((repo) => (
              <a
                key={repo.label}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-x-btn"
              >
                <SiGithub size={15} />
                <span>{repo.label}</span>
              </a>
            ))}
          </div>
        </header>

        <div className="detail-shot" data-reveal>
          <ProjectGallery
            title={project.title}
            shots={[project.image, ...(extraShots?.desktop ?? [])]}
            mobile={extraShots?.mobile}
            url={hasLive ? displayHost(project.live) : undefined}
            contain={isMobile}
          />
        </div>

        <div className="detail-grid">
          <aside className="detail-aside">
            <dl className="detail-facts" data-reveal>
              <div>
                <dt>Project Type</dt>
                <dd>{project.type}</dd>
              </div>
              <div>
                <dt>Architecture</dt>
                <dd>{architecture}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{categoryLabel}</dd>
              </div>
            </dl>

            {project.tech?.length > 0 && (
              <div data-reveal>
                <h2 className="sec-kicker">Technical Stack</h2>
                <ul className="detail-stack">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          <section>
            <h2 className="sec-kicker" data-reveal>
              Key Features
            </h2>

            {project.features.map((feature, featureIndex) => (
              <div key={feature} className="exp-x-point" data-reveal>
                <span className="row-line" data-line />
                <span className="exp-x-num">
                  {String(featureIndex + 1).padStart(2, "0")}
                </span>
                <p>{renderRich(feature)}</p>
              </div>
            ))}
          </section>
        </div>

        <Link href={`/projects/${next.slug}`} className="detail-next" data-reveal>
          <span className="row-line" data-line />
          <span className="sec-kicker">Next project</span>
          <span className="detail-next-title">
            {next.title}
            <ArrowUpRight />
          </span>
        </Link>
      </RevealScope>
    </main>
  );
}
