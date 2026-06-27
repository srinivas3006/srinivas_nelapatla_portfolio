import type { DbProject } from "./portfolio-content";

export const PROJECTS: DbProject[] = [
  {
    id: "proj-1",
    slug: "pluto-portfolio",
    title: "Pluto Guided Portfolio",
    description: "A premium, green-themed personal portfolio with an intelligent assistant.",
    image: "", // Add your image path here like "/projects/pluto.png"
    tags: ["React", "TypeScript", "Tailwind CSS", "TanStack"],
    category: "web",
    year: "2024",
    role: "Full Stack Developer",
    timeline: "2 weeks",
    overview: "A seamless portfolio showcasing clean design and interactive elements.",
    problem: "Needed a unique way to present projects to potential clients and recruiters.",
    solution: "Built a fully static, fast-loading portfolio with smooth animations.",
    highlights: ["Interactive Pluto assistant", "Modern UI with Radix", "Responsive animations"],
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    links: [{ label: "Live site", href: "#" }],
    sort_order: 1,
    is_published: true,
  },
  // Add more projects here
];
