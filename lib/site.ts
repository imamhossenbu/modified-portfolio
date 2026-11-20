/** Single source of truth for SEO and structured data. */
export const site = {
  /** Production origin. Override with NEXT_PUBLIC_SITE_URL on other hosts. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://imamhossen.vercel.app").replace(/\/$/, ""),
  name: "Imam Hossen",
  role: "Full Stack Developer",
  title: "Imam Hossen — Full Stack Developer",
  description:
    "Imam Hossen is a Full Stack Developer from Barishal, Bangladesh, building responsive, fast and user-friendly web and mobile apps with Next.js, TypeScript, Node.js and Flutter.",
  email: "imam62310@gmail.com",
  phone: "+8801624994532",
  location: { city: "Barishal", country: "Bangladesh", countryCode: "BD" },
  employer: "Adsfixter",
  university: "University of Barishal",
  socials: [
    "https://github.com/imamhossenbu",
    "https://linkedin.com/in/imam-hossen-ub",
    "https://facebook.com/imamhossainbu",
  ],
  keywords: [
    "Imam Hossen",
    "Full Stack Developer",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Flutter developer",
    "Web developer Bangladesh",
    "Barishal",
    "Portfolio",
  ],
};
