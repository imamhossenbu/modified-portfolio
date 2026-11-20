"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BrowserFrame from "@/components/BrowserFrame";

type ProjectGalleryProps = {
  title: string;
  /** Desktop screenshots, first one is the cover. */
  shots: string[];
  /** Optional phone-sized screenshot, shown in a device frame. */
  mobile?: string;
  url?: string;
  /** Fit the whole image instead of cropping (used for app mock-ups). */
  contain?: boolean;
};

/** Screenshot viewer: browser frame + thumbnails, with an optional phone view. */
export default function ProjectGallery({
  title,
  shots,
  mobile,
  url,
  contain = false,
}: ProjectGalleryProps) {
  const [active, setActive] = useState(0);
  const many = shots.length > 1;

  const step = useCallback(
    (direction: number) =>
      setActive((index) => (index + direction + shots.length) % shots.length),
    [shots.length],
  );

  useEffect(() => {
    if (!many) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [many, step]);

  return (
    <div className={`gallery ${mobile ? "has-phone" : ""}`}>
      <div className="gallery-main">
        <BrowserFrame url={url}>
          {shots.map((shot, index) => (
            <Image
              key={shot}
              src={shot}
              alt={`${title} — screenshot ${index + 1}`}
              fill
              preload={index === 0}
              sizes="(max-width: 1280px) 100vw, 1000px"
              className={`proj-preview-img ${contain ? "is-contain" : ""} ${
                index === active ? "is-active" : ""
              }`}
            />
          ))}
        </BrowserFrame>

        {many && (
          <div className="gallery-bar">
            <div className="gallery-thumbs">
              {shots.map((shot, index) => (
                <button
                  key={shot}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`gallery-thumb ${index === active ? "is-active" : ""}`}
                  aria-label={`Show screenshot ${index + 1}`}
                  aria-pressed={index === active}
                >
                  <Image src={shot} alt="" fill sizes="140px" className="object-cover object-top" />
                </button>
              ))}
            </div>

            <div className="gallery-nav">
              <span className="gallery-count">
                {String(active + 1).padStart(2, "0")}
                <i>/ {String(shots.length).padStart(2, "0")}</i>
              </span>
              <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot">
                <ArrowLeft size={16} />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next screenshot">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {mobile && (
        <div className="phone-frame">
          <span className="phone-frame-notch" />
          <div className="phone-frame-screen">
            <Image
              src={mobile}
              alt={`${title} on a phone`}
              fill
              sizes="260px"
              className="object-cover object-top"
            />
          </div>
        </div>
      )}
    </div>
  );
}
