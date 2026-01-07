import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { CodingProfiles } from "@/components/CodingProfiles";
import { GitHubActivity } from "@/components/GitHubActivity";
import { About } from "@/components/About";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Education } from "@/components/Education";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Publication } from "@/components/Publication";
import { Skills } from "@/components/Skills";
import { ArchitectureDiagrams } from "@/components/ArchitectureDiagrams";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PanelRight } from "lucide-react";

const Index = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="lg:grid lg:grid-cols-[1fr,320px] lg:gap-12">
          {/* Main content */}
          <div className="min-w-0">
            <Hero />
            <GitHubActivity />
            <About />
            <ExperienceTimeline />
            <Education />
            <ProjectsSection />
            <Publication />
            <Skills />
            <ArchitectureDiagrams />
          </div>

          {/* Sidebar - Desktop */}
          {isDesktop && (
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <CodingProfiles />
              </div>
            </aside>
          )}

          {/* Sidebar - Mobile */}
          {!isDesktop && (
            <div className="fixed bottom-6 right-6 z-40 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
                    <PanelRight className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 overflow-y-auto">
                  <div className="pt-6">
                    <CodingProfiles />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
