"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLenis } from "lenis/react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
];

const RING_LENGTH = 2 * Math.PI * 16;

/**
 * Navigation that morphs with scroll: a wide, transparent bar at the top of
 * the page that contracts into a floating dark capsule once you scroll, with
 * a pill that slides between links and a ring that fills with page progress.
 */
export default function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const linksWrapRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const ringRef = useRef<SVGCircleElement | null>(null);
  const percentRef = useRef<HTMLSpanElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [activeLink, setActiveLink] = useState("#home");
  const [compact, setCompact] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/";
  const isProjectPage = pathname.startsWith("/project");

  const scrollToSection = useCallback(
    (href: string) => {
      const tryScroll = (attempt = 0) => {
        const section = document.querySelector<HTMLElement>(href);

        if (!section) {
          if (attempt < 25) setTimeout(() => tryScroll(attempt + 1), 80);
          return;
        }

        if (lenis) {
          lenis.scrollTo(section, { offset: -90, duration: 1.2 });
        } else {
          window.scrollTo({ top: section.offsetTop - 90, behavior: "smooth" });
        }

        window.history.replaceState(null, "", href);
      };

      setTimeout(() => tryScroll(), 120);
    },
    [lenis],
  );

  const handleNav = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveLink(href);

    if (isHomePage) {
      scrollToSection(href);
      return;
    }

    sessionStorage.setItem("scrollTarget", href);
    router.push("/");
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Arriving on the home page from elsewhere: honour the pending target
  useEffect(() => {
    if (!isHomePage) return;

    const target =
      sessionStorage.getItem("scrollTarget") || window.location.hash;

    if (target) {
      sessionStorage.removeItem("scrollTarget");
      scrollToSection(target);
    }
  }, [pathname, isHomePage, scrollToSection]);

  // Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 },
      );
    });

    return () => ctx.revert();
  }, []);

  // Scroll: morph state, active section, progress ring
  useEffect(() => {
    const sections = () =>
      navLinks
        .map((link) => document.querySelector<HTMLElement>(link.href))
        .filter((section): section is HTMLElement => Boolean(section));

    const handleScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;

      setCompact(y > 80);

      // The footer is a dark slab; flip the capsule so it stays readable on it
      const footer = document.querySelector("footer");
      setOverFooter(Boolean(footer && footer.getBoundingClientRect().top < 76));

      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(
          RING_LENGTH * (1 - progress),
        );
      }
      if (percentRef.current) {
        percentRef.current.textContent = String(Math.round(progress * 100));
      }

      if (!isHomePage) {
        if (isProjectPage) setActiveLink("#projects");
        return;
      }

      let current = "#home";
      const triggerPoint = window.innerHeight / 3;

      sections().forEach((section) => {
        const top = section.getBoundingClientRect().top + y;
        if (y >= top - triggerPoint && y < top + section.offsetHeight - triggerPoint) {
          current = `#${section.id}`;
        }
      });

      setActiveLink(y < 100 ? "#home" : current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHomePage, isProjectPage, pathname]);

  // The pill glides to whichever link is active
  useEffect(() => {
    const moveIndicator = () => {
      const link = linkRefs.current[activeLink];
      const indicator = indicatorRef.current;
      if (!link || !indicator) return;

      gsap.to(indicator, {
        x: link.offsetLeft,
        width: link.offsetWidth,
        opacity: 1,
        duration: 0.6,
        ease: "power4.out",
        overwrite: true,
      });
    };

    moveIndicator();
    // Fonts and the compact morph both shift link positions slightly
    const timer = setTimeout(moveIndicator, 720);
    window.addEventListener("resize", moveIndicator);
    document.fonts?.ready.then(moveIndicator);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", moveIndicator);
    };
  }, [activeLink, compact]);

  // Full-screen mobile menu
  useEffect(() => {
    if (!isOpen) {
      lenis?.start();
      return;
    }

    lenis?.stop();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        menuRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power4.inOut" },
      );
      gsap.fromTo(
        ".nav-x-menu-link, .nav-x-menu-foot",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          delay: 0.25,
          ease: "power4.out",
        },
      );
    }, menuRef);

    return () => ctx.revert();
  }, [isOpen, lenis]);

  const isDark = mounted && theme === "dark";

  return (
    <>
      <header ref={headerRef} className="nav-x-header">
        <nav
          className={`nav-x ${compact ? "is-compact" : ""} ${
            overFooter ? "is-over-footer" : ""
          } ${isOpen ? "is-open" : ""}`}
        >
          <Link
            href="/#home"
            onClick={(e) => handleNav(e, "#home")}
            className="nav-x-logo"
          >
            Imam<span>.</span>
          </Link>

          <span className="nav-x-status">
            <i />
            Available for work
          </span>

          <div ref={linksWrapRef} className="nav-x-links">
            <span ref={indicatorRef} className="nav-x-indicator" />

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`/${link.href}`}
                ref={(el) => {
                  linkRefs.current[link.href] = el;
                }}
                onClick={(e) => handleNav(e, link.href)}
                className={`nav-x-link ${activeLink === link.href ? "is-active" : ""}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="nav-x-actions">
            <span className="nav-x-ring" aria-hidden="true">
              <svg viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" className="nav-x-ring-track" />
                <circle
                  ref={ringRef}
                  cx="20"
                  cy="20"
                  r="16"
                  className="nav-x-ring-fill"
                  strokeDasharray={RING_LENGTH}
                  strokeDashoffset={RING_LENGTH}
                />
              </svg>
              <span ref={percentRef}>0</span>
            </span>

            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="nav-x-icon-btn"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <Link
              href="/#contact"
              onClick={(e) => handleNav(e, "#contact")}
              className="nav-x-cta"
            >
              <span>Hire Me</span>
              <ArrowUpRight size={15} />
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="nav-x-burger"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <i />
              <i />
            </button>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div ref={menuRef} className="nav-x-menu">
          <div className="nav-x-menu-links">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={`/${link.href}`}
                onClick={(e) => handleNav(e, link.href)}
                className={`nav-x-menu-link ${
                  activeLink === link.href ? "is-active" : ""
                }`}
              >
                <sup>0{index + 1}</sup>
                {link.name}
              </a>
            ))}
          </div>

          <Link
            href="/#contact"
            onClick={(e) => handleNav(e, "#contact")}
            className="nav-x-menu-foot hero-x-btn is-primary"
          >
            <span>Hire Me</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>
      )}
    </>
  );
}
