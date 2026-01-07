import { Code, Terminal, ChefHat, Github, Mail, Linkedin, ExternalLink } from "lucide-react";
import { codingProfiles, profile } from "@/content/profile";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code className="h-4 w-4" />,
  terminal: <Terminal className="h-4 w-4" />,
  "chef-hat": <ChefHat className="h-4 w-4" />,
  github: <Github className="h-4 w-4" />,
};

export function CodingProfiles() {
  return (
    <aside className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Coding Profiles
        </h3>
        <div className="space-y-2">
          {codingProfiles.map((cp) => (
            <a
              key={cp.name}
              href={cp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-md bg-card border border-border hover:border-primary/50 transition-all group"
            >
              <span className="text-muted-foreground group-hover:text-primary transition-colors">
                {iconMap[cp.icon]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{cp.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{cp.stat}</p>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Contact
        </h3>
        <div className="space-y-2">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 p-3 rounded-md bg-card border border-border hover:border-primary/50 transition-all group"
          >
            <Mail className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm truncate">{profile.email}</span>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-md bg-card border border-border hover:border-primary/50 transition-all group"
          >
            <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm">LinkedIn</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
          </a>
        </div>
      </div>
    </aside>
  );
}
