// Content configuration for portfolio
// Edit this file to update all content across the site

export const profile = {
  name: "Kashyap M Kale",
  title: "Backend Software Engineer",
  subtitle: "Backend AI Engineer",
  email: "kashyapk@vt.edu",
  phone: "+1 571-461-9423",
  location: "San Francisco Bay Area",
  linkedin: "https://www.linkedin.com/in/kashyapmkale",
  github: "https://github.com/kashyapkale/",
  resumeUrl: "/resume/Kashyap_M_Kale_Resume.pdf",
  
  hero: {
    headline: "Backend Engineer building reliable AI systems.",
    subheadline: "Ex-Amazon & Tray. C++ and systems fanatic. Building production-grade LLM applications with measurable outcomes.",
    currently: "Virginia Tech (WISE Software Engineer) • AI Engineering • Distributed Systems"
  },

  about: `I build backend systems that handle real traffic and real constraints. My focus is on RAG pipelines, async processing architectures, and serverless AWS infrastructure. I've shipped production systems processing 200K+ items monthly at Amazon and optimized APIs serving 50+ enterprise clients at Tray.

Current work: building a Virtual TA system at Virginia Tech—hybrid retrieval, tool-using agents, Canvas LMS integration, and strict security boundaries. The system handles 10K+ queries/day with auditable responses grounded in course materials.

I care about observability, cost control, and systems that fail gracefully.`
};

export const codingProfiles = [
  {
    name: "GeeksForGeeks",
    url: "https://www.geeksforgeeks.org/profile/kay12?tab=activity",
    stat: "368 solved",
    icon: "code"
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/kashyapmcodes/",
    stat: "279 solved",
    icon: "terminal"
  },
  {
    name: "CodeChef",
    url: "https://www.codechef.com/users/ka_y",
    stat: "Active",
    icon: "chef-hat"
  },
  {
    name: "GitHub",
    url: "https://github.com/kashyapkale/",
    stat: "Open Source",
    icon: "github"
  }
];

export const experience = [
  {
    id: "virginia-tech",
    company: "Virginia Tech",
    role: "Student Software Engineer / WISE Project Assistant",
    location: "Alexandria, VA",
    period: "Aug 2025 – Present",
    type: "current",
    bullets: [
      "Built production-ready RAG pipeline using S3 Vectors for semantic search across Canvas LMS course materials",
      "Implemented hybrid retrieval (vector similarity + keyword overlap) achieving 85%+ answer accuracy on course-specific queries",
      "Designed multi-step agent workflow where LLM autonomously decides tool usage with role-based access control",
      "Developed full-stack: Spring Boot REST API (Java), Flask microservice (Python), AWS Lambda vectorization workers",
      "Engineered JWT-based Canvas LMS integration for real-time grade sync with strict security boundaries",
      "Scaled to 10K+ queries/day capacity; pilot deployed to 5 students, planned 200+ rollout next semester"
    ]
  },
  {
    id: "tray",
    company: "Tray.com",
    role: "Software Engineer",
    location: "Remote",
    period: "Apr 2023 – Aug 2024",
    type: "past",
    bullets: [
      "Optimized Java/Spring Boot REST APIs: +15% performance, +10% customer satisfaction",
      "Led 7Shifts platform integration with Tray's microservices and POS system—reduced manual workload 25% for 50+ clients",
      "Reduced cloud bandwidth 30% via efficient binary serialization and in-memory batching",
      "Deployed Docker on AWS EC2 with Prometheus metrics and ELK-based logging for observability"
    ]
  },
  {
    id: "amazon",
    company: "Amazon",
    role: "Software Development Engineer",
    location: "Bangalore, India",
    period: "Mar 2022 – Apr 2023",
    type: "past",
    bullets: [
      "Built backend for multimedia data labeling platform (Alexa Data Services)—200,000+ items/month via Lambda/SQS/SNS",
      "Designed callback orchestration for SageMaker Ground Truth and MTurk with token-based API resumption",
      "Enhanced fault tolerance of ML labeling pipelines supporting millions of callback events monthly",
      "Implemented quality computation comparing 3 annotators per item—reduced labeling errors 15%"
    ]
  }
];

