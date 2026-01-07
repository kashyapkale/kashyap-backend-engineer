import { Workflow, Zap } from "lucide-react";

function RAGPipelineDiagram() {
  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
        <Workflow className="h-4 w-4 text-primary" />
        RAG Pipeline
      </h4>
      <div className="flex flex-col md:flex-row items-center gap-2 text-xs font-mono">
        <div className="px-3 py-2 bg-muted rounded border border-border text-center">
          Documents<br/><span className="text-muted-foreground">PDF, MD</span>
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="px-3 py-2 bg-muted rounded border border-border text-center">
          Chunking<br/><span className="text-muted-foreground">+ metadata</span>
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="px-3 py-2 bg-primary/10 rounded border border-primary/30 text-center">
          Embeddings<br/><span className="text-primary">Vector DB</span>
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="px-3 py-2 bg-muted rounded border border-border text-center">
          Hybrid<br/><span className="text-muted-foreground">Retrieval</span>
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="px-3 py-2 bg-primary/10 rounded border border-primary/30 text-center">
          LLM<br/><span className="text-primary">+ Context</span>
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="px-3 py-2 bg-success/10 rounded border border-success/30 text-center">
          Response<br/><span className="text-success">Grounded</span>
        </div>
      </div>
    </div>
  );
}

function EventDrivenDiagram() {
  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
        <Zap className="h-4 w-4 text-primary" />
        Event-Driven Processing
      </h4>
      <div className="flex flex-col md:flex-row items-center gap-2 text-xs font-mono">
        <div className="px-3 py-2 bg-muted rounded border border-border text-center">
          API<br/><span className="text-muted-foreground">Gateway</span>
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="px-3 py-2 bg-primary/10 rounded border border-primary/30 text-center">
          Lambda<br/><span className="text-primary">Handler</span>
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="px-3 py-2 bg-muted rounded border border-border text-center">
          SQS<br/><span className="text-muted-foreground">Queue</span>
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="px-3 py-2 bg-primary/10 rounded border border-primary/30 text-center">
          Worker<br/><span className="text-primary">Lambda</span>
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="px-3 py-2 bg-muted rounded border border-border text-center">
          SNS<br/><span className="text-muted-foreground">Notify</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Async processing • Decoupled services • Fault-tolerant
      </p>
    </div>
  );
}

export function ArchitectureDiagrams() {
  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-lg font-semibold mb-6">Architecture Snapshots</h2>
      <div className="space-y-4">
        <RAGPipelineDiagram />
        <EventDrivenDiagram />
      </div>
    </section>
  );
}
