import { Mail } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";

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
                         <a
                                        href="https://github.com/imamhossenbu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Github"
                                        className="contact-social-link"
                                      >
                                        <FaGithub size={19} />
                                      </a>
                        
                                      {/* LinkedIn */}
                                      <a
                                        href="https://linkedin.com/in/imam-hossen-ub"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                        className="contact-social-link"
                                      >
                                        <FaLinkedinIn size={19} />
                                      </a>
                        
                                      {/* Email */}
                                      <a
                                        href="mailto:ihossen22.cse@bu.ac.bd"
                                        aria-label="Email"
                                        className="contact-social-link"
                                      >
                                        <Mail size={19} />
                                      </a>
                        
                                      {/* Facebook */}
                                      <a
                                        href="https://facebook.com/imamhossainbu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook"
                                        className="contact-social-link"
                                      >
                                        <FaFacebook size={19} />
                                      </a>
                    </div>
                </div>

                <p className="right mt-6 text-center text-sm font-semibold">
                    © {new Date().getFullYear()} Imam Hossen. All rights reserved.
                </p>
            </div>
        </footer>
    );
}