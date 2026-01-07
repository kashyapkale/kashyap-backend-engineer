import { profile } from "@/content/profile";

export function About() {
  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-lg font-semibold mb-4">About</h2>
      <div className="prose-container">
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {profile.about}
        </p>
      </div>
    </section>
  );
}
