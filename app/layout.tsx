import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/provider/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingCTA from "@/components/FloatingCTA";
import { Toaster } from "react-hot-toast";
import { site } from "@/lib/site";
import Preloader from "@/components/motion/Preloader";

// Display: characterful grotesque for headings. Body: neutral, very legible.
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  keywords: site.keywords,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

/* Structured data: tells search engines who this site is about. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: `${site.url}/images/imam.jpeg`,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      telephone: site.phone,
      description: site.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressCountry: site.location.countryCode,
      },
      worksFor: { "@type": "Organization", name: site.employer },
      alumniOf: { "@type": "CollegeOrUniversity", name: site.university },
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "NestJS",
        "Flutter",
        "MongoDB",
        "PostgreSQL",
      ],
      sameAs: site.socials,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.title,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <SmoothScroll>
            <Preloader />
            <CustomCursor />
            <Navbar />
            <FloatingCTA/>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}