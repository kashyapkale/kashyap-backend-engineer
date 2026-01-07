import { skills } from "@/content/profile";

interface SkillGroupProps {
  title: string;
  items: string[];
}

function SkillGroup({ title, items }: SkillGroupProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span 
            key={skill}
            className="px-3 py-1.5 text-sm font-mono bg-card border border-border rounded-md hover:border-primary/50 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-lg font-semibold mb-6">Skills</h2>
      
      <div className="grid sm:grid-cols-2 gap-6">
        <SkillGroup title="Languages" items={skills.languages} />
        <SkillGroup title="Backend" items={skills.backend} />
        <SkillGroup title="AI Systems" items={skills.aiSystems} />
        <SkillGroup title="Cloud & Infrastructure" items={skills.cloudInfra} />
      </div>
    </section>
  );
}
