import { Layout } from "@/components/Layout";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/profile";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <Layout>
      <div className="container py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        
        <h1 className="text-3xl font-semibold mb-2">Projects</h1>
        <p className="text-muted-foreground mb-8 max-w-xl">
          Production systems with measurable outcomes. Each project has a case study with architecture details, technical decisions, and tradeoffs.
        </p>
        
        <div className="space-y-6 stagger-children">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
