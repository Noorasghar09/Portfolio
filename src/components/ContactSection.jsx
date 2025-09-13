import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formspree endpoint (provided)
  const formEndpoint = "https://formspree.io/f/xwpnynad";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    try {
      setIsSubmitting(true);
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
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
    } catch (err) {
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
    <section id="contact" className="py-24 px-4 relative bg-dark text-light">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Contact <span className="text-accent">Me</span>
        </h2>

        <p className="text-center text-grayText mb-12 max-w-2xl mx-auto">
          Let's Work Together
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6 text-accent text-center md:text-left">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-accent/10">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div className="leading-tight">
                  <h4 className="font-medium"> Email</h4>
                  <a
                    href="mailto:noorasghar2004@gmail.com"
                    className="text-grayText hover:text-accent transition-colors block"
                  >
                    noorasghar2004@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-accent/10">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div className="leading-tight">
                  <h4 className="font-medium"> Phone</h4>
                  <a
                    href="tel:+923044608290"
                    className="text-grayText hover:text-accent transition-colors block"
                  >
                    +92 3044608290
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-accent/10">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div className="leading-tight">
                  <h4 className="font-medium"> Location</h4>
                  <span className="text-grayText block">Lahore, Pakistan</span>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <h4 className="font-medium mb-4 text-center md:text-left"> Connect With Me</h4>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a href="https://www.linkedin.com/in/noor-asghar" target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-dark neon-glow transition">
                  <Linkedin />
                </a>
                <a href="mailto:noorasghar2004@gmail.com" target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-dark neon-glow transition">
                  <Mail />
                </a>
                <a href="tel:+923044608290" target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-dark neon-glow transition">
                  <Phone />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-[#112240] p-8 rounded-lg shadow-lg border border-accent neon-glow">
            <h3 className="text-2xl font-semibold mb-6 text-accent">Send a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit} action={formEndpoint} method="POST">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="input-dark w-full"
                  placeholder="Your Name..."
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input-dark w-full"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Your Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="input-dark w-full"
                  placeholder="Subject..."
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="input-dark w-full resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "button-neon w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Sending..." : "Submit"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
