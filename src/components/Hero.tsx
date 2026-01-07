import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "@/content/profile";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="space-y-6">
        <div className="space-y-4">
          <p className="text-lg md:text-xl font-medium text-foreground">
            {profile.name}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance leading-tight">
            {profile.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            {profile.hero.subheadline}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="group">
            <Link to="/projects">
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={profile.resumeUrl} download>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </div>

        <div className="pt-4">
          <p className="text-sm text-muted-foreground font-mono">
            <span className="text-primary">currently:</span>{" "}
            {profile.hero.currently}
          </p>
        </div>
      </div>
    </section>
  );
}
