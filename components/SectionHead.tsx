import RevealText from "@/components/motion/RevealText";

type SectionHeadProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  /** Headers are centred by default; "left" puts index and title side by side. */
  align?: "left" | "center";
};

/** Editorial section opener: index + label on the left, oversized title. */
export default function SectionHead({
  index,
  label,
  title,
  description,
  align = "center",
}: SectionHeadProps) {
  return (
    <header className={`sec-head ${align === "center" ? "is-center" : ""}`}>
      <p className="sec-head-meta" data-reveal>
        <span className="sec-head-index">{index}</span>
        <span>{label}</span>
      </p>

      <div>
        <RevealText className="sec-head-title" text={title} />
        {description && (
          <p className="sec-head-desc" data-reveal>
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
