import { ArrowRight, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AI-Powered Multifunctional Chatbot",
    description: "Built a chatbot with multimodal AI interactions using Gradio and Hugging Face for natural language processing.",
    image: "/projects/project1.png",
    tags: ["Python", "Gradio", "Hugging Face", "AI"],
    githubUrl: "https://github.com/Noorasghar09/Multifunctional_chatbot.git",
  },
  {
    id: 2,
    title: "Lung Cancer Detection using ML",
    description: "Developed machine learning models for lung cancer prediction with EDA and feature engineering techniques.",
    image: "/projects/project2.png",
    tags: ["Python", "Scikit-learn", "Machine Learning", "Data Analysis"],
    githubUrl: "https://github.com/Noorasghar09/Lung_Cancer_Detection_using_ML.git",
  },
  {
    id: 3,
    title: "Multi-Brand E-Commerce Platform (Bliss Cart)",
    description: "Built a responsive eCommerce platform with React, Redux, and Tailwind CSS for seamless shopping experience.",
    image: "/projects/project3.png",
    tags: ["React", "Redux", "Tailwind CSS", "E-commerce"],
    githubUrl: "https://github.com/Noorasghar09/E-Commerce-Website.git",
  },
  {
    id: 4,
    title: "Online Tutoring Platform (Study Pool Clone)",
    description: "Developed a comprehensive tutoring site with PHP, MySQL, and Stripe API integration for secure payments.",
    image: "/projects/project1.png",
    tags: ["PHP", "MySQL", "Stripe API", "Web Development"],
    githubUrl: "https://github.com/Noorasghar09/Studypool_clone.git",
  },
  {
    id: 5,
    title: "Weather Data Analysis",
    description: "Analyzed historical weather data with C#, SQL, and Power BI for comprehensive data visualization.",
    image: "/projects/project2.png",
    tags: ["C#", "SQL", "Power BI", "Data Analysis"],
    githubUrl: "https://github.com/Noorasghar09/Historical_Weather_Data_Analysis.git",
  },
  {
    id: 6,
    title: "Space Shooter Game",
    description: "Implemented scoring, health, game loop, and collision detection using C++, C#, OOP, and .NET framework.",
    image: "/projects/project3.png",
    tags: ["C++", "C#", "OOP", "Game Development"],
    githubUrl: "https://github.com/Noorasghar09/Space_Shooter_Game.git",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative bg-dark text-light">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Latest<span className="text-accent">Projects</span>
        </h2>

        <p className="text-center text-grayText mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects showcasing my expertise in web development, AI/ML, and software engineering. Each project demonstrates my passion for creating innovative solutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-[#112240] rounded-xl overflow-hidden border border-accent shadow-lg card-hover transition-all duration-300 hover:neon-glow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs font-medium border border-accent rounded-full bg-dark text-accent">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-grayText text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-accent hover:text-light transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="button-neon w-fit flex items-center mx-auto gap-2 px-6 py-3 text-base md:px-8 md:py-4 md:text-lg"
            target="_blank"
            href="https://github.com/Noorasghar09"
          >
            Check My Github <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};