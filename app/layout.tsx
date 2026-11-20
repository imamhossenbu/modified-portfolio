import type { Metadata } from "next";
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
import BackgroundParticles from "@/components/BackgroundParticles";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingCTA from "@/components/FloatingCTA";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Toaster } from "react-hot-toast";
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
  title: "Imam Hossen | Full Stack Developer",
  description:
    "Personal portfolio of Imam Hossen, a Full Stack Developer specializing in modern web applications.",
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
      <body className="min-h-full">
        <ThemeProvider>
          <SmoothScroll>
            <Preloader />
            <CustomCursor />
            <Navbar />
            <BackgroundParticles />
            <FloatingCTA/>
            {/* <AnimatedBackground /> */}
            <Toaster position="top-center" reverseOrder={false} />
            {children}
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}