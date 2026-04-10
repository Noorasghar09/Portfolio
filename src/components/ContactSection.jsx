import { Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "noorasghar2004@gmail.com",
    href: "mailto:noorasghar2004@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 304 4608290",
    href: "tel:+923044608290",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lahore, Pakistan",
    href: null,
  },
];

const socials = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/noor-asghar",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:noorasghar2004@gmail.com",
    label: "Email",
  },
  {
    icon: Phone,
    href: "tel:+923044608290",
    label: "Phone",
  },
];

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useScrollReveal();

  const formEndpoint = "https://formspree.io/f/xwpnynad";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      setIsSubmitting(true);
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        form.reset();
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
      } else {
        toast({
          title: "Failed to send",
          description: "Please try again later or email me directly.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network error",
        description: "Check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding px-4 relative"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="reveal">
          <h2 className="section-heading">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subheading">
            Have a project in mind or just want to chat? I'd love to hear from
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="reveal space-y-8">
            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Wrapper = item.href ? "a" : "div";
                const wrapperProps = item.href
                  ? { href: item.href, className: "group block" }
                  : {};

                return (
                  <Wrapper key={item.label} {...wrapperProps}>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-13 h-13 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          width: "52px",
                          height: "52px",
                          background: "hsl(var(--primary) / 0.1)",
                        }}
                      >
                        <item.icon className="h-5 w-5" style={{ color: "hsl(var(--primary))" }} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider mb-0.5 font-semibold" style={{ color: "hsl(var(--muted-foreground))" }}>
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm font-bold mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                Connect with me
              </p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="social-icon"
                    aria-label={s.label}
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="reveal card p-7 md:p-8">
            <h4 className="font-bold mb-6">Send a Message</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="form-input"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="sr-only">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="form-input"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="form-input resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "btn-primary w-full",
                  isSubmitting && "opacity-70 pointer-events-none"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
