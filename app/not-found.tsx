import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="notfound">
      <p className="sec-head-meta">
        <span className="sec-head-index">404</span>
        <span>Page not found</span>
      </p>

      <h1>This page doesn&apos;t exist.</h1>

      <p className="notfound-text">
        The link may be old, or the project may have been removed.
      </p>

      <div className="notfound-actions">
        <Link href="/" className="hero-x-btn is-primary">
          <span>Back to home</span>
          <ArrowUpRight size={16} />
        </Link>
        <Link href="/#projects" className="hero-x-btn">
          <span>See projects</span>
        </Link>
      </div>
    </main>
  );
}
