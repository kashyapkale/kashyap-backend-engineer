import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  metadata?: {
    source: string;
    tokens: number;
    latency: number;
  };
}

// System responses - will be replaced with Gemini API
const getSystemResponse = (question: string): { content: string; source: string } => {
  const lowerQ = question.toLowerCase();
  
  if (lowerQ.includes("experience") || lowerQ.includes("work") || lowerQ.includes("amazon") || lowerQ.includes("tray")) {
    return {
      content: "Employment records indicate positions at Amazon (SDE-1, backend systems for multimedia data labeling, 200K+ items/month throughput) and Tray.com (Java/Spring Boot optimization, 15% latency reduction). Current role: WISE Software Engineer at Virginia Tech, developing HokieLearn Virtual TA system.",
      source: "Retrieved from: experience.json, employment_history"
    };
  }
  if (lowerQ.includes("skill") || lowerQ.includes("tech") || lowerQ.includes("stack")) {
    return {
      content: "Technical competencies indexed:\n\nLanguages: C++, Java, Python, TypeScript\nBackend: Spring Boot, REST, gRPC, distributed systems\nAI/ML: RAG pipelines, embeddings, vector search (FAISS), LLM orchestration\nInfrastructure: AWS (Lambda, SQS/SNS, S3, RDS), Docker, Prometheus, ELK stack",
      source: "Retrieved from: skills.json, tech_stack"
    };
  }
  if (lowerQ.includes("project") || lowerQ.includes("hokielearn") || lowerQ.includes("kiosk")) {
    return {
      content: "Project registry query results:\n\n[1] HokieLearn — RAG-based Virtual TA. Hybrid retrieval (dense + keyword), tool-using agents, Canvas LMS integration. Scale: 10K+ queries/day.\n\n[2] AI-Kiosk — Conversational ordering system. Whisper STT, LLaMA 3.2, FAISS+BM25 hybrid retrieval.\n\n[3] SaaS platforms — inbox2Li (email→LinkedIn), resume tailoring (ATS optimization).",
      source: "Retrieved from: projects.json, project_metadata"
    };
  }
  if (lowerQ.includes("education") || lowerQ.includes("study") || lowerQ.includes("degree") || lowerQ.includes("virginia tech") || lowerQ.includes("mit")) {
    return {
      content: "Education records:\n\nMS Computer Science — Virginia Tech (GPA: 3.9, Expected: May 2026)\nFocus: AI Engineering, Cloud Computing, Parallel Computing, NLP\n\nBTech Computer Science — MIT Pune (GPA: 3.9)\nCoursework: OS, Computer Architecture, Deep Learning",
      source: "Retrieved from: education.json"
    };
  }
  if (lowerQ.includes("contact") || lowerQ.includes("email") || lowerQ.includes("reach") || lowerQ.includes("linkedin")) {
    return {
      content: "Contact endpoints:\n\nEmail: kashyapk@vt.edu\nLinkedIn: linkedin.com/in/kashyapmkale\nGitHub: github.com/kashyapkale",
      source: "Retrieved from: contact.json"
    };
  }
  if (lowerQ.includes("publication") || lowerQ.includes("paper") || lowerQ.includes("research")) {
    return {
      content: "Publication record:\n\nTitle: \"Building Applications Using OpenAI APIs\"\nPublisher: Springer, Studies in Computational Intelligence\nScope: Design patterns for LLM applications — system boundaries, prompt structure, evaluation strategies\nDOI: 10.1007/978-981-97-8460-8_3",
      source: "Retrieved from: publications.json"
    };
  }
  if (lowerQ.includes("c++") || lowerQ.includes("systems")) {
    return {
      content: "Systems engineering profile: Expertise in distributed architectures, async processing (message queues), fault-tolerant pipeline design, low-level performance optimization. Primary language affinity: C++.",
      source: "Retrieved from: profile.json, expertise"
    };
  }
  
  return {
    content: "Query processed. Available data domains:\n\n• Employment history (Amazon, Tray.com, Virginia Tech)\n• Project registry (HokieLearn, AI-Kiosk, SaaS tools)\n• Technical competencies (backend, AI systems, cloud)\n• Education records\n• Publications\n• Contact endpoints\n\nSpecify a domain or refine query.",
    source: "No specific context matched — returning index"
  };
};

