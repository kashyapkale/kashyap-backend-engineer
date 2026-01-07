import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border py-8 mt-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-mono">
            © {currentYear} {profile.name}
          </p>
          
          <div className="flex items-center gap-4">
            <a 
              href={`mailto:${profile.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a 
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a 
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
