/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Clients", href: "#clients" },
  { name: "Insights", href: "#insights" },
];

export default function Navbar() {
    const headerRef = useRef<HTMLElement | null>(null);
    const navRef = useRef<HTMLElement | null>(null);
    const logoRef = useRef<HTMLAnchorElement | null>(null);
    const linksRef = useRef<HTMLAnchorElement[]>([]);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const lastScrollY = useRef(0);

    const [activeLink, setActiveLink] = useState("#home");
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headerRef.current,
                {
                    y: -100,
                    opacity: 0,
                    filter: "blur(12px)",
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power4.out",
                }
            );

            gsap.fromTo(
                logoRef.current,
                {
                    x: -40,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.9,
                    delay: 0.25,
                    ease: "back.out(1.7)",
                }
            );

            gsap.fromTo(
                linksRef.current,
                {
                    y: -20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    delay: 0.4,
                    stagger: 0.12,
                    ease: "power3.out",
                }
            );
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            const sections = navLinks
                .map((link) => document.querySelector(link.href))
                .filter(Boolean) as HTMLElement[];

            let current = "#home";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 140;

                if (currentScrollY >= sectionTop) {
                    current = `#${section.id}`;
                }
            });

            setActiveLink(current);

            if (!headerRef.current) return;

            if (currentScrollY <= 20) {
                gsap.to(headerRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.45,
                    ease: "power3.out",
                });
            } else if (currentScrollY > lastScrollY.current) {
                setIsOpen(false);

                gsap.to(headerRef.current, {
                    y: -110,
                    opacity: 0,
                    duration: 0.45,
                    ease: "power3.inOut",
                });
            } else {
                gsap.to(headerRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.45,
                    ease: "power3.out",
                });
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!mobileMenuRef.current) return;

        if (isOpen) {
            gsap.fromTo(
                mobileMenuRef.current,
                {
                    height: 0,
                    opacity: 0,
                    y: -12,
                },
                {
                    height: "auto",
                    opacity: 1,
                    y: 0,
                    duration: 0.45,
                    ease: "power3.out",
                }
            );
        }
    }, [isOpen]);

    const handleHover = (element: HTMLAnchorElement) => {
        gsap.to(element, {
            y: -3,
            scale: 1.06,
            duration: 0.25,
            ease: "power2.out",
        });
    };

    const handleLeave = (element: HTMLAnchorElement) => {
        gsap.to(element, {
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
        });
    };

    return (
        <header ref={headerRef} className="fixed left-0 top-0 z-50 w-full px-4 py-4">
            <nav
                ref={navRef}
                className="navbar-glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 md:px-7"
            >
                <a
                    ref={logoRef}
                    href="#home"
                    className="logo-gradient text-xl font-bold tracking-tight md:text-2xl"
                >
                    Imam<span className="text-[#ff9494]">.</span>
                </a>

                <div className="hidden items-center gap-2 md:flex">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.href}
                            href={link.href}
                            ref={(el) => {
                                if (el) linksRef.current[index] = el;
                            }}
                            onMouseEnter={(e) => handleHover(e.currentTarget)}
                            onMouseLeave={(e) => handleLeave(e.currentTarget)}
                            className={`nav-link ${activeLink === link.href ? "active" : ""}`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="#contact"
                        className="hidden rounded-full bg-[#ff9494] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(255,148,148,0.45)] transition hover:-translate-y-0.5 hover:bg-[#ff7f7f] md:inline-flex"
                    >
                        Hire Me
                    </a>

                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="theme-toggle-btn"
                        aria-label="Toggle theme"
                    >
                        {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="mobile-menu-btn md:!hidden"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div
                    ref={mobileMenuRef}
                    className="mobile-glass mx-auto mt-3 max-w-6xl overflow-hidden rounded-3xl px-5 py-5 md:hidden"
                >
                    <div className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`mobile-nav-link ${activeLink === link.href ? "active" : ""
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}

                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="mt-2 rounded-full bg-[#ff9494] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_30px_rgba(255,148,148,0.4)]"
                        >
                            Hire Me
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}