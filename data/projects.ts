export type ProjectCategory = "frontend" | "fullstack" | "landing" | "ai";

export type ProjectGithub = {
  frontend?: string;
  backend?: string;
  socket?: string;
};

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
  github: ProjectGithub;
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
    slug: "savory-nest",
    title: "Savory Nest",
    category: "fullstack",
    type: "Full Stack Website",
    shortDescription: "Stellar Way — E-Commerce & Delivery Platform",
    description:
      "A full-featured e-commerce and delivery management platform built with **Next.js 16**, featuring real-time order tracking, live rider messaging, rider application management, and a comprehensive admin dashboard.",
    image: "/images/projects/stellar-way.png",
    tech: [
      "Next.js",
      "MongoDB",
      "Tailwind CSS",
      "GSAP",
      "Socket.io",
      "Node.js",
      "Express.js",
      "Mongoose",
      "JWT",
      "TypwScript",
      "NextAuth",
      "Tanstack Query",
      "Axios",
      "Recharts",
      "Leaflet",
      "React Hook Form ",
      "Swiper",
      "jsPDF",
      "cloudinary",
      "Multer",
      "Nodemailer",
      "Stripe",
      "SSLCommerz",
    ],
    features: [
      "Browse products and place orders",
      "Real-time order tracking with live map view",
      "Live chat with assigned delivery rider",
      "QR code support for orders",
      "Apply to become a delivery rider",
      "In-app messaging with customers",
      "Delivery history and earnings overview",
      "Real-time location sharing",
    ],
    live: "https://stellar-way-coral.vercel.app",
    github: {
      frontend: "https://github.com/imamhossenbu/stellar-way",
      backend: "https://github.com/imamhossenbu/stellar-way-server",
    },
    featured: true,
  },
  {
    id: 2,
    slug: "sell-point",
    title: "Sell Point",
    category: "fullstack",
    type: "Full Stack Website",
    shortDescription:
      "Modern house selling website with animations and theme system.",
    description:
      "SellPoint is a modern full-stack e-commerce management platform where the admin can manage products, users, and orders through a powerful dashboard. The website includes real-time chat using Socket.io for instant communication, subscription management for premium services, authentication, and an intuitive user interface for seamless buying and selling experiences.",
    image: "/images/projects/sell1.png",
    tech: [
      "Next.js",
      "MongoDB",
      "Tailwind CSS",
      "GSAP",
      "Socket.io",
      "Node.js",
      "Express.js",
      "Mongoose",
      "JWT",
    ],
    features: [
      "Comprehensive Multi-Vendor Ecosystem featuring dedicated and secure dashboards tailored for both Buyers and Sellers.",
      "Real-time Instant Messaging framework engineered using Socket.io for continuous, low-latency communication between users.",
      "Live Persistent Notification engine delivering instantaneous, non-blocking updates for order actions and new messages.",
      "Highly Responsive UI/UX crafted with Next.js and Tailwind CSS, maintaining consistent performance across all screen scales.",
      "Secure JWT-based Authentication system integrated with centralized state management for protected route validation.",
    ],
    live: "https://sell-point.netlify.app",
    github: {
      frontend: "https://github.com/imamhossenbu/sellpoint-frontend",
      backend: "https://github.com/imamhossenbu/sellpoint-server",
      socket: "https://github.com/imamhossenbu/sellpoint-socket",
    },
    featured: true,
  },
  {
    id: 3,
    slug: "smart-cse",
    title: "Smart CSE",
    category: "fullstack",
    type: "Full Stack Application",
    shortDescription:
      "Complete CSE department management system for students, teachers & admin.",
    description:
      "A comprehensive academic management platform for the CSE department. Students can track attendance, results, and class schedules. Teachers manage courses, mark attendance, and publish grades. Admins oversee the entire department with analytics, user approvals, and notice management.",
    image: "/images/projects/smart-cse.png",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "NextAuth",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Cloudinary",
      "Nodemailer",
      "React Hook Form",
      "Zod",
      "Recharts",
      "jsPDF",
      "Framer Motion",
    ],
    features: [
      "Role-based access for student, teacher, and admin",
      "Student dashboard with CGPA, attendance rate, and today's schedule",
      "Automatic grade and GPA calculation from marks breakdown",
      "Attendance tracking with monthly reports per course",
      "Class routine and schedule management with room conflict detection",
      "Result publishing with full transcript and PDF export",
      "Department notices with priority sorting and image support",
      "Faculty profiles and course assignment management",
      "Student feedback and course rating system",
      "Classroom allocation and management",
      "Pending user approval workflow for admin",
      "Password reset via email with secure token",
      "Image uploads via Cloudinary",
      "Admin analytics dashboard with department-wide stats",
    ],
    live: "https://smart-cse-three.vercel.app",
    github: {
      frontend: "https://github.com/adsfixterintern/smart-cse",
      backend: "https://github.com/adsfixterintern/smart-cse-server",
    },
    featured: true,
  },
  {
    id: 4,
    slug: "seoul-mirage",
    title: "Seoul Mirage",
    category: "fullstack",
    type: "Full Stack E-commerce",
    shortDescription:
      "A modern e-commerce platform with cart, checkout, ratings, and admin dashboard.",
    description:
      "A responsive full-stack e-commerce platform built with Next.js 16. Customers can browse products, manage their cart, and complete checkout. Admins get a dedicated dashboard with analytics charts, product management, and order oversight — all wrapped in smooth Framer Motion animations.",
    image: "/images/projects/ecommerce.png",
    tech: [
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Axios",
      "Recharts",
      "Swiper",
      "React Hot Toast",
      "React Simple Star Rating",
      "React Loading Skeleton",
      "Lucide React",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    features: [
      "Product listing with skeleton loading states",
      "Product detail page with star ratings and reviews",
      "Cart system with quantity management",
      "Smooth checkout flow",
      "Swiper-powered product carousels and banners",
      "Admin dashboard with analytics charts via Recharts",
      "Admin product and order management",
      "Animated UI transitions with Framer Motion",
      "Toast notifications for user feedback",
      "Fully responsive design",
    ],
    live: "https://ecommerce-with-next-drab.vercel.app",
    github: {
      frontend: "https://github.com/imamhossenbu/ecommerce-with-next",
      backend: "https://github.com/imamhossenbu/ecommerce-server",
    },
    featured: false,
  },
  {
    id: 5,
    slug: "cyberfixter",
    title: "CyberFixter",
    category: "frontend",
    type: "Frontend Website",
    shortDescription:
      "Professional cybersecurity company website with modern UI.",
    description:
      "A clean and professional company website for CyberFixter, a cybersecurity services firm. Built with Next.js and TypeScript, it showcases the company's services, expertise, team, and client testimonials with a sleek dark-themed UI.",
    image: "/images/projects/cyberfixter.png",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    features: [
      "Hero section with company tagline and CTA",
      "Services section showcasing cybersecurity offerings",
      "About and team section",
      "Client testimonials",
      "FAQ section",
      "Contact form",
      "Fully responsive dark-themed design",
      "Smooth page transitions and animations",
    ],
    live: "https://www.cyberfixter.com",
    github: {},
    featured: false,
  },
  {
    id: 6,
    slug: "hero-travel",
    title: "Hero Travel",
    category: "landing",
    type: "Landing Page",
    shortDescription:
      "A clean travel landing page showcasing destinations and packages.",
    description:
      "Hero Travel is a static travel landing page built with HTML and Tailwind CSS. It highlights popular destinations and travel packages with a clean layout, smooth design, and fully responsive structure.",
    image: "/images/projects/hero-travel.png",
    tech: ["HTML", "Tailwind CSS"],
    features: [
      "Hero section with travel CTA",
      "Popular destinations showcase",
      "Travel packages section",
      "Responsive layout for all screen sizes",
      "Clean and minimal UI design",
    ],
    live: "https://imamhossenbu.github.io/travel-website",
    github: {
      frontend: "https://github.com/imamhossenbu/travel-website",
    },
    featured: false,
  },
  {
  id: 7,
  slug: "ai-chatbot",
  title: "AI Chatbot",
  category: "ai",
  type: "AI Web Application",
  shortDescription: "Intelligent chatbot powered by LLaMA with real-time web search.",
  description:
    "A smart AI chatbot built with Next.js and powered by the LLaMA API. Users can have natural conversations with the AI, which can also perform real-time web searches to answer questions with up-to-date information.",
  image: "/images/projects/chatbot.png",
  tech: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "LLaMA API",
    "Web Search API",
  ],
  features: [
    "Natural language conversations with LLaMA AI",
    "Real-time web search for up-to-date answers",
    "Chat history within session",
    "Clean and minimal chat UI",
    "Typing indicator and smooth message rendering",
    "Fully responsive design",
  ],
  live: "https://llm-frontend-ten.vercel.app",
  github: {
    frontend: "https://github.com/imamhossenbu/llm-frontend",
  },
  featured: true,
},
  {
    id: 8,
    slug: "ai-chat-assistant",
    title: "AI Chat Assistant",
    category: "ai",
    type: "AI Chat Application",
    shortDescription: "Chatbot-style AI assistant interface.",
    description:
      "A chatbot-style web application with prompt handling, response display, conversation layout, and modern user experience.",
    image: "/images/projects/ai-chat.png",
    tech: [
      "React",
      "Node.js",
      "Generative AI",
      "MongoDB",
      "Tailwind CSS",
      "Express.js",
    ],
    features: [
      "Chat interface",
      "Prompt and response flow",
      "Conversation layout",
      "Backend API integration",
      "Message history support",
    ],
    live: "#",
    github: {
      frontend: "https://github.com/yourusername/ai-chat-frontend",
      backend: "https://github.com/yourusername/ai-chat-backend",
    },
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
    github: {
      frontend: "https://github.com/yourusername/product-showcase",
    },
  },
];
