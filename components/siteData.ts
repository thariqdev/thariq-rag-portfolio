// All the page content in one place. Every fact here comes from the CV.
export const EMAIL = "thariqmohammed0310@gmail.com";
export const PHONE = "+971 56 469 4274";
export const GITHUB_URL = "https://github.com/thariqdev";
export const LINKEDIN_URL = "https://www.linkedin.com/in/b-mohammed-thariq-b11b673b2/";

export const JOBS = [
  {
    when: "Sept 2024 to Aug 2026",
    title: "Software Engineer, Full Stack",
    where: "Evoqins Pvt Ltd",
    bullets: [
      "Built responsive, production-ready apps in React.js and Next.js for fintech and wealth platforms. Turned Figma and Adobe XD designs into pixel-perfect screens.",
      "Made admin dashboards and management interfaces from reusable components, in JavaScript and TypeScript.",
      "Built role-based flows for investment, customer, partner and admin modules, with JWT authentication and REST API integration.",
      "Moved into the backend on FundsApp: onboarding, authentication, KYC, investments and SIP management in Python, FastAPI, SQLAlchemy and PostgreSQL.",
      "Tuned performance and cross-browser support in a team of 3 (backend, design, product). Used Git, Postman, Swagger/OpenAPI and Agile.",
    ],
  },
  {
    when: "Sept 2023 to Sept 2024",
    title: "Junior Software Developer",
    where: "Asian Media Group",
    bullets: [
      "Built responsive web apps with React.js, JavaScript and Tailwind CSS.",
      "Turned Adobe XD designs into production interfaces with accurate layout, spacing and cross-browser support.",
      "Wrote reusable components, integrated REST APIs, and built CMS features with WordPress Advanced Custom Fields.",
      "Fixed bugs, improved UI performance and kept work under Git version control.",
    ],
  },
];

export type Project = {
  n: string;
  name: string;
  sub: string;
  desc: string;
  bullets?: string[];
  tags: string[];
  links?: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    n: "01",
    name: "Career AI",
    sub: "Full stack job-readiness platform with a RAG assistant",
    desc: "It compares a job posting against skills backed by evidence. You see your gaps and a live match score. It also writes interview prep and flashcards, parses CVs, and tracks applications and interviews with calendar export.",
    bullets: [
      "Built the RAG assistant from scratch: chunking, hybrid BM25 and embedding search, and answers checked against their sources. Runs on local Ollama or hosted Groq and Gemini models.",
      "Added citation and faithfulness checks, exact lists computed in code, and prompt-injection defences.",
      "Secure accounts with scrypt hashing, session cookies, rate-limited login and email password reset.",
      "900+ automated tests, CI/CD on GitHub Actions, Docker.",
    ],
    tags: ["FastAPI", "PostgreSQL", "pgvector", "SQLAlchemy", "Alembic", "Next.js", "TypeScript", "Tailwind CSS"],
    links: [
      { label: "Live demo", href: "https://career-ai-inky-ten.vercel.app" },
      { label: "Source code", href: "https://github.com/thariqdev/career-ai" },
    ],
  },
  {
    n: "02",
    name: "Talk to Thariq",
    sub: "RAG portfolio assistant",
    desc: "This site. The chat assistant answers questions about my background from my own documents. When the answer is not in the retrieved text, it says it does not know.",
    bullets: [
      "Groq gpt-oss-20b with a Gemini Flash fallback, Gemini embeddings, and a JSON vector index with in-memory cosine similarity.",
      "Runs on free tiers only, keeps API keys on the server, and ships in a Docker container.",
    ],
    tags: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Docker"],
    links: [{ label: "Source code", href: "https://github.com/thariqdev/thariq-rag-portfolio" }],
  },
  {
    n: "03",
    name: "FundsApp",
    sub: "Enterprise mutual fund investment platform · backend",
    desc: "I built and worked with 15+ REST APIs for partner and customer onboarding, authentication, investments, SIPs and KYC.",
    bullets: [
      "Shipped risk profiling, client management, account lifecycle, account closure and notification preferences.",
      "JWT authentication and MPIN-based security workflows.",
    ],
    tags: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL"],
  },
  {
    n: "04",
    name: "Rudo",
    sub: "Mutual fund platform · frontend",
    desc: "I built frontend features, responsive dashboards and reusable UI components that use REST APIs. I also connected Strapi CMS so the team can manage content across the platform.",
    tags: ["React.js", "REST APIs", "Strapi CMS"],
  },
  {
    n: "05",
    name: "Rayi",
    sub: "Wealth management platform · frontend",
    desc: "I built admin dashboards, management interfaces and investment workflow screens. The components are reusable and responsive, and they connect to REST and third-party APIs.",
    tags: ["React.js", "Next.js", "REST APIs"],
  },
];

export const BEFORE_AFTER = [
  { title: "Database queries, job list page", sub: "Fixed N+1 queries", before: 214, after: 19, beforeLabel: "214", afterLabel: "19" },
  { title: "Database queries, first assistant answer", sub: "Fixed N+1 queries", before: 364, after: 164, beforeLabel: "364", afterLabel: "164" },
  { title: "Injection attempts that got through", sub: "Test set of 32. On 24 unseen attacks, 4 got through.", before: 21, after: 0, beforeLabel: "21 of 32", afterLabel: "0 of 32" },
];

export const SKILL_GROUPS = [
  { name: "Frontend", color: "#2338f5", items: ["React.js", "Next.js", "JavaScript", "TypeScript", "Redux Toolkit", "Bootstrap", "Tailwind CSS"] },
  { name: "Backend", color: "#ff5a1f", items: ["Python", "FastAPI", "RESTful APIs", "SQLAlchemy", "JWT Authentication", "API Integration", "Node.js", "Express.js"] },
  { name: "Databases", color: "#1f9d6b", items: ["PostgreSQL", "Database Design", "pgvector", "Alembic"] },
  { name: "Tools and practices", color: "#f2b705", items: ["Git", "GitHub", "Postman", "Swagger (OpenAPI)", "Agile Development", "Version Control", "Docker", "GitHub Actions"] },
  { name: "Domain", color: "#8a5cf6", items: ["Fintech", "Wealth Management", "Mutual Funds", "Investment Platforms", "KYC Workflows", "RAG", "GenAI"] },
];

// Dates are decimal years (Sept 2023 = 2023.67). Degrees only have years on the CV.
export const TIMELINE = [
  { name: "Chinmaya College", sub: "BCA", from: 2020.0, to: 2023.0, kind: "edu" },
  { name: "Asian Media Group", sub: "Jr. developer", from: 2023.67, to: 2024.67, kind: "work" },
  { name: "Evoqins Pvt Ltd", sub: "Full stack engineer", from: 2024.67, to: 2026.67, kind: "work" },
  { name: "SRM Institute", sub: "MCA, online", from: 2024.0, to: 2027.0, kind: "edu" },
] as const;
