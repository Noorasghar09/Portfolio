import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Noorasghar09", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/noor-asghar", label: "LinkedIn" },
  { icon: Mail, href: "mailto:noorasghar2004@gmail.com", label: "Email" },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="border-t"
      style={{
        borderColor: "hsl(var(--border))",
        background: "hsl(var(--card))",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            &copy; {new Date().getFullYear()} Noor Asghar. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="social-icon"
                aria-label={s.label}
                style={{ width: "38px", height: "38px" }}
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="btn-primary !px-4 !py-3 !rounded-xl"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
