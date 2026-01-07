import { Briefcase, MapPin } from "lucide-react";
import { experience } from "@/content/profile";

export function ExperienceTimeline() {
  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-lg font-semibold mb-8">Experience</h2>
      
      <div className="space-y-8">
        {experience.map((job, idx) => (
          <div key={job.id} className="relative pl-6 md:pl-8">
            {/* Timeline line */}
            {idx !== experience.length - 1 && (
              <div className="absolute left-[7px] md:left-[11px] top-6 bottom-0 w-px bg-border" />
            )}
            
            {/* Timeline dot */}
            <div className={`absolute left-0 md:left-1 top-1.5 w-[14px] h-[14px] rounded-full border-2 ${
              job.type === "current" 
                ? "bg-primary border-primary" 
                : "bg-background border-border"
            }`} />
            
            <div className="space-y-3">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-semibold">{job.company}</h3>
                  <span className="text-sm text-muted-foreground font-mono">{job.period}</span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <Briefcase className="h-3 w-3" />
                  {job.role}
                  <span className="text-border mx-1">•</span>
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </p>
              </div>
              
              <ul className="space-y-2">
                {job.bullets.map((bullet, bulletIdx) => (
                  <li 
                    key={bulletIdx} 
                    className="text-sm text-muted-foreground pl-4 relative before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-border"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
