import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const projects = [
  {
    id: 1,
    title: "AI-Powered Multifunctional Chatbot",
    description:
      "Built a chatbot with multimodal AI interactions using Gradio and Hugging Face for natural language processing.",
    image: "/projects/project1.png",
    tags: ["Python", "Gradio", "Hugging Face", "AI"],
    category: "AI/ML",
    githubUrl: "https://github.com/Noorasghar09/Multifunctional_chatbot.git",
  },
  {
    id: 2,
    title: "Lung Cancer Detection using ML",
    description:
      "Developed machine learning models for lung cancer prediction with EDA and feature engineering techniques.",
    image: "/projects/project2.png",
    tags: ["Python", "Scikit-learn", "ML"],
    category: "AI/ML",
    githubUrl:
      "https://github.com/Noorasghar09/Lung_Cancer_Detection_using_ML.git",
  },
  {
    id: 3,
    title: "Multi-Brand E-Commerce Platform",
    description:
      "Built a responsive eCommerce platform with React, Redux, and Tailwind CSS for seamless shopping.",
    image: "/projects/project3.png",
    tags: ["React", "Redux", "Tailwind CSS"],
    category: "Web",
    githubUrl: "https://github.com/Noorasghar09/E-Commerce-Website.git",
  },
  {
    id: 4,
    title: "Online Tutoring Platform",
    description:
      "Developed a comprehensive tutoring site with PHP, MySQL, and Stripe API for secure payments.",
    image: "/projects/project4.png",
    tags: ["PHP", "MySQL", "Stripe API"],
    category: "Web",
    githubUrl: "https://github.com/Noorasghar09/Studypool_clone.git",
  },
  {
    id: 5,
    title: "Weather Data Analysis",
    description:
      "Analyzed historical weather data with C#, SQL, and Power BI for comprehensive data visualization.",
    image: "/projects/project5.png",
    tags: ["C#", "SQL", "Power BI"],
    category: "Data",
    githubUrl:
      "https://github.com/Noorasghar09/Historical_Weather_Data_Analysis.git",
  },
  {
    id: 6,
    title: "Space Shooter Game",
    description:
      "Implemented scoring, health, game loop, and collision detection using C++, C#, OOP, and .NET.",
    image: "/projects/project6.png",
    tags: ["C++", "C#", "OOP"],
    category: "Other",
    githubUrl: "https://github.com/Noorasghar09/Space_Shooter_Game.git",
  },
];

const filters = ["All", "Web", "AI/ML", "Data", "Other"];

export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useScrollReveal();
  const gridRef = useRef(null);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Re-reveal project cards when the filter changes
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    // Immediately make all new cards visible with a staggered animation
    const cards = el.querySelectorAll(".project-card");
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      requestAnimationFrame(() => {
        setTimeout(() => {
          card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, i * 80);
      });
    });
  }, [activeFilter]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding px-4 relative"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="reveal">
          <h2 className="section-heading">
            Latest <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subheading">
            Here are some of my recent projects showcasing expertise in web
            development, AI/ML, and software engineering.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="reveal flex flex-wrap justify-center gap-2.5 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background:
                  activeFilter === f
                    ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent2)))"
                    : "hsl(var(--card))",
                color: activeFilter === f ? "#fff" : "hsl(var(--muted-foreground))",
                border: "1.5px solid",
                borderColor:
                  activeFilter === f
                    ? "transparent"
                    : "hsl(var(--border))",
                boxShadow:
                  activeFilter === f
                    ? "0 4px 14px hsl(var(--primary) / 0.3)"
                    : "none",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <div
              key={project.id}
              className="card group overflow-hidden project-card"
            >
              {/* Image with hover overlay */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary) / 0.85), hsl(var(--accent2) / 0.85))",
                  }}
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github size={20} />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4
                  className="text-base font-bold mb-2 transition-colors duration-200"
                  style={{ color: "hsl(var(--card-foreground))" }}
                >
                  {project.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="reveal text-center mt-14">
          <a
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Noorasghar09"
          >
            View All on GitHub
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
