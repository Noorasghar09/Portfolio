import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export const Home = () => {
  useEffect(() => {
    // Dismiss the HTML preloader once the app is mounted and painted
    requestAnimationFrame(() => {
      window.__hidePreloader?.();
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden no-scrollbar">
      <StarBackground />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};
