import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Code2,
  Database,
  LineChart,
  Layers,
  Wrench,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  GraduationCap,
  Sprout,
  Sparkles,
  Briefcase,
  Target,
  BookOpen,
  Rocket,
  Leaf,
  MousePointer2,
  Download,
} from "lucide-react";
import { PlutoChat } from "@/components/Pluto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import srinivas from "@/assets/srinivas.png";
import plutoSit from "@/assets/pluto-sit.png";
import plutoRun from "@/assets/pluto-run.png";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Srinivas Nelapatla — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Srinivas Nelapatla — a Computer Science Engineer building clean, scalable & meaningful digital solutions.",
      },
      { property: "og:title", content: "Srinivas Nelapatla — Full Stack Developer" },
      {
        property: "og:description",
        content: "Clean, scalable & meaningful digital solutions.",
      },
    ],
  }),
  component: Portfolio,
});

/* ───────────── helpers ───────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const sectionOrder = [
  "home",
  "about",
  "skills",
  "work",
  "experience",
  "stories",
  "contact",
];

const sectionHints: Record<string, string> = {
  home: "Hi! I'm Pluto 🐾 Let me walk you through Srinivas' world.",
  about: "Here's a glimpse into who he is 🌱",
  skills: "These are the tools he builds with 🛠️",
  work: "And these are the things he's actually shipped 🚀",
  experience: "A short story of how he got here 🌿",
  stories: "Lately, he's been curious about these ✨",
  contact: "Liked what you saw? Say hi — he reads every message 💌",
};

function useActiveSection() {
  const [id, setId] = useState("home");
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const vh = window.innerHeight;
      // Activation line sits ~45% down the viewport. A section becomes
      // active only once its top has scrolled past that line — i.e. it's
      // genuinely entered the viewport and is the dominant one on screen.
      const line = vh * 0.45;
      let current = sectionOrder[0];
      for (const sid of sectionOrder) {
        const el = document.getElementById(sid);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line * 0.5) current = sid;
      }
      setId((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return id;
}

/* ───────────── data ───────────── */

const skills = [
  {
    icon: Code2,
    title: "Frontend",
    items: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "React", level: 85 },
    ],
  },
  {
    icon: Layers,
    title: "Backend",
    items: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "REST APIs", level: 86 },
      { name: "Authentication", level: 75 },
    ],
  },
  {
    icon: Database,
    title: "Database",
    items: [
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "SQL", level: 88 },
      { name: "Data Modeling", level: 78 },
    ],
  },
  {
    icon: LineChart,
    title: "Data Analysis",
    items: [
      { name: "Excel", level: 90 },
      { name: "Python (Pandas)", level: 82 },
      { name: "Data Visualization", level: 80 },
      { name: "Insights", level: 78 },
    ],
  },
  {
    icon: Wrench,
    title: "Tools",
    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 85 },
      { name: "Figma", level: 75 },
    ],
  },
];

const projects = [
  {
    image: project1,
    title: "Data Insights Dashboard",
    desc: "Interactive dashboard for analyzing business data.",
    tags: ["Python", "Pandas", "Power BI"],
    cat: "data",
  },
  {
    image: project2,
    title: "Portfolio Website",
    desc: "Personal portfolio built with modern UI/UX and animations.",
    tags: ["React", "Tailwind", "Framer Motion"],
    cat: "web",
  },
  {
    image: project3,
    title: "Task Manager API",
    desc: "REST API for managing tasks with auth & database.",
    tags: ["Node.js", "Express", "MySQL"],
    cat: "tools",
  },
  {
    image: project1,
    title: "E-Commerce UI",
    desc: "Responsive e-commerce frontend with cart and filters.",
    tags: ["React", "Context API", "CSS"],
    cat: "web",
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Apps" },
  { id: "data", label: "Data Projects" },
  { id: "tools", label: "Tools" },
];

const journey = [
  {
    icon: GraduationCap,
    year: "2020 — 2024",
    title: "B.Tech CSE",
    body: "Completed my engineering with strong foundation in CS fundamentals.",
  },
  {
    icon: BookOpen,
    year: "2023 — 2024",
    title: "PGECET Preparation",
    body: "Dedicated phase of learning and problem solving.",
  },
  {
    icon: Briefcase,
    year: "2023 — Present",
    title: "Freelance Projects",
    body: "Worked on multiple freelance projects in web & data domain.",
  },
  {
    icon: Target,
    year: "Always",
    title: "Continuous Learning",
    body: "Exploring new technologies and improving every day.",
  },
];

/* ───────────── page ───────────── */

function Portfolio() {
  const active = useActiveSection();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <DecorLeaves />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Stories />
      <Contact />
      <Footer />
      <PlutoChat hint={sectionHints[active] ?? sectionHints.home} />
    </div>
  );
}

