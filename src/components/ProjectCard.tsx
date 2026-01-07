import { ArrowRight, Github, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  summary: string;
  metrics: string[];
  github?: string | null;
  featured?: boolean;
  status?: "coming-soon" | undefined;
}

export function ProjectCard({ 
  id, 
  title, 
  subtitle, 
  tags, 
  summary, 
  metrics, 
  github, 
  featured,
  status 
}: ProjectCardProps) {
  const isComingSoon = status === "coming-soon";
  
  return (
    <article className={`group relative p-5 rounded-lg border transition-all ${
      featured 
        ? "bg-card border-border hover:border-primary/50 hover:shadow-lg" 
        : "bg-background border-border/50 hover:border-border"
    }`}>
      {isComingSoon && (
        <Badge variant="secondary" className="absolute top-4 right-4 text-xs">
          <Clock className="h-3 w-3 mr-1" />
          Coming Soon
        </Badge>
      )}
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-0.5 text-xs font-mono bg-muted rounded text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {summary}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric, idx) => (
            <span 
              key={idx} 
              className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded"
            >
              {metric}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4 pt-2">
          {!isComingSoon && (
            <Link 
              to={`/projects/${id}`}
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1 group/link"
            >
              View case study
              <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          )}
          {github && (
            <a 
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