export const education = [
  {
    school: "Virginia Tech",
    degree: "Masters of Engineering (Computer Science)",
    gpa: "3.9/4.0",
    period: "Aug 2024 – May 2026",
    coursework: ["AI Engineering", "Cloud Computing", "Parallel Computing", "Natural Language Processing", "Machine Learning"]
  },
  {
    school: "MIT Pune",
    degree: "BTech (Computer Science and Engineering)",
    gpa: "3.9/4.0",
    period: "Aug 2018 – May 2022",
    coursework: ["Operating Systems", "Computer Architecture", "OOP", "Deep Learning"]
  }
];

export const projects: {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  summary: string;
  metrics: string[];
  github: string | null;
  featured: boolean;
  status?: "coming-soon";
}[] = [
  {
    id: "hokielearn",
    title: "HokieLearn",
    subtitle: "Virtual Teaching Assistant",
    tags: ["RAG", "Canvas LMS", "AWS Lambda", "Spring Boot"],
    summary: "Production-ready RAG pipeline for answering student questions grounded in course materials with strict security boundaries.",
    metrics: ["10K+ queries/day capacity", "85%+ accuracy", "5→200 student rollout"],
    github: "https://github.com/VT-AI-Teaching-Assistant",
    featured: true
  },
  {
    id: "ai-kiosk",
    title: "AI-Kiosk",
    subtitle: "AI-Powered Restaurant Ordering",
    tags: ["RAG", "Whisper", "LLaMA 3.2", "FAISS + BM25"],
    summary: "Conversational ordering system with speech-to-text, hybrid retrieval, and schema-constrained generation for menu accuracy.",
    metrics: ["Reduced ordering errors", "Cost-effective inference", "Model migration: OpenAI → LLaMA"],
    github: "https://github.com/Kiosk-ByteCrew",
    featured: true
  },
  {
    id: "inbox2li",
    title: "inbox2Li",
    subtitle: "Email to LinkedIn Converter",
    tags: ["SaaS", "NLP", "Prompt Engineering"],
    summary: "Converts email threads into structured LinkedIn-ready outreach with intent extraction and entity parsing.",
    metrics: ["MVP complete", "Launch pending"],
    github: null,
    featured: false,
    status: "coming-soon"
  },
  {
    id: "resume-tailor",
    title: "Resume Tailoring Platform",
    subtitle: "ATS-Focused Optimization",
    tags: ["SaaS", "LaTeX", "NLP"],
    summary: "Adapts resumes to job descriptions while maintaining ATS compatibility with token-budgeted prompts.",
    metrics: ["Architecture finalized", "Production build pending"],
    github: null,
    featured: false,
    status: "coming-soon"
  }
];

export const publication = {
  title: "Building Applications Using OpenAI APIs",
  publisher: "Springer – Studies in Computational Intelligence",
  doi: "10.1007/978-981-97-8460-8_3",
  url: "https://doi.org/10.1007/978-981-97-8460-8_3",
  summary: "Practical design patterns for building reliable LLM-powered applications, focusing on system boundaries, prompt structure, and evaluation strategies rather than model internals.",
  contributions: [
    "Prompt design patterns for controllable outputs",
    "Cost and latency tradeoff analysis",
    "Failure modes in production LLM systems",
    "Retrieval-augmented pipeline patterns"
  ]
};

export const skills = {
  languages: ["C++", "Java", "TypeScript", "JavaScript", "Python"],
  backend: ["Spring Boot", "REST APIs", "Flask", "gRPC", "GraphQL", "PostgreSQL"],
  aiSystems: ["RAG pipelines", "Vector embeddings", "Hybrid retrieval", "Prompt engineering", "Tool orchestration", "LLM evaluation"],
  cloudInfra: ["AWS Lambda", "SQS/SNS", "S3", "RDS", "EC2", "Docker", "Prometheus", "ELK Stack"]
};