/* ───────────── decor ───────────── */

function DecorLeaves() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  return (
    <>
      <motion.div
        style={{ y }}
        aria-hidden
        className="pointer-events-none fixed left-0 top-1/3 z-0 opacity-50"
      >
        <Leaf className="h-24 w-24 -rotate-45 text-primary/15" strokeWidth={1} />
      </motion.div>
      <motion.div
        style={{ y }}
        aria-hidden
        className="pointer-events-none fixed right-2 bottom-10 z-0 opacity-50"
      >
        <Leaf className="h-20 w-20 rotate-45 text-primary/15" strokeWidth={1} />
      </motion.div>
    </>
  );
}

/* ───────────── nav ───────────── */

function Nav() {
  const active = useActiveSection();
  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "stories", label: "Stories" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a href="#home" className="flex items-center gap-2 font-display text-base">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <Leaf className="h-4 w-4 text-primary" />
          </span>
          <span>Srinivas Nelapatla</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative transition-colors hover:text-foreground ${
                active === l.id ? "text-foreground" : ""
              }`}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 right-0 mx-auto h-[2px] w-5 rounded-full bg-primary"
                />
              )}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-flex"
        >
          Let's Connect
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

/* ───────────── hero ───────────── */

function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              CSE GRADUATE · BUILDER · LEARNER
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              I build <em className="italic text-primary">clean,</em>
              <br />
              <em className="italic text-primary">scalable</em> &amp;
              <br />
              <em className="italic text-primary">meaningful</em>
              <br />
              digital solutions.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-base text-foreground/70">
              A Computer Science Engineer passionate about creating impact through{" "}
              <span className="text-primary">code and creativity.</span>
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Explore My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                Download Resume
                <Download className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <div className="mt-16 hidden flex-col items-center gap-2 text-xs text-muted-foreground sm:flex">
            <MousePointer2 className="h-4 w-4 animate-bounce" />
            Scroll to explore
          </div>
        </div>

        {/* right column */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-[50%_50%_45%_45%/55%_55%_45%_45%] bg-gradient-to-b from-accent/40 to-primary/20" />
            <img
              src={srinivas}
              alt="Srinivas Nelapatla"
              width={896}
              height={1024}
              className="relative h-full w-full object-contain object-bottom"
            />
          </motion.div>

          {/* Currently Exploring card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="absolute right-0 top-12 hidden rounded-2xl bg-card p-4 shadow-lift ring-1 ring-border/60 sm:block"
          >
            <p className="mb-3 flex items-center gap-2 text-xs font-medium">
              <Rocket className="h-3.5 w-3.5 text-primary" />
              Currently Exploring
            </p>
            <ul className="space-y-2 text-xs text-foreground/80">
              {["Backend Systems", "Data Analysis", "Scalable Web Apps"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pluto in hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="absolute -bottom-6 right-0 hidden w-44 sm:block"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={plutoSit}
                alt="Pluto"
                width={300}
                height={300}
                className="h-auto w-full"
              />
            </motion.div>
            <div className="absolute -top-4 -left-28 w-52 rounded-2xl bg-card p-3 shadow-lift ring-1 ring-border/60">
              <p className="text-xs font-medium">Hi! I'm Pluto 🐾</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                I'll be your guide today!
              </p>
              <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-card" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── about ───────────── */

function About() {
  const cards = [
    { icon: GraduationCap, title: "B.Tech CSE", sub: "2024 Graduate" },
    { icon: Sprout, title: "Growth Journey", sub: "Learning. Building. Growing." },
    { icon: Sparkles, title: "Always Improving", sub: "Better every day." },
  ];

  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 rounded-[2rem] bg-card/70 p-8 shadow-soft ring-1 ring-border/50 lg:grid-cols-[1fr_1.2fr_1fr] lg:p-12">
          {/* Stat tiles */}
          <div className="space-y-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-background/70 p-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-base">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Story */}
          <div className="relative">
            <Reveal>
              <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
                A little bit <em className="italic text-primary">about</em> me.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/80">
                <p>
                  I'm a Computer Science Engineer (2024) who loves turning ideas into
                  real-world solutions. From preparing for PGECET to building projects
                  and working on freelance assignments — every step has shaped me into a
                  better developer.
                </p>
                <p>
                  I enjoy solving problems, building clean systems and learning something
                  new every day.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href="#work"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                More About Me <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>

            {/* Running pluto floating across */}
            <motion.img
              src={plutoRun}
              alt=""
              aria-hidden
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute -right-10 -bottom-16 hidden h-44 w-auto lg:block"
            />
          </div>

          {/* Stats card (green) */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl bg-primary p-7 text-primary-foreground shadow-lift">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { n: "10+", l: "Projects Completed" },
                  { n: "5+", l: "Freelance Works" },
                  { n: "2+", l: "Years of Learning" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="font-display text-3xl">{s.n}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-wider opacity-80">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-primary-foreground/20 pt-5">
                <p className="font-display italic text-lg leading-snug">
                  "Code with purpose.
                  <br />
                  Build with passion.
                  <br />
                  Impact the world."
                </p>
                <p className="mt-3 text-right font-display italic text-sm opacity-80">
                  — Srinivas
                </p>
              </div>
              <Leaf className="absolute -right-2 -bottom-2 h-24 w-24 rotate-12 text-primary-foreground/10" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────── skills ───────────── */

function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">
            ✦ What I do best
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            My <em className="italic text-primary">Skills</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-base">{s.title}</h3>
                </div>
                <ul className="space-y-3">
                  {s.items.map((it) => (
                    <li key={it.name}>
                      <div className="flex items-center justify-between text-xs text-foreground/75">
                        <span>{it.name}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${it.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── projects ───────────── */

function Projects() {
  const [filter, setFilter] = useState("all");
  const visible = projects.filter((p) => filter === "all" || p.cat === filter);

  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              ✦ Things I've built
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
              Featured <em className="italic text-primary">Projects</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2 rounded-full bg-card p-1.5 shadow-soft ring-1 ring-border/60">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    filter === f.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((p, i) => (
            <Reveal key={p.title + i} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-lift"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <motion.img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base">{p.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-foreground/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            View All Projects <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────── experience ───────────── */

function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">✦ My Journey</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            Experience &amp; <em className="italic text-primary">Education</em>
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-6 top-7 hidden h-px w-[calc(100%-3rem)] bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 lg:block" />
          <div className="grid gap-8 lg:grid-cols-4">
            {journey.map((j, i) => (
              <Reveal key={j.title} delay={i * 0.08}>
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-card shadow-soft ring-2 ring-primary/30"
                  >
                    <j.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <p className="mt-5 font-display text-lg">{j.title}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-primary/80">
                    {j.year}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {j.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── stories / exploring ───────────── */

function Stories() {
  const items = [
    {
      icon: Layers,
      title: "Backend at scale",
      desc: "Queues, caching layers, and the calm of a system that just works at 3am.",
    },
    {
      icon: Sparkles,
      title: "Quiet UI design",
      desc: "Interfaces that respect attention — less ornament, more intention.",
    },
    {
      icon: LineChart,
      title: "Data-driven apps",
      desc: "Making analytics feel like a conversation, not a spreadsheet.",
    },
  ];
  return (
    <section id="stories" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">✦ Exploring</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            What I'm <em className="italic text-primary">learning</em> next.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="h-full rounded-2xl border border-border bg-gradient-to-br from-card to-accent/10 p-7 shadow-soft"
              >
                <e.icon className="mb-4 h-6 w-6 text-primary" />
                <h3 className="font-display text-xl">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── contact ───────────── */

function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">✦ Contact</p>
          <h2 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
            Let's build something <em className="italic text-primary">meaningful</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-foreground/70">
            Open to thoughtful projects, freelance work, and quiet collaborations.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! I'll get back to you soon 🌿");
            }}
            className="mx-auto mt-10 grid max-w-xl gap-4 rounded-3xl border border-border bg-card p-8 text-left shadow-soft"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Your name" required className="h-12 rounded-xl bg-background" />
              <Input
                type="email"
                placeholder="Email"
                required
                className="h-12 rounded-xl bg-background"
              />
            </div>
            <Textarea
              placeholder="Tell me about your project…"
              rows={5}
              className="rounded-xl bg-background"
            />
            <Button
              type="submit"
              className="mt-2 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Send message
            </Button>
          </form>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a
              href="mailto:hello@srinivas.dev"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              <span>hello@srinivas.dev</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-primary/5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-muted-foreground sm:flex-row">
        <p className="flex items-center gap-2">
          <Leaf className="h-3.5 w-3.5 text-primary" />
          Let's build something amazing together!
        </p>
        <p>© 2024 Srinivas Nelapatla. All rights reserved.</p>
      </div>
    </footer>
  );
}
