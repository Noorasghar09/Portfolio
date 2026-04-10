import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const frontendSkills = [
  { name: "React", level: 80 },
  { name: "JavaScript", level: 85 },
  { name: "HTML/CSS", level: 90 },
  { name: "Tailwind CSS", level: 85 },
];

const backendSkills = [
  { name: "Python", level: 85 },
  { name: "PHP", level: 75 },
  { name: "MySQL", level: 75 },
  { name: "C++", level: 70 },
  { name: "C#", level: 70 },
];

const aiTools = [
  { name: "TensorFlow", level: 65 },
  { name: "Scikit-learn", level: 70 },
  { name: "Gradio", level: 60 },
  { name: "Data Analysis", level: 75 },
];

const profSkills = [
  { name: "Problem Solving", level: 85 },
  { name: "Communication", level: 80 },
  { name: "Teamwork", level: 85 },
  { name: "Creativity", level: 90 },
];

const categories = [
  { label: "Frontend", skills: frontendSkills },
  { label: "Backend", skills: backendSkills },
  { label: "AI / ML", skills: aiTools },
];

function SkillBar({ name, level, animate }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold">{name}</span>
        <span className="text-sm font-bold" style={{ color: "hsl(var(--primary))" }}>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: animate ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function CircularSkill({ name, level, animate }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - (animate ? level / 100 : 0));

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg width="96" height="96" className="-rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="url(#skillGrad)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
          />
          <defs>
            <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent2))" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-base font-bold">
          {level}%
        </span>
      </div>
      <span className="text-sm font-semibold text-center">{name}</span>
    </div>
  );
}

export const SkillsSection = () => {
  const sectionRef = useScrollReveal();
  const [animate, setAnimate] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding section-alt px-4 relative"
    >
      <div className="container mx-auto max-w-5xl" ref={observerRef}>
        <div className="reveal">
          <h2 className="section-heading">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subheading">
            A comprehensive toolkit spanning frontend, backend, and AI/ML
            technologies.
          </p>
        </div>

        {/* Technical skills — categorized in cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {categories.map((cat) => (
            <div key={cat.label} className="card p-7 reveal">
              <h4 className="font-bold mb-6 gradient-text text-lg">{cat.label}</h4>
              <div className="space-y-5">
                {cat.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    animate={animate}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Professional skills */}
        <div className="reveal">
          <h4 className="text-center font-bold mb-10" style={{ color: "hsl(var(--muted-foreground))" }}>
            Professional Skills
          </h4>
          <div className="flex flex-wrap justify-center gap-10">
            {profSkills.map((skill) => (
              <CircularSkill
                key={skill.name}
                name={skill.name}
                level={skill.level}
                animate={animate}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
