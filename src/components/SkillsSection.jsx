import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  { name: "Python", level: 85 },
  { name: "React", level: 80 },
  { name: "JavaScript", level: 85 },
  { name: "PHP", level: 75 },
  { name: "C++", level: 70 },
  { name: "C#", level: 70 },
  { name: "HTML/CSS", level: 90 },
  { name: "MySQL", level: 75 },
  { name: "TensorFlow", level: 65 },
  { name: "Scikit-learn", level: 70 },
];

const profSkills = [
  { name: "Problem Solving", level: 85 },
  { name: "Communication", level: 80 },
  { name: "Teamwork", level: 85 },
  { name: "Creativity", level: 90 },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-4 relative bg-dark text-light">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-accent">Skills</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-accent">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, key) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <span className="text-light font-medium">{skill.name}</span>
                    <span className="text-grayText font-medium">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-[#112240] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-accent h-2 rounded-full neon-glow transition-all duration-700"
                      style={{ width: skill.level + "%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Professional Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-accent">Professional Skills</h3>
            <div className="grid grid-cols-2 gap-8">
              {profSkills.map((skill, key) => (
                <div key={key} className="flex flex-col items-center">
                  <div className="relative mb-2">
                    <svg width="70" height="70">
                      <circle
                        cx="35"
                        cy="35"
                        r="30"
                        stroke="#233554"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="35"
                        cy="35"
                        r="30"
                        stroke="#00f0ff"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 30}
                        strokeDashoffset={2 * Math.PI * 30 * (1 - skill.level / 100)}
                        className="neon-glow"
                        style={{ transition: 'stroke-dashoffset 0.7s' }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-accent font-bold text-lg">
                      {skill.level}%
                    </span>
                  </div>
                  <span className="text-light font-medium text-center">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
