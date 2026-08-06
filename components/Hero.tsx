"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ReactTyped } from "react-typed";
import { Mail, Download } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaFacebook } from "react-icons/fa";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const socialsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { x: -70, opacity: 0, filter: "blur(10px)" },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power4.out",
        },
      )
        .fromTo(
          imageRef.current,
          { y: 80, opacity: 0, scale: 0.88, rotate: -4 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.1,
            ease: "back.out(1.4)",
          },
          "-=0.55",
        )
        .fromTo(
          cardRef.current,
          { x: 70, opacity: 0, filter: "blur(10px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
          },
          "-=0.75",
        )
        .fromTo(
          socialsRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.45",
        );

      gsap.to(".hero-float-icon", {
        y: -16,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.25,
      });

      gsap.to(".hero-image-glow", {
        scale: 1.08,
        opacity: 0.75,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero-section relative flex items-center overflow-visible px-5 py-28 md:px-10 lg:px-12"
    >
      <div className="hero-bg-orb hero-orb-one" />
      <div className="hero-bg-orb hero-orb-two" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.05fr_0.9fr]">
        <div ref={titleRef} className="z-10 text-center lg:text-left">
          <p className="mono-text designation-text mb-4 inline-flex rounded-full border border-[var(--accent-dim)] bg-[var(--panel-soft)] px-4 py-2 text-sm font-semibold text-[var(--accent)] backdrop-blur-md">
            Full Stack Developer
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight text-[var(--foreground)] md:text-5xl">
            Hi, I&apos;m <br />
            <span className="gradient-text">Imam Hossen</span>
          </h1>

          <h2 className="hero-subtitle hero-typed-heading mb-6 text-2xl font-semibold md:text-3xl">
            <span>I build </span>

            <span className="hero-typed-text hero-typed-fixed">
              <ReactTyped
                strings={[
                  "Modern Websites",
                  "Full Stack Apps",
                  "Clean UI Designs",
                  "Scalable Web Solutions",
                ]}
                typeSpeed={70}
                backSpeed={40}
                backDelay={1200}
                loop
              />
            </span>
          </h2>

          <p className="hero-description mx-auto mb-8 max-w-xl text-base leading-8 lg:mx-0">
            I create responsive, fast, and user-friendly web applications using
            Next.js, TypeScript, Tailwind CSS, and modern backend technologies.
          </p>

          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            <a
              href="#projects"
              className="primary-btn rounded-full px-7 py-3 text-sm font-bold shadow-none"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="hero-contact-btn rounded-full px-7 py-3 text-sm font-bold shadow-none"
            >
              Contact Me
            </a>
          </div>

          <div
            ref={socialsRef}
            className="mt-10 flex justify-center gap-4 lg:justify-start"
          >
            <a
              href="https://github.com/imamhossenbu"
              target="_blank"
              className="hero-social-link shadow-none"
              aria-label="Github"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/imam-hossen-ub"
              target="_blank"
              className="hero-social-link shadow-none"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </a>

            <a
              href="mailto:imam62310@gmail.com"
              target="_blank"
              className="hero-social-link shadow-none"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://www.facebook.com/imamhossainbu"
              target="_blank"
              className="hero-social-link shadow-none"
              aria-label="Facebook"
            >
              <FaFacebook size={18} />
            </a>
          </div>
        </div>

        <div ref={imageRef} className="hero-image-wrapper">
          <div className="hero-orbit">
            <span className="orbit-dot orbit-dot-one" />
            <span className="orbit-dot orbit-dot-two" />
            <span className="orbit-dot orbit-dot-three" />

            <div className="hero-image-inner">
              <Image
                src="/images/imam.png"
                alt="Imam Hossen"
                fill
                priority
                className="drop-shadow-none"
              />
            </div>
          </div>
        </div>

        <div ref={cardRef} className="z-10">
          <div className="soft-card rounded-4xl p-6 shadow-none">
            <div className="mb-5 h-1 w-14 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-soft)]" />

            <h3 className="mb-4 text-2xl font-bold text-[var(--foreground)]">
              Available for Projects
            </h3>

            <p className="hero-card-description mb-6 leading-7">
              I help businesses and individuals build professional web apps,
              portfolios, dashboards, and modern digital products.
            </p>

            <div className="space-y-4">
              <div className="hero-info-row shadow-none">
                <span>Role</span>
                <strong>Full Stack Developer</strong>
              </div>

              <div className="hero-info-row shadow-none">
                <span>Focus</span>
                <strong>Next.js + TypeScript</strong>
              </div>

              <div className="hero-info-row shadow-none">
                <span>Status</span>
                <strong className="text-[var(--accent)]">Open to Work</strong>
              </div>
            </div>

            <a
              href="/resume.pdf"
              download="Imam-Hossen-CV.pdf"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full primary-btn px-6 py-3 text-sm font-bold shadow-none"
            >
              <Download size={18} />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
