import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";
import VelocityMarquee from "@/components/motion/VelocityMarquee";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <VelocityMarquee />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Insights />
      <Contact />
    </main>
  );
}
