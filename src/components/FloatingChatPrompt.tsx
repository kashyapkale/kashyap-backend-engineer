import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FloatingChatPrompt() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/chat?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-3 rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-primary shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about me..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

