import { Code, Cpu, Globe } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const techStack = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

const highlights = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Creating responsive, high-performance web applications with React, PHP, and modern frameworks.",
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    description:
      "Building intelligent systems with TensorFlow, Scikit-learn, and computer vision applications.",
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description:
      "End-to-end application development with databases, APIs, and modern dev practices.",
  },
];

export const AboutSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding px-4 relative"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="reveal">
          <h2 className="section-heading">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subheading">
            Software Engineering student at UET Lahore with a passion for
            building innovative solutions.
          </p>
        </div>

        {/* Bio area */}
        <div className="reveal flex flex-col md:flex-row items-center gap-12 mb-20">
          {/* Avatar with decorative frame */}
          <div className="flex-shrink-0 relative">
            {/* Decorative background gradient */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-20 blur-xl -z-10"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent2)))" }}
            />
            <div className="profile-img-wrap w-52 h-52 md:w-64 md:h-64 rounded-2xl border-2 border-primary/20 shadow-xl">
              <img
                src="/img.jpeg"
                alt="Noor Asghar — Software Engineer"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML =
                    '<div class="w-full h-full flex items-center justify-center text-6xl font-display font-bold gradient-text">N</div>';
                }}
              />
            </div>
            {/* Corner accent */}
            <div
              className="absolute -bottom-3 -right-3 w-20 h-20 rounded-2xl -z-10"
              style={{ background: "hsl(var(--primary) / 0.12)" }}
            />
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left space-y-5">
            <h3>
              Software Engineer &{" "}
              <span className="gradient-text">AI Enthusiast</span>
            </h3>
            <p className="leading-relaxed text-[1.05rem]" style={{ color: "hsl(var(--muted-foreground))" }}>
              I am a Software Engineering student at the University of
              Engineering and Technology, Lahore, with a strong foundation in web
              development and a passion for AI-driven solutions. My expertise
              spans across multiple programming languages and frameworks, from
              traditional web technologies to cutting-edge AI and machine
              learning tools. I specialize in creating solutions that solve
              real-world problems.
            </p>
            <a href="#contact" className="btn-primary inline-flex mt-2">
              Let's Connect
            </a>
          </div>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 reveal-stagger">
          {highlights.map((item) => (
            <div key={item.title} className="card p-7 reveal">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "hsl(var(--primary) / 0.1)" }}
              >
                <item.icon className="h-7 w-7" style={{ color: "hsl(var(--primary))" }} />
              </div>
              <h4 className="text-lg font-bold mb-2">{item.title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="reveal">
          <h4 className="text-center font-bold mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
            Tech Stack
          </h4>
          <div className="flex flex-wrap justify-center gap-5">
            {techStack.map((tech) => (
              <div key={tech.name} className="tooltip-wrapper">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-250 hover:-translate-y-2"
                  style={{
                    background: "hsl(var(--card))",
                    border: "1.5px solid hsl(var(--border))",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-8 h-8"
                    loading="lazy"
                  />
                </div>
                <span className="tooltip-text">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
