import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setIsScrolled(currentY > 20);

    if (currentY < 100) {
      setVisible(true);
    } else if (currentY > lastScrollY.current + 5) {
      setVisible(false);
      setIsMenuOpen(false);
    } else if (currentY < lastScrollY.current - 5) {
      setVisible(true);
    }
    lastScrollY.current = currentY;

    const sections = navItems.map((item) => item.href.slice(1));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "glass border-b shadow-sm py-3"
          : "py-5",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
      style={{
        borderColor: isScrolled ? "hsl(var(--border) / 0.5)" : "transparent",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a className="text-xl font-extrabold tracking-tight" href="#hero">
          <span className="gradient-text">Noor</span>
          <span style={{ color: "hsl(var(--muted-foreground))" }}>.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                activeSection === item.href.slice(1)
                  ? "font-semibold"
                  : ""
              )}
              style={
                activeSection === item.href.slice(1)
                  ? {
                      color: "hsl(var(--primary))",
                      background: "hsl(var(--primary) / 0.08)",
                    }
                  : {
                      color: "hsl(var(--muted-foreground))",
                    }
              }
            >
              {item.name}
              {activeSection === item.href.slice(1) && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{ background: "hsl(var(--primary))" }}
                />
              )}
            </a>
          ))}
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2.5 rounded-xl transition-colors z-50"
            style={{ background: isMenuOpen ? "hsl(var(--muted))" : "transparent" }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile overlay */}
        <div
          className={cn(
            "fixed inset-0 z-40 md:hidden transition-all duration-300",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "hsl(var(--background) / 0.97)",
              backdropFilter: "blur(24px)",
            }}
          />
          <div className="relative flex flex-col items-center justify-center h-full gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200"
                style={
                  activeSection === item.href.slice(1)
                    ? {
                        color: "hsl(var(--primary))",
                        background: "hsl(var(--primary) / 0.08)",
                      }
                    : { color: "hsl(var(--muted-foreground))" }
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
