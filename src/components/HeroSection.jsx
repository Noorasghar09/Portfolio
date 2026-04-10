import { ArrowDown, Mail } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const roles = [
  "Software Engineer",
  "AI Enthusiast",
  "Full-Stack Developer",
  "Problem Solver",
];

function DownloadButton() {
  const [state, setState] = useState("idle"); // idle | downloading | done
  const [progress, setProgress] = useState(0);
  const btnRef = useRef(null);
  const particlesRef = useRef(null);

  const spawnParticles = useCallback(() => {
    const container = particlesRef.current;
    if (!container) return;
    container.innerHTML = "";

    for (let i = 0; i < 24; i++) {
      const p = document.createElement("span");
      const angle = (i / 24) * 360;
      const dist = 30 + Math.random() * 40;
      const size = 3 + Math.random() * 4;
      const hue = 252 + Math.random() * 50;
      p.style.cssText = `
        position:absolute; left:50%; top:50%;
        width:${size}px; height:${size}px;
        border-radius:50%;
        background:hsl(${hue} 80% 65%);
        pointer-events:none;
        transform:translate(-50%,-50%) translate(0,0) scale(1);
        animation: cv-particle 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
        --cv-px: ${Math.cos((angle * Math.PI) / 180) * dist}px;
        --cv-py: ${Math.sin((angle * Math.PI) / 180) * dist}px;
        animation-delay: ${Math.random() * 0.1}s;
      `;
      container.appendChild(p);
    }
  }, []);

  const handleClick = () => {
    if (state !== "idle") return;
    setState("downloading");
    setProgress(0);

    // Animate progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setProgress(100);

        setTimeout(() => {
          setState("done");
          spawnParticles();

          // Trigger actual download
          const link = document.createElement("a");
          link.href = "/Noor_Asghar_Resume.pdf";
          link.download = "Noor_Asghar_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 200);

        setTimeout(() => {
          setState("idle");
          setProgress(0);
        }, 2800);
      } else {
        setProgress(p);
      }
    }, 120);
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={`cv-dl-btn ${state !== "idle" ? "cv-dl-active" : ""} ${state === "done" ? "cv-dl-done" : ""}`}
    >
      {/* Progress fill */}
      <span
        className="cv-dl-progress"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      {/* Particle container */}
      <span ref={particlesRef} className="cv-dl-particles" />

      {/* Icon */}
      <span className="cv-dl-icon-wrap">
        {state === "idle" && (
          <svg className="cv-dl-icon cv-dl-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        )}
        {state === "downloading" && (
          <svg className="cv-dl-icon cv-dl-loading" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
            <path d="M12 3a9 9 0 016.36 2.64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
        {state === "done" && (
          <svg className="cv-dl-icon cv-dl-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 12 9 17 20 6" />
          </svg>
        )}
      </span>

      {/* Label */}
      <span className="cv-dl-label">
        {state === "idle" && "Download CV"}
        {state === "downloading" && `${Math.round(progress)}%`}
        {state === "done" && "Done!"}
      </span>
    </button>
  );
}

export const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!deleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          70
        );
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length - 1)),
          40
        );
      } else {
        setDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Background decorations */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Gradient orbs — larger and more visible */}
      <div
        className="absolute top-[15%] -left-20 w-[500px] h-[500px] rounded-full blur-[100px]"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.25), hsl(var(--accent2) / 0.15))",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[10%] -right-20 w-[450px] h-[450px] rounded-full blur-[100px]"
        style={{
          background: "linear-gradient(135deg, hsl(var(--accent2) / 0.2), hsl(var(--primary) / 0.1))",
        }}
        aria-hidden="true"
      />
      {/* Small accent orb */}
      <div
        className="absolute top-[60%] left-[20%] w-48 h-48 rounded-full blur-[80px] opacity-30"
        style={{ background: "hsl(var(--accent2))" }}
        aria-hidden="true"
      />

      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-8 animate-fade-in-up">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-primary/20 text-sm font-medium text-primary"
               style={{ background: "hsl(var(--primary) / 0.06)" }}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for opportunities
          </div>

          {/* Main heading */}
          <h1 className="!leading-[1.15]">
            Hi, I'm{" "}
            <span className="font-display italic gradient-text">
              Noor Asghar
            </span>
          </h1>

          {/* Typewriter */}
          <div className="h-10 flex items-center justify-center">
            <span className="text-xl md:text-2xl font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
              {displayed}
              <span
                className="ml-0.5 inline-block w-[3px] h-7 rounded-sm animate-pulse"
                style={{ background: "hsl(var(--primary))" }}
              />
            </span>
          </div>

          {/* Bio */}
          <p className="max-w-lg mx-auto text-base md:text-lg leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
            Building intelligent, user-centric applications with modern web
            technologies and AI-driven solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a href="#contact" className="btn-primary">
              <Mail size={18} />
              Get in Touch
            </a>
            <DownloadButton />
          </div>

          {/* Social row */}
          <div className="flex justify-center gap-3 pt-2">
            <a
              href="https://www.linkedin.com/in/noor-asghar"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.059-1.864-3.059-1.866 0-2.152 1.458-2.152 2.966v5.697h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.564 2.84-1.564 3.039 0 3.602 2.002 3.602 4.605v5.592z" />
              </svg>
            </a>
            <a
              href="https://github.com/Noorasghar09"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="mailto:noorasghar2004@gmail.com"
              className="social-icon"
              aria-label="Send email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
          Scroll
        </span>
        <ArrowDown className="h-4 w-4" style={{ color: "hsl(var(--muted-foreground))" }} />
      </div>
    </section>
  );
};
