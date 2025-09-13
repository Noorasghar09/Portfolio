import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-dark text-light"
    >
      <div className="container max-w-5xl mx-auto text-center z-10 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Profile Image with Neon Glow */}
        <div className="flex-shrink-0 mb-8 md:mb-0">
          <img
            src="/img.jpeg"
            alt="Profile"
            className="w-56 h-56 md:w-72 md:h-72 rounded-full neon-glow border-4 border-accent object-cover"
          />
        </div>
        <div className="space-y-6 flex-1">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-light">
            Hello, It's Me
            <br />
            <span className="text-accent">Noor Asghar</span>
            <br />
            I'm a <span className="text-accent">Software Engineer | AI and Web Enthusiast</span>
          </h1>

          {/* Description removed as requested */}

          {/* Social Icons */}
          <div className="flex justify-center gap-4 pt-2">
            <a href="https://www.linkedin.com/in/noor-asghar" target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-dark transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.059-1.864-3.059-1.866 0-2.152 1.458-2.152 2.966v5.697h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.564 2.84-1.564 3.039 0 3.602 2.002 3.602 4.605v5.592z"/></svg>
            </a>
            <a href="mailto:noorasghar2004@gmail.com" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-dark transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 13.065l-11.2-7.065h22.4l-11.2 7.065zm0 2.27l-12-7.835v13.5h24v-13.5l-12 7.835z"/></svg>
            </a>
            <a href="tel:+923044608290" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-dark transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h4.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z"/></svg>
            </a>
          </div>

          <div className="pt-4">
            <a href="#projects" className="button-neon px-6 py-3 text-base md:px-8 md:py-4 md:text-lg">
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-grayText mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-accent" />
      </div>
    </section>
  );
};
