import { Layout } from "@/components/Layout";
import { profile } from "@/content/profile";
import { ArrowLeft, Mail, Linkedin, Github, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Placeholder - replace with actual form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setSending(false);
  };

  return (
    <Layout>
      <div className="container py-12 max-w-2xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="text-3xl font-semibold mb-2">Contact</h1>
        <p className="text-muted-foreground mb-8">
          Have a project in mind or want to discuss backend/AI systems? Let's talk.
        </p>

        {/* Direct contact */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <a 
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-all group"
          >
            <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs text-muted-foreground truncate">{profile.email}</p>
            </div>
          </a>
          
          <a 
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-all group"
          >
            <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <div>
              <p className="text-sm font-medium">LinkedIn</p>
              <p className="text-xs text-muted-foreground">Connect</p>
            </div>
          </a>
          
          <a 
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-all group"
          >
            <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <div>
              <p className="text-sm font-medium">GitHub</p>
              <p className="text-xs text-muted-foreground">View code</p>
            </div>
          </a>
        </div>

        {/* Contact form */}
        <div className="p-6 bg-card rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-4">Send a message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Tell me about your project or question..."
                required
              />
            </div>
            
            <Button type="submit" disabled={sending} className="w-full sm:w-auto">
              {sending ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
