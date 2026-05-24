export type ProjectCategory = "frontend" | "fullstack" | "landing" | "ai";

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: ProjectCategory;
  type: string;
  shortDescription: string;
  description: string;
  image: string;
  tech: string[];
  features: string[];
  live: string;
  github: string;
  featured?: boolean;
};

export const projectCategories = [
  { label: "All", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Landing Page", value: "landing" },
  { label: "AI", value: "ai" },
];

export const projects: Project[] = [
  {
    id: 1,
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    category: "frontend",
    type: "Frontend Website",
    shortDescription:
      "Modern personal portfolio with animations and theme system.",
    description:
      "A modern personal portfolio website built with Next.js, TypeScript, Tailwind CSS, GSAP animation, dark/light theme, responsive layout, and clean reusable components.",
    image: "/images/projects/sell1.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    features: [
      "Responsive hero section",
      "Dark and light theme",
      "GSAP scroll animations",
      "Category based project section",
      "Modern glassmorphism UI",
    ],
    live: "#",
    github: "#",
    featured: true,
  },
  {
    id: 2,
    slug: "admin-dashboard",
    title: "Admin Dashboard",
    category: "fullstack",
    type: "Full Stack Application",
    shortDescription: "Dashboard with auth, analytics, users and database.",
    description:
      "A complete admin dashboard application with authentication, protected routes, analytics cards, user management, database integration, and clean dashboard UI.",
    image: "/images/projects/dashboard.png",
    tech: ["Next.js", "Node.js", "Prisma", "PostgreSQL"],
    features: [
      "Authentication system",
      "Protected dashboard routes",
      "Analytics overview cards",
      "User management",
      "Database integration with Prisma",
    ],
    live: "#",
    github: "#",
    featured: true,
  },
  {
    id: 3,
    slug: "ecommerce-platform",
    title: "E-commerce Platform",
    category: "fullstack",
    type: "Full Stack E-commerce",
    shortDescription: "Product listing, cart, checkout and admin features.",
    description:
      "A responsive e-commerce platform with product listing, cart system, checkout flow, admin panel, and order management functionality.",
    image: "/images/projects/ecommerce.png",
    tech: ["Next.js", "MongoDB", "Express.js", "Tailwind CSS"],
    features: [
      "Product listing page",
      "Cart system",
      "Checkout flow",
      "Admin product management",
      "Order management",
    ],
    live: "#",
    github: "#",
  },
  {
    id: 4,
    slug: "saas-landing-page",
    title: "SaaS Landing Page",
    category: "landing",
    type: "Landing Page",
    shortDescription: "Conversion-focused SaaS landing page.",
    description:
      "A clean and conversion-focused landing page for a SaaS product with pricing, features, testimonials, and call-to-action sections.",
    image: "/images/projects/saas-landing.png",
    tech: ["React", "Tailwind CSS", "GSAP"],
    features: [
      "Hero section",
      "Feature blocks",
      "Pricing section",
      "Testimonials",
      "CTA section",
    ],
    live: "#",
    github: "#",
  },
  {
    id: 5,
    slug: "agency-website",
    title: "Agency Website",
    category: "landing",
    type: "Business Landing Page",
    shortDescription: "Professional agency website with smooth UI.",
    description:
      "A professional agency landing page designed with smooth sections, service highlights, responsive layout, and polished UI.",
    image: "/images/projects/agency.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "Service section",
      "Portfolio preview",
      "Responsive design",
      "Smooth animations",
      "Contact CTA",
    ],
    live: "#",
    github: "#",
  },
  {
    id: 6,
    slug: "ai-content-generator",
    title: "AI Content Generator",
    category: "ai",
    type: "AI Web Application",
    shortDescription: "AI tool for generating content from prompts.",
    description:
      "An AI-powered content generation tool where users can create text content from prompts using a clean dashboard-style interface.",
    image: "/images/projects/ai-content.png",
    tech: ["Next.js", "Generative AI", "API", "Tailwind CSS"],
    features: [
      "Prompt input system",
      "AI generated responses",
      "Clean dashboard UI",
      "Copy generated content",
      "Responsive layout",
    ],
    live: "#",
    github: "#",
    featured: true,
  },
  {
    id: 7,
    slug: "ai-chat-assistant",
    title: "AI Chat Assistant",
    category: "ai",
    type: "AI Chat Application",
    shortDescription: "Chatbot-style AI assistant interface.",
    description:
      "A chatbot-style web application with prompt handling, response display, conversation layout, and modern user experience.",
    image: "/images/projects/ai-chat.png",
    tech: ["React", "Node.js", "Generative AI", "MongoDB"],
    features: [
      "Chat interface",
      "Prompt and response flow",
      "Conversation layout",
      "Backend API integration",
      "Message history support",
    ],
    live: "#",
    github: "#",
  },
  {
    id: 8,
    slug: "product-showcase",
    title: "Product Showcase",
    category: "frontend",
    type: "Frontend UI",
    shortDescription: "Clean product showcase website.",
    description:
      "A visually polished product showcase website with responsive cards, smooth hover effects, and clean section-based layout.",
    image: "/images/projects/product-showcase.png",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    features: [
      "Product cards",
      "Responsive grid",
      "Hover effects",
      "Clean UI layout",
      "Mobile-friendly design",
    ],
    live: "#",
    github: "#",
  },
];
