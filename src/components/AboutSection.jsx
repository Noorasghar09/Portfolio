import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative bg-dark text-light">
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-12">
        {/* Profile Image with Neon Glow */}
        <div className="flex-shrink-0 mb-8 md:mb-0">
          <img
            src="/img.jpeg"
            alt="Profile"
            className="w-48 h-48 rounded-full neon-glow border-4 border-accent object-cover"
          />
        </div>
        <div className="space-y-6 flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-accent">Me</span>
          </h2>
          <h3 className="text-2xl font-semibold">Software Engineer & AI Enthusiast!</h3>
          <p className="text-grayText">
            I am a Software Engineering student at the University of Engineering and Technology, Lahore, with a strong foundation in web development and a passion for AI-driven solutions. My expertise spans across multiple programming languages and frameworks, from traditional web technologies to cutting-edge AI and machine learning tools. With experience in building responsive applications, intelligent systems, and e-commerce platforms, I specialize in creating solutions that solve real-world problems.
          </p>
          <a href="#contact" className="button-neon inline-block mt-4 px-6 py-3 text-base md:px-8 md:py-4 md:text-lg">
            More About Me
          </a>
        </div>
      </div>
      {/* Feature Cards */}
      <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="bg-dark border border-accent rounded-xl p-6 neon-glow card-hover">
          <div className="flex items-center gap-4 mb-2">
            <Code className="h-8 w-8 text-accent" />
            <h4 className="font-semibold text-lg">Web Development</h4>
          </div>
          <p className="text-grayText text-sm">
            Creating responsive websites and web applications with React, PHP, and modern frameworks.
          </p>
        </div>
        <div className="bg-dark border border-accent rounded-xl p-6 neon-glow card-hover">
          <div className="flex items-center gap-4 mb-2">
            <User className="h-8 w-8 text-accent" />
            <h4 className="font-semibold text-lg">AI & Machine Learning</h4>
          </div>
          <p className="text-grayText text-sm">
            Building intelligent systems with TensorFlow, Scikit-learn, and computer vision applications.
          </p>
        </div>
        <div className="bg-dark border border-accent rounded-xl p-6 neon-glow card-hover">
          <div className="flex items-center gap-4 mb-2">
            <Briefcase className="h-8 w-8 text-accent" />
            <h4 className="font-semibold text-lg">Full-Stack Development</h4>
          </div>
          <p className="text-grayText text-sm">
            End-to-end application development with databases, APIs, and modern development practices.
          </p>
        </div>
      </div>
    </section>
  );
};
