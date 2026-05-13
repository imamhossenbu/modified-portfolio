import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Insights from "@/components/Insights";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />

      <section id="about" className="min-h-screen">
        <About />
      </section>

      <section id="skills" className="min-h-screen">
        <Skills />
      </section>

      <section id="projects" className="min-h-screen">
        <Projects />
      </section>

      <section id="experience" className="min-h-screen">
        <Experience />
      </section>

      <section id="clients" className="min-h-screen">
        <Testimonials />
      </section>

      <section id="insights" className="min-h-screen">
        <Insights />
      </section>

      <section id="contact" className="min-h-screen">
        < Contact />
      </section>
    </main>
  );
}