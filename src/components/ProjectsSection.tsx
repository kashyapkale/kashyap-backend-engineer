import { projects } from "@/content/profile";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-lg font-semibold mb-6">Featured Projects</h2>
      
      <div className="space-y-4 stagger-children">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>

      {otherProjects.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            SaaS Portfolio
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
