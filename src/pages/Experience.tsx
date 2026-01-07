import { Layout } from "@/components/Layout";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { education } from "@/content/profile";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Experience = () => {
  return (
    <Layout>
      <div className="container py-12 max-w-3xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="text-3xl font-semibold mb-2">Experience</h1>
        <p className="text-muted-foreground mb-8">
          Backend systems, distributed architectures, and production ML pipelines.
        </p>

        <ExperienceTimeline />

        {/* Education */}
        <section className="py-12 border-t border-border">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Education
          </h2>
          
          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div key={idx} className="p-5 bg-card rounded-lg border border-border">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="font-semibold">{edu.school}</h3>
                  <span className="text-sm text-muted-foreground font-mono">{edu.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {edu.degree} • GPA: {edu.gpa}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((course) => (
                    <span 
                      key={course}
                      className="px-2 py-0.5 text-xs font-mono bg-muted rounded text-muted-foreground"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Experience;
