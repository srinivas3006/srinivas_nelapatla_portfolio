import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export type Project = {
  slug: string;
  image: string;
  title: string;
  desc: string;
  tags: string[];
  cat: "web" | "data" | "tools";
  year: string;
  role: string;
  timeline: string;
  overview: string;
  problem: string;
  solution: string;
  highlights: string[];
  stack: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "data-insights-dashboard",
    image: project1,
    title: "Data Insights Dashboard",
    desc: "Interactive dashboard for analyzing business data.",
    tags: ["Python", "Pandas", "Power BI"],
    cat: "data",
    year: "2024",
    role: "Full-stack & Data",
    timeline: "6 weeks",
    overview:
      "A reporting layer that turns raw operational CSV exports into a live, filterable dashboard for non-technical stakeholders.",
    problem:
      "Teams were spending hours each week stitching together spreadsheets to answer the same recurring questions about revenue, churn and channel performance.",
    solution:
      "Built an ETL pipeline in Python + Pandas that normalises the exports, persists them to a lightweight warehouse, and feeds a Power BI front-end with drill-down views.",
    highlights: [
      "Reduced weekly reporting time from ~6 hours to under 10 minutes",
      "Self-serve filters for region, product line and time window",
      "Automated daily refresh with anomaly alerts",
    ],
    stack: ["Python", "Pandas", "SQL", "Power BI", "GitHub Actions"],
    links: [{ label: "Case study", href: "#" }],
  },
  {
    slug: "portfolio-website",
    image: project2,
    title: "Portfolio Website",
    desc: "Personal portfolio built with modern UI/UX and animations.",
    tags: ["React", "Tailwind", "Framer Motion"],
    cat: "web",
    year: "2024",
    role: "Design & Engineering",
    timeline: "2 weeks",
    overview:
      "This site — a calm, editorial portfolio with a friendly guide (Pluto) that introduces each section as you scroll.",
    problem:
      "Most developer portfolios feel either too plain or too noisy. I wanted something that felt personal, premium and a little playful.",
    solution:
      "Designed a soft green + cream system, paired Fraunces with Inter, and layered subtle motion that reacts to scroll without getting in the way.",
    highlights: [
      "Custom OKLCH design tokens for consistent contrast",
      "Pluto assistant with contextual scroll hints",
      "Fully responsive, animation-light on mobile",
    ],
    stack: ["React", "TanStack Start", "Tailwind", "Motion"],
    links: [
      { label: "Live site", href: "/" },
      { label: "Source", href: "#" },
    ],
  },
  {
    slug: "task-manager-api",
    image: project3,
    title: "Task Manager API",
    desc: "REST API for managing tasks with auth & database.",
    tags: ["Node.js", "Express", "MySQL"],
    cat: "tools",
    year: "2023",
    role: "Backend",
    timeline: "3 weeks",
    overview:
      "A production-style REST API for task and project management, with JWT auth, role-based permissions and a relational data model.",
    problem:
      "I wanted a sandbox to practice building a real backend end-to-end — from schema design to deployment — instead of just CRUD demos.",
    solution:
      "Modelled the domain in MySQL, layered Express with validation middleware, and added refresh-token auth plus per-route rate limiting.",
    highlights: [
      "JWT access + refresh token flow with rotation",
      "Granular role-based permissions per workspace",
      "OpenAPI spec and Postman collection for consumers",
    ],
    stack: ["Node.js", "Express", "MySQL", "JWT", "Zod"],
    links: [{ label: "Repository", href: "#" }],
  },
  {
    slug: "ecommerce-ui",
    image: project1,
    title: "E-Commerce UI",
    desc: "Responsive e-commerce frontend with cart and filters.",
    tags: ["React", "Context API", "CSS"],
    cat: "web",
    year: "2023",
    role: "Frontend",
    timeline: "4 weeks",
    overview:
      "A responsive storefront with filtering, a persistent cart and a checkout flow — built to feel quick on mid-range phones.",
    problem:
      "Storefront prototypes I'd seen were heavy and slow to interact with on real devices, especially on slower networks.",
    solution:
      "Kept state local with Context API, lazy-loaded product imagery, and tuned the filter logic to stay under one frame on commodity hardware.",
    highlights: [
      "Sub-100ms filter interactions on a budget Android",
      "Cart persists across sessions via localStorage",
      "Fully keyboard navigable",
    ],
    stack: ["React", "Context API", "Vite", "CSS Modules"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
