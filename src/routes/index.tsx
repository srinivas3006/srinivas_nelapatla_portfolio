import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Code2,
  Database,
  LineChart,
  Layers,
  Wrench,
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Sprout,
  Compass,
  Hammer,
  Briefcase,
} from "lucide-react";
import { useState } from "react";
import { Pluto } from "@/components/Pluto";
import { Reveal } from "@/components/Reveal";
import { useScrollPluto } from "@/hooks/useScrollPluto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroPortrait from "@/assets/hero-portrait.jpg";
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
          "Calm, elegant portfolio of Srinivas Nelapatla — a full-stack developer crafting clean, scalable, meaningful digital experiences.",
      },
      { property: "og:title", content: "Srinivas Nelapatla — Full Stack Developer" },
      {
        property: "og:description",
        content: "Full-stack developer who cares about code and design.",
      },
    ],
  }),
  component: Portfolio,
});

const skills = [
  { icon: Code2, title: "Frontend", items: "React · TypeScript · Tailwind · Motion" },
  { icon: Layers, title: "Backend", items: "Node.js · Express · REST · tRPC" },
  { icon: Database, title: "Database", items: "PostgreSQL · MongoDB · Redis" },
  { icon: LineChart, title: "Data Analysis", items: "Python · Pandas · SQL · Power BI" },
  { icon: Wrench, title: "Tools", items: "Git · Docker · Figma · Vercel" },
];

const projects = [
  {
    image: project1,
    title: "Bloom Analytics",
    desc: "A calm SaaS dashboard helping small businesses understand their customers without the noise.",
    tags: ["Next.js", "PostgreSQL", "tRPC"],
  },
  {
    image: project2,
    title: "Sage Wallet",
    desc: "A mindful personal finance companion focused on gentle nudges over guilt-driven design.",
    tags: ["React Native", "Node", "Plaid"],
  },
  {
    image: project3,
    title: "Pulse Insights",
    desc: "Real-time analytics for product teams — data-driven decisions presented like a quiet morning paper.",
    tags: ["React", "FastAPI", "Recharts"],
  },
];

const journey = [
  {
    year: "2020 — 2024",
    title: "CSE, Undergraduate",
    body: "Four years of fundamentals — algorithms, systems, and the quiet joy of writing the first program that worked.",
    icon: Sprout,
  },
  {
    year: "2024",
    title: "PGECET Preparation",
    body: "A season of slowing down, going deeper, and rebuilding intuition from first principles.",
    icon: Compass,
  },
  {
    year: "2024 — Now",
    title: "Building in Public",
    body: "Real learning began through real projects — shipped, broken, refactored, and shipped again.",
    icon: Hammer,
  },
  {
    year: "Today",
    title: "Freelance & Collaboration",
    body: "Partnering with teams who care about craft, clarity, and the people behind the screen.",
    icon: Briefcase,
  },
];

const exploring = [
  {
    title: "Backend at scale",
    desc: "Queues, caching layers, and the calm of a system that just works at 3am.",
  },
  {
    title: "Quiet UI design",
    desc: "Interfaces that respect attention — less ornament, more intention.",
  },
  {
    title: "Data-driven apps",
    desc: "Making analytics feel like a conversation, not a spreadsheet.",
  },
];

