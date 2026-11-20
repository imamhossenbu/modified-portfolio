"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, Check, Copy, MessageCircle, Phone, X } from "lucide-react";
import { SiMessenger, SiWhatsapp } from "react-icons/si";
import toast from "react-hot-toast";

const EMAIL = "imam62310@gmail.com";

const CHANNELS = [
  {
    name: "WhatsApp",
    detail: "Chat on WhatsApp",
    href: "https://wa.me/8801624994532",
    icon: SiWhatsapp,
    color: "#25D366",
    external: true,
  },
  {
    name: "Messenger",
    detail: "Message on Facebook",
    href: "https://m.me/imamhossainbu",
    icon: SiMessenger,
    color: "#0084FF",
    external: true,
  },
  {
    name: "Call",
    detail: "+880 1624-994532",
    href: "tel:+8801624994532",
    icon: Phone,
    color: "#ff4d00",
    external: false,
  },
];

/**
 * "Let's talk" launcher: a dark pill in the corner that unfolds into a small
 * card listing every way to reach out, revealed in a circle from the button.
 */
export default function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { clipPath: "circle(0% at 100% 100%)" },
        { clipPath: "circle(150% at 100% 100%)", duration: 0.7, ease: "power3.out" },
      );
      gsap.fromTo(
        ".talk-row, .talk-head, .talk-copy",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.12, ease: "power3.out" },
      );
    }, panelRef);

    const handleOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);

    return () => {
      ctx.revert();
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success("Email copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy. Please copy it manually.");
    }
  };

  return (
    <div ref={wrapRef} className="talk">
      {open && (
        <div ref={panelRef} className="talk-panel" role="dialog" aria-label="Contact options">
          <div className="talk-head">
            <p>Let&apos;s talk</p>
            <span>Pick whichever is easiest for you.</span>
          </div>

          {CHANNELS.map(({ name, detail, href, icon: Icon, color, external }) => (
            <a
              key={name}
              href={href}
              target={external ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="talk-row"
              style={{ "--c": color } as React.CSSProperties}
            >
              <span className="talk-row-icon">
                <Icon />
              </span>
              <span className="talk-row-text">
                <b>{name}</b>
                <i>{detail}</i>
              </span>
              <ArrowUpRight className="talk-row-arrow" />
            </a>
          ))}

          <button type="button" onClick={copyEmail} className="talk-copy">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Copied" : EMAIL}</span>
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`talk-btn ${open ? "is-open" : ""}`}
        aria-label={open ? "Close contact options" : "Open contact options"}
        aria-expanded={open}
      >
        <span className="talk-btn-icon">
          <MessageCircle />
          <X />
        </span>
        <span className="talk-btn-label">{open ? "Close" : "Let's talk"}</span>
        <i className="talk-dot" />
      </button>
    </div>
  );
}
