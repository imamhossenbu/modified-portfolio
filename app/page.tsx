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
    <main className="space-y-10">
      <Hero />

      <section id="about" >
        <About />
      </section>

      <section id="experience" >
        <Experience />
      </section>

      <section id="skills" >
        <Skills />
      </section>

      <section id="projects" >
        <Projects />
      </section>

      

      <section id="clients">
        <Testimonials />
      </section>

      <section id="insights" >
        <Insights />
      </section>

      <section id="contact" >
        < Contact />
      </section>
    </main>
  );
}