function Portfolio() {
  const message = useScrollPluto("Hi! I'm Pluto 🐶 I'll help you explore Srinivas's work.");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Exploring />
      <Contact />
      <Footer />
      <Pluto message={message} />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg tracking-tight">
          Srinivas<span className="text-primary">.</span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          {["About", "Skills", "Work", "Journey", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90 md:inline-flex"
        >
          Let's talk
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      data-pluto-hint="Welcome — take your time, scroll gently ✨"
      className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Available for freelance · Summer 2026
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Srinivas
              <br />
              <span className="italic text-primary">Nelapatla</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-3 text-sm uppercase tracking-[0.25em] text-muted-foreground">
              Full Stack Developer
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-foreground/80">
              I build clean, scalable & meaningful digital experiences — where
              thoughtful code meets quiet design.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                See selected work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
              >
                Get in touch
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="relative">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[2rem] shadow-lift"
            >
              <img
                src={heroPortrait}
                alt="Portrait of Srinivas"
                width={896}
                height={1120}
                className="h-[520px] w-full object-cover sm:h-[600px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />
            </motion.div>
            <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 rounded-full bg-accent/40 blur-3xl sm:block" />
            <div className="absolute -top-8 -right-4 hidden h-24 w-24 rounded-full bg-primary/30 blur-2xl sm:block" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  const chapters = [
    {
      year: "2024",
      title: "A graduate, finally.",
      body: "Four years of Computer Science — late nights, group projects, and the quiet pride of finishing.",
    },
    {
      year: "Spring",
      title: "The pause.",
      body: "PGECET preparation. A season of slowing down — re-reading fundamentals like old letters.",
    },
    {
      year: "Summer",
      title: "Hands on the keyboard.",
      body: "Real learning started through real projects — small at first, then bolder, then shipped.",
    },
    {
      year: "Now",
      title: "Quiet freelance.",
      body: "Working with founders who want care over noise. Clean code, kind interfaces.",
    },
  ];

  return (
    <section
      id="about"
      data-pluto-hint="A short story about where Srinivas comes from 🌱"
      className="py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">01 — About</p>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            A short story, told <em className="italic text-primary">honestly</em>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          {chapters.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="border-l-2 border-primary/30 pl-6">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {c.year}
                </p>
                <h3 className="mt-2 font-display text-2xl">{c.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/75">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      data-pluto-hint="These are his core skills — built calmly, over time 🛠️"
      className="bg-secondary/40 py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">02 — Toolkit</p>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            Quietly capable across the stack.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="group h-full rounded-2xl border border-border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.items}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="work"
      data-pluto-hint="Check out his projects 👇 — these are real builds 🐾"
      className="py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">03 — Work</p>
              <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
                Selected projects.
              </h2>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              Each one shaped by the same belief — that software can feel calm.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <motion.button
                onClick={() => setActive(i)}
                whileHover="hover"
                className={`group block w-full overflow-hidden rounded-3xl border border-border bg-card text-left shadow-soft transition-shadow hover:shadow-lift ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <motion.img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    variants={{ hover: { scale: 1.04 } }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-start justify-between gap-6 p-7">
                  <div>
                    <h3 className="font-display text-2xl">{p.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-secondary px-3 py-1 text-xs text-foreground/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl overflow-hidden rounded-3xl bg-card shadow-lift"
          >
            <img
              src={projects[active].image}
              alt={projects[active].title}
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="p-8">
              <h3 className="font-display text-3xl">{projects[active].title}</h3>
              <p className="mt-3 text-foreground/75">{projects[active].desc}</p>
              <button
                onClick={() => setActive(null)}
                className="mt-6 rounded-full bg-foreground px-5 py-2 text-sm text-background"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

function Experience() {
  return (
    <section
      id="journey"
      data-pluto-hint="This is his journey — learning, building, shipping 🌿"
      className="bg-secondary/40 py-32"
    >
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">04 — Journey</p>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            From classroom to commits.
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border sm:left-[19px]" />
          <div className="space-y-10">
            {journey.map((j, i) => (
              <Reveal key={j.title} delay={i * 0.08}>
                <div className="flex gap-6">
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft sm:h-10 sm:w-10">
                    <j.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1 rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      {j.year}
                    </p>
                    <h3 className="mt-1 font-display text-xl">{j.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/75">{j.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Exploring() {
  return (
    <section
      data-pluto-hint="And these are the things he's exploring lately 🌎"
      className="py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">05 — Exploring</p>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            What I'm currently <em className="italic text-primary">learning</em>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {exploring.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="relative h-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-accent/10 p-7 shadow-soft"
              >
                <Sprout className="mb-4 h-6 w-6 text-primary" />
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

function Contact() {
  return (
    <section
      id="contact"
      data-pluto-hint="Reach out — Srinivas reads every message 💌"
      className="py-32"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">06 — Contact</p>
          <h2 className="font-display text-5xl tracking-tight sm:text-6xl">
            Let's build something <em className="italic text-primary">meaningful</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-foreground/70">
            Always open to thoughtful projects, freelance work, and quiet
            collaborations.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! I'll get back to you soon 🌿");
            }}
            className="mx-auto mt-12 grid max-w-xl gap-4 rounded-3xl border border-border bg-card p-8 text-left shadow-soft"
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
              className="mt-2 h-12 rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              Send message
            </Button>
          </form>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 flex justify-center gap-6 text-sm text-muted-foreground">
            <a
              href="mailto:hello@srinivas.dev"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" /> hello@srinivas.dev
            </a>
            <a href="#" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href="#" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Srinivas Nelapatla. Made calmly.</p>
        <p className="font-display italic">Guided by Pluto 🐾</p>
      </div>
    </footer>
  );
}
