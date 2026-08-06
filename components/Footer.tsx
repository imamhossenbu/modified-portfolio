import { Mail } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";

const SOCIAL_LINKS = [
  {
    label: "Github",
    href: "https://github.com/imamhossenbu",
    icon: FaGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/imam-hossen-ub",
    icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:ihossen22.cse@bu.ac.bd",
    icon: Mail,
    external: false,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/imamhossainbu",
    icon: FaFacebook,
    external: true,
  },
] as const;

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-10 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-5 border-t border-glass-border pt-8 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="logo-gradient text-2xl font-bold">
              Imam<span className="text-accent">.</span>
            </h3>

            <p className="hero-description mt-2 text-sm">
              Full Stack Developer — building clean and modern web experiences.
            </p>

            <span className="mt-3 hidden items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent md:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Available for work
            </span>
          </div>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="contact-social-link"
              >
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>

        <p className="right mt-6 text-center font-mono text-xs font-semibold uppercase tracking-wider">
          © {new Date().getFullYear()} Imam Hossen — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
