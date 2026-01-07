import { Layout } from "@/components/Layout";
import { useParams, Link } from "react-router-dom";
import { projectDetails, projects } from "@/content/profile";
import { ArrowLeft, Github, ExternalLink, CheckCircle, AlertTriangle, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  const details = id ? projectDetails[id as keyof typeof projectDetails] : null;

  if (!project || !details) {
    return (
      <Layout>
        <div className="container py-12">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
          <h1 className="text-2xl font-semibold">Project not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container py-12 max-w-3xl">
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-mono text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">{project.title}</h1>
          <p className="text-xl text-muted-foreground">{project.subtitle}</p>
          
          {project.github && (
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
            >
              <Github className="h-4 w-4" />
              View on GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </header>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">{details.overview}</p>
        </section>

        {/* Problem */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Problem</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{details.problem.description}</p>
          
          <h3 className="text-sm font-medium mb-2">Constraints</h3>
          <ul className="space-y-2">
            {details.problem.constraints.map((constraint, idx) => (
              <li 
                key={idx}
                className="text-sm text-muted-foreground pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-primary"
              >
                {constraint}
              </li>
            ))}
          </ul>
        </section>

        {/* Architecture */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Architecture</h2>
          <div className="space-y-4">
            {Object.entries(details.architecture).map(([key, value]) => (
              <div key={key} className="p-4 bg-card rounded-lg border border-border">
                <h3 className="text-sm font-medium capitalize mb-1">{key}</h3>
                <p className="text-sm text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Decisions */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Key Technical Decisions
          </h2>
          <div className="space-y-4">
            {details.decisions.map((item, idx) => (
              <div key={idx} className="p-4 bg-card rounded-lg border border-border">
                <h3 className="text-sm font-medium mb-1">{item.decision}</h3>
                <p className="text-sm text-muted-foreground">{item.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tradeoffs */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Tradeoffs
          </h2>
          <ul className="space-y-2">
            {details.tradeoffs.map((tradeoff, idx) => (
              <li 
                key={idx}
                className="text-sm text-muted-foreground pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-yellow-500"
              >
                {tradeoff}
              </li>
            ))}
          </ul>
        </section>

        {/* Results */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Results
          </h2>
          <ul className="space-y-2">
            {details.results.map((result, idx) => (
              <li 
                key={idx}
                className="text-sm text-muted-foreground pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-success"
              >
                {result}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Layout>
  );
};

export default ProjectDetail;
