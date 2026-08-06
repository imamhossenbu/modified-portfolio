type Speed = "slow" | "mid" | "fast" | "super";
type Shape = "dot" | "node";

interface ParticleGroup {
  speed: Speed;
  count: number;
  sizeMin: number;
  sizeMax: number;
  shape: Shape;
}

// Four speed groups, same rhythm as before — but generated from config
// instead of 60 hand-placed divs, so tuning density/speed later is a
// one-line change, not a find-and-replace across the file.
const GROUPS: ParticleGroup[] = [
  { speed: "slow", count: 15, sizeMin: 8, sizeMax: 16, shape: "dot" },
  { speed: "mid", count: 15, sizeMin: 8, sizeMax: 14, shape: "node" },
  { speed: "fast", count: 15, sizeMin: 6, sizeMax: 12, shape: "dot" },
  { speed: "super", count: 10, sizeMin: 6, sizeMax: 10, shape: "node" },
];

const SPEED_CLASS: Record<Speed, string> = {
  slow: "animate-p-slow",
  mid: "animate-p-mid",
  fast: "animate-p-fast",
  super: "animate-p-super",
};

// Alternating copper / signal-blue / soft tones — matches the schematic
// palette instead of the old single blue+amber pairing.
const COLOR_CLASSES = [
  "bg-accent/60 dark:bg-accent/40 border-accent/25",
  "bg-blue-main/55 dark:bg-blue-main/35 border-blue-main/20",
  "bg-accent-soft/55 dark:bg-accent-soft/30 border-accent-soft/20",
  "bg-blue-soft/55 dark:bg-blue-soft/30 border-blue-soft/15",
];

const DELAY_CLASSES = [
  "",
  "pd-1",
  "pd-2",
  "pd-3",
  "pd-4",
  "pd-5",
  "pd-6",
  "pd-7",
  "pd-8",
  "pd-9",
  "pd-10",
];

interface Particle {
  key: string;
  left: number;
  size: number;
  colorClass: string;
  shape: Shape;
  speedClass: string;
  delayClass: string;
}

function buildParticles(): Particle[] {
  const particles: Particle[] = [];
  let index = 0;

  for (const group of GROUPS) {
    for (let i = 0; i < group.count; i++) {
      // Golden-ratio spacing gives an organic-looking spread while
      // staying fully deterministic (no Math.random -> no hydration
      // mismatch between server and client render).
      const left = (index * 61.803) % 100;
      const span = group.sizeMax - group.sizeMin;
      const size = group.sizeMin + (span > 0 ? index % (span + 1) : 0);

      particles.push({
        key: `${group.speed}-${i}`,
        left,
        size,
        colorClass: COLOR_CLASSES[index % COLOR_CLASSES.length],
        shape: group.shape,
        speedClass: SPEED_CLASS[group.speed],
        delayClass: DELAY_CLASSES[index % DELAY_CLASSES.length],
      });

      index++;
    }
  }

  return particles;
}

const PARTICLES = buildParticles();

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-1 overflow-hidden pointer-events-none select-none">
      {PARTICLES.map((p) => (
        <div
          key={p.key}
          className={`absolute border-[0.5px] ${p.colorClass} ${p.speedClass} ${p.delayClass} ${
            p.shape === "node" ? "rotate-45 rounded-[3px]" : "rounded-full"
          }`}
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
        />
      ))}

      {/* Schematic scanline sweep — the unique signature of this
          background: two slow passes, copper going right, signal-blue
          going left, like a system doing a live scan of the page. */}
      <div className="bg-scanline" />
      <div className="bg-scanline reverse" style={{ animationDelay: "7s" }} />
    </div>
  );
}