const Chat = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasProcessedInitial, setHasProcessedInitial] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [contextStats, setContextStats] = useState({
    documents: 0,
    latency: 0
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Trigger entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial query from URL
  useEffect(() => {
    if (initialQuery && !hasProcessedInitial) {
      setHasProcessedInitial(true);
      handleSend(initialQuery);
    }
  }, [initialQuery, hasProcessedInitial]);

  // Focus input on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = { 
      role: "user", 
      content: messageText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setIsLoading(true);

    const startTime = Date.now();

    // TODO: Replace with Gemini API via Lovable Cloud
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));
    
    const latency = Date.now() - startTime;
    const response = getSystemResponse(messageText);
    const tokenCount = Math.floor(response.content.length / 4);
    
    const assistantMessage: Message = {
      role: "assistant",
      content: response.content,
      timestamp: new Date(),
      metadata: {
        source: response.source,
        tokens: tokenCount,
        latency
      }
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setContextStats(prev => ({
      documents: prev.documents + 1,
      latency
    }));
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleBack = () => {
    setIsVisible(false);
    setTimeout(() => navigate("/"), 300);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { 
      hour12: false, 
      hour: "2-digit", 
      minute: "2-digit",
      second: "2-digit"
    });
  };

  return (
    <div className={`min-h-screen flex bg-background transition-all duration-300 ease-out ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-border bg-background sticky top-0 z-10">
          <div className="px-4 lg:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="h-8 w-8"
                aria-label="Return to portfolio"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="border-l border-border pl-4">
                <h1 className="text-sm font-medium tracking-tight">Interactive System</h1>
                <p className="text-xs text-muted-foreground font-mono">Bounded LLM interface for experimentation</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Status pills - hidden on mobile */}
              <div className="hidden md:flex items-center gap-2">
                <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-muted text-muted-foreground rounded">
                  Model: LLM
                </span>
                <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-muted text-muted-foreground rounded">
                  Mode: Retrieval-enabled
                </span>
                <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-muted text-muted-foreground rounded">
                  Context: Bounded
                </span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 lg:px-8 py-6 max-w-4xl">
            {messages.length === 0 && !isLoading && (
              <div className="py-12">
                <p className="text-sm text-muted-foreground font-mono mb-6">
                  System initialized. Awaiting input.
                </p>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
                    Sample queries:
                  </p>
                  {[
                    "Retrieve employment history",
                    "Query project registry",
                    "List technical competencies",
                    "Fetch contact endpoints"
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="block text-sm text-foreground hover:text-primary transition-colors text-left font-mono"
                    >
                      → {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-0">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="animate-fade-in"
                >
                  {/* Divider between turns */}
                  {idx > 0 && msg.role === "user" && (
                    <div className="border-t border-border my-6" />
                  )}
                  
                  <div className={`py-4 ${msg.role === "assistant" ? "pl-4 lg:pl-8 border-l-2 border-primary/30" : ""}`}>
                    {/* Metadata line */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        {msg.role === "user" ? "input" : "output"}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {formatTime(msg.timestamp)}
                      </span>
                      {msg.metadata && (
                        <>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {msg.metadata.tokens} tokens
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {msg.metadata.latency}ms
                          </span>
                        </>
                      )}
                    </div>
                    
                    {/* Message content */}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                    
                    {/* Source boundary */}
                    {msg.metadata && (
                      <p className="mt-3 text-[10px] font-mono text-muted-foreground">
                        {msg.metadata.source}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="py-4 pl-4 lg:pl-8 border-l-2 border-primary/30 animate-fade-in">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      output
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      processing
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-muted-foreground/50 rounded-full animate-pulse" />
                    <span className="h-1.5 w-1.5 bg-muted-foreground/50 rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 bg-muted-foreground/50 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>
            
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input */}
        <footer className="border-t border-border bg-background sticky bottom-0">
          <div className="px-4 lg:px-8 py-4 max-w-4xl">
            <form onSubmit={handleSubmit} className="flex gap-3 items-end">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  adjustTextareaHeight();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter a question or prompt…"
                disabled={isLoading}
                rows={1}
                className="flex-1 px-0 py-2 bg-transparent text-sm outline-none resize-none border-b border-border focus:border-primary disabled:opacity-50 transition-colors placeholder:text-muted-foreground"
                aria-label="Query input"
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0"
                aria-label="Submit query"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-2 text-[10px] font-mono text-muted-foreground">
              Enter to submit · Shift+Enter for newline
            </p>
          </div>
        </footer>
      </div>

      {/* Context panel - desktop only */}
      <aside className="hidden lg:block w-64 border-l border-border bg-muted/30 p-6 shrink-0">
        <h2 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-6">
          Context
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Retrieval</span>
            <span className="flex items-center gap-1.5 text-xs">
              <Circle className="h-2 w-2 fill-green-500 text-green-500" />
              Enabled
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Documents</span>
            <span className="text-xs font-mono">{contextStats.documents}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Last latency</span>
            <span className="text-xs font-mono">
              {contextStats.latency > 0 ? `~${contextStats.latency}ms` : "—"}
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-4">
            System
          </h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>Interface: v1.0</p>
            <p>Backend: Pending</p>
            <p>Status: Development</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Chat;