export const projectDetails = {
  "hokielearn": {
    overview: `HokieLearn is a backend-heavy Virtual Teaching Assistant designed to answer student questions using course-specific materials while integrating directly with the Canvas LMS. The system is built as a production-ready RAG pipeline with strict security boundaries, asynchronous processing, and evaluation hooks.`,
    problem: {
      description: "Large courses generate repetitive student questions across assignments, lectures, and announcements. Instructors and TAs spend disproportionate time answering questions that already exist in course material.",
      constraints: [
        "Responses must be grounded strictly in course content",
        "Must integrate with Canvas LMS authentication",
        "Must scale to thousands of concurrent student queries",
        "Must be auditable (no hallucinated answers)"
      ]
    },
    architecture: {
      ingestion: "Course PDFs, announcements, and lecture transcripts uploaded to S3. Text chunking with overlap + metadata (course, week, source).",
      vectorization: "Background Lambda workers generate embeddings. Stored in vector index with hybrid retrieval support.",
      retrieval: "Hybrid search (dense + keyword filtering). Top-K capped with relevance threshold.",
      generation: "Tool-using LLM agent constrained to retrieved context. Explicit refusal behavior if answer not found.",
      integration: "Canvas LMS OAuth/JWT authentication. Role-based access control (student vs instructor).",
      infra: "AWS Lambda + SQS/SNS for async processing. Stateless APIs behind API Gateway."
    },
    decisions: [
      { decision: "Hybrid retrieval over pure vector search", reason: "Improved precision for short factual queries (deadlines, grading policies)." },
      { decision: "Asynchronous ingestion pipeline", reason: "Prevented blocking uploads during embedding generation." },
      { decision: "Strict context bounding", reason: "Prevented cost explosion and hallucinations." },
      { decision: "JWT-based LMS auth", reason: "Avoided duplicating user identity systems." }
    ],
    tradeoffs: [
      "Chose Lambda + queues over containers for operational simplicity at the cost of cold starts.",
      "Limited long-context answers to maintain latency and cost bounds.",
      "Deferred fine-tuning in favor of retrieval-first correctness."
    ],
    results: [
      "Scaled to 10K+ queries/day in internal testing",
      "Pilot deployed to 5 students, with planned 200+ rollout",
      "Reduced repetitive TA workload significantly",
      "Clear audit trail for every answer generated"
    ]
  },
  "ai-kiosk": {
    overview: `AI-Kiosk is an AI-powered restaurant ordering system that allows customers to interact using natural language. The system combines speech-to-text, RAG, and menu-aware reasoning to handle real-world ordering flows.`,
    problem: {
      description: "Traditional kiosks rely on rigid UI flows that break with ambiguous orders, do not handle substitutions well, and require frequent manual updates.",
      constraints: [
        "Enable conversational ordering",
        "Keep responses menu-accurate and deterministic",
        "Handle noisy audio environments",
        "Control inference costs"
      ]
    },
    architecture: {
      input: "Speech-to-text via Whisper. Text fallback for noisy environments.",
      knowledge: "Menu + pricing + customization rules. Stored as structured data + vector index.",
      retrieval: "Hybrid FAISS + BM25 for precision on item names.",
      generation: "LLM constrained by menu schema. Rule-based validation after generation.",
      models: "Initially OpenAI, migrated to LLaMA 3.2 for cost control.",
      backend: "Stateless APIs for ordering flow. Session tracking with explicit state machine."
    },
    decisions: [
      { decision: "Schema-constrained generation", reason: "Prevented invalid orders and hallucinated menu items." },
      { decision: "Hybrid retrieval", reason: "Dense vectors alone failed on similar item names." },
      { decision: "Model migration strategy", reason: "Abstracted inference layer to swap providers without rewriting logic." }
    ],
    tradeoffs: [
      "Added post-generation validation logic for correctness.",
      "Accepted higher latency to ensure deterministic outputs.",
      "Avoided end-to-end agent autonomy in favor of control."
    ],
    results: [
      "Robust handling of ambiguous and conversational orders",
      "Reduced ordering errors compared to rule-based kiosks",
      "Cost-effective inference after model migration"
    ]
  }
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" }
];
