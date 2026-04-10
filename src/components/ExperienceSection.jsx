import { Briefcase, GraduationCap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const experiences = [
  {
    type: "education",
    title: "BS Software Engineering",
    organization: "University of Engineering & Technology, Lahore",
    period: "2022 — Present",
    description:
      "Pursuing a degree in Software Engineering with a focus on AI, web development, and software architecture. Consistently on the Dean's list.",
  },
  {
    type: "work",
    title: "AI & Web Development Projects",
    organization: "Freelance / Personal Projects",
    period: "2023 — Present",
    description:
      "Built multiple full-stack web applications, AI-powered chatbots, and ML-based prediction systems. Worked with React, Python, TensorFlow, and modern web frameworks.",
  },
  {
    type: "work",
    title: "E-Commerce Platform Development",
    organization: "Bliss Cart — Multi-Brand Store",
    period: "2024",
    description:
      "Designed and developed a responsive multi-brand e-commerce platform with React, Redux, and Tailwind CSS featuring product management and cart functionality.",
  },
  {
    type: "work",
    title: "Machine Learning Research",
    organization: "UET Lahore — Academic Project",
    period: "2024",
    description:
      "Developed ML models for lung cancer detection using Scikit-learn with comprehensive EDA and feature engineering, achieving significant prediction accuracy.",
  },
];

export const ExperienceSection = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding section-alt px-4 relative"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="reveal">
          <h2 className="section-heading">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subheading">
            My journey through education and professional growth.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-line" aria-hidden="true" />

          <div className="space-y-16">
            {experiences.map((item, index) => {
              const isLeft = index % 2 === 0;
              const Icon =
                item.type === "education" ? GraduationCap : Briefcase;

              return (
                <div
                  key={index}
                  className={`reveal relative flex items-start gap-8 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Icon dot — bigger and more prominent */}
                  <div
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent2)))",
                      boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)",
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] card p-7 ${
                      isLeft ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <span className="tag mb-3 inline-block">{item.period}</span>
                    <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                    <p className="text-sm font-semibold mb-3" style={{ color: "hsl(var(--primary))" }}>
                      {item.organization}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
