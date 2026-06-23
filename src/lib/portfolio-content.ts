// Single source of truth for portfolio content shape + defaults.
// The admin dashboard stores overrides in the `site_content` table
// keyed by section name; rendered pages merge defaults <- DB overrides.

import srinivas from "@/assets/srinivas.png";

export type CtaLink = { label: string; href: string };

export type HeroContent = {
  eyebrow: string;
  headlinePrefix: string;
  italicWords: [string, string, string];
  headlineSuffix: string;
  subhead: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  exploring: string[];
  plutoIntroTitle: string;
  plutoIntroSub: string;
  imageUrl: string; // empty => default bundled asset
};

export type AboutCard = { icon: string; title: string; sub: string };
export type AboutStat = { n: string; l: string };
export type AboutContent = {
  heading: string;
  italicWord: string;
  paragraphs: string[];
  cards: AboutCard[];
  stats: AboutStat[];
  quote: string;
  quoteAuthor: string;
};

export type SkillGroup = {
  icon: string;
  title: string;
  items: { name: string; level: number }[];
};

export type JourneyItem = { icon: string; year: string; title: string; body: string };
export type StoryItem = { icon: string; title: string; desc: string };

export type ContactContent = {
  eyebrow: string;
  heading: string;
  italicWord: string;
  sub: string;
  email: string;
  github: string;
  linkedin: string;
  footer: string;
  copyright: string;
};

export type SectionHints = {
  home: string;
  about: string;
  skills: string;
  work: string;
  experience: string;
  stories: string;
  contact: string;
};

export type PortfolioContent = {
  hero: HeroContent;
  about: AboutContent;
  skills: SkillGroup[];
  journey: JourneyItem[];
  stories: StoryItem[];
  contact: ContactContent;
  hints: SectionHints;
};

// ─────────── defaults ───────────

export const DEFAULT_HERO: HeroContent = {
  eyebrow: "CSE GRADUATE · BUILDER · LEARNER",
  headlinePrefix: "I build",
  italicWords: ["clean,", "scalable", "meaningful"],
  headlineSuffix: "digital solutions.",
  subhead:
    "A Computer Science Engineer passionate about creating impact through code and creativity.",
  primaryCta: { label: "Explore My Work", href: "#work" },
  secondaryCta: { label: "Download Resume", href: "#" },
  exploring: ["Backend Systems", "Data Analysis", "Scalable Web Apps"],
  plutoIntroTitle: "Hi! I'm Pluto 🐾",
  plutoIntroSub: "I'll be your guide today!",
  imageUrl: "",
};

export const DEFAULT_ABOUT: AboutContent = {
  heading: "A little bit",
  italicWord: "about",
  paragraphs: [
    "I'm a Computer Science Engineer (2024) who loves turning ideas into real-world solutions. From preparing for PGECET to building projects and working on freelance assignments — every step has shaped me into a better developer.",
    "I enjoy solving problems, building clean systems and learning something new every day.",
  ],
  cards: [
    { icon: "GraduationCap", title: "B.Tech CSE", sub: "2024 Graduate" },
    { icon: "Sprout", title: "Growth Journey", sub: "Learning. Building. Growing." },
    { icon: "Sparkles", title: "Always Improving", sub: "Better every day." },
  ],
  stats: [
    { n: "10+", l: "Projects Completed" },
    { n: "5+", l: "Freelance Works" },
    { n: "2+", l: "Years of Learning" },
  ],
  quote: "Code with purpose.\nBuild with passion.\nImpact the world.",
  quoteAuthor: "Srinivas",
};

export const DEFAULT_SKILLS: SkillGroup[] = [
  {
    icon: "Code2",
    title: "Frontend",
    items: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "React", level: 85 },
    ],
  },
  {
    icon: "Layers",
    title: "Backend",
    items: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "REST APIs", level: 86 },
      { name: "Authentication", level: 75 },
    ],
  },
  {
    icon: "Database",
    title: "Database",
    items: [
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "SQL", level: 88 },
      { name: "Data Modeling", level: 78 },
    ],
  },
  {
    icon: "LineChart",
    title: "Data Analysis",
    items: [
      { name: "Excel", level: 90 },
      { name: "Python (Pandas)", level: 82 },
      { name: "Data Visualization", level: 80 },
      { name: "Insights", level: 78 },
    ],
  },
  {
    icon: "Wrench",
    title: "Tools",
    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 85 },
      { name: "Figma", level: 75 },
    ],
  },
];

export const DEFAULT_JOURNEY: JourneyItem[] = [
  {
    icon: "GraduationCap",
    year: "2020 — 2024",
    title: "B.Tech CSE",
    body: "Completed my engineering with strong foundation in CS fundamentals.",
  },
  {
    icon: "BookOpen",
    year: "2023 — 2024",
    title: "PGECET Preparation",
    body: "Dedicated phase of learning and problem solving.",
  },
  {
    icon: "Briefcase",
    year: "2023 — Present",
    title: "Freelance Projects",
    body: "Worked on multiple freelance projects in web & data domain.",
  },
  {
    icon: "Target",
    year: "Always",
    title: "Continuous Learning",
    body: "Exploring new technologies and improving every day.",
  },
];

export const DEFAULT_STORIES: StoryItem[] = [
  {
    icon: "Layers",
    title: "Backend at scale",
    desc: "Queues, caching layers, and the calm of a system that just works at 3am.",
  },
  {
    icon: "Sparkles",
    title: "Quiet UI design",
    desc: "Interfaces that respect attention — less ornament, more intention.",
  },
  {
    icon: "LineChart",
    title: "Data-driven apps",
    desc: "Making analytics feel like a conversation, not a spreadsheet.",
  },
];

export const DEFAULT_CONTACT: ContactContent = {
  eyebrow: "✦ Contact",
  heading: "Let's build something",
  italicWord: "meaningful",
  sub: "Open to thoughtful projects, freelance work, and quiet collaborations.",
  email: "hello@srinivas.dev",
  github: "#",
  linkedin: "#",
  footer: "Let's build something amazing together!",
  copyright: "© 2024 Srinivas Nelapatla. All rights reserved.",
};

export const DEFAULT_HINTS: SectionHints = {
  home: "Hi! I'm Pluto 🐾 Let me walk you through Srinivas' world.",
  about: "Here's a glimpse into who he is 🌱",
  skills: "These are the tools he builds with 🛠️",
  work: "And these are the things he's actually shipped 🚀",
  experience: "A short story of how he got here 🌿",
  stories: "Lately, he's been curious about these ✨",
  contact: "Liked what you saw? Say hi — he reads every message 💌",
};

export const DEFAULTS: PortfolioContent = {
  hero: DEFAULT_HERO,
  about: DEFAULT_ABOUT,
  skills: DEFAULT_SKILLS,
  journey: DEFAULT_JOURNEY,
  stories: DEFAULT_STORIES,
  contact: DEFAULT_CONTACT,
  hints: DEFAULT_HINTS,
};

export const DEFAULT_HERO_IMAGE = srinivas;

// Allowed icon names used across content. Keeps the bundle deterministic.
export const ICON_OPTIONS = [
  "Code2", "Database", "LineChart", "Layers", "Wrench",
  "GraduationCap", "Sprout", "Sparkles", "Briefcase", "Target",
  "BookOpen", "Rocket", "Leaf", "Mail", "Github", "Linkedin",
] as const;
export type IconName = (typeof ICON_OPTIONS)[number];
