import { BookOpen, ExternalLink } from "lucide-react";
import { publication } from "@/content/profile";

export function Publication() {
  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        Publication
      </h2>
      
      <div className="p-5 rounded-lg bg-card border border-border">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{publication.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {publication.publisher}
            </p>
            <a 
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1 mt-1"
            >
              DOI: {publication.doi}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {publication.summary}
          </p>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Key Contributions</h4>
            <ul className="space-y-1.5">
              {publication.contributions.map((item, idx) => (
                <li 
                  key={idx} 
                  className="text-sm text-muted-foreground pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-primary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
