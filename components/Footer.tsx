import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer-section">
            <div className="mx-auto max-w-7xl px-5 py-8 md:px-10 lg:px-16">
                <div className="flex flex-col items-center justify-between gap-5 border-t border-[#ff9494]/20 pt-8 md:flex-row">
                    <div className="text-center md:text-left">
                        <h3 className="logo-gradient text-2xl font-bold">
                            Imam<span className="text-[#ff9494]">.</span>
                        </h3>

                        <p className="hero-description mt-2 text-sm">
                            Full Stack Developer — building clean and modern web experiences.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a href="#" className="footer-social-link" aria-label="Github">
                            <FaGithub size={18} />
                        </a>

                        <a href="#" className="footer-social-link" aria-label="LinkedIn">
                            <FaLinkedinIn size={18} />
                        </a>

                        <a
                            href="mailto:imam@example.com"
                            className="footer-social-link"
                            aria-label="Email"
                        >
                            <Mail size={18} />
                        </a>
                    </div>
                </div>

                <p className="mt-6 text-center text-sm font-semibold text-black/50 dark:text-white/50">
                    © {new Date().getFullYear()} Imam Hossen. All rights reserved.
                </p>
            </div>
        </footer>
    );
}