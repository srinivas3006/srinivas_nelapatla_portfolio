import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Rocket,
  Leaf,
  MousePointer2,
  Download,
} from "lucide-react";
import { PlutoChat } from "@/components/Pluto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import defaultSrinivas from "@/assets/srinivas.png";
import plutoSit from "@/assets/pluto-sit.png";
import plutoRun from "@/assets/pluto-run.png";
import { usePortfolioContent, useProjects, type DbProject } from "@/lib/use-portfolio";
import { DEFAULTS, type PortfolioContent } from "@/lib/portfolio-content";
import { getIcon } from "@/lib/icon-map";

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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
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

const sectionOrder = ["home", "about", "skills", "work", "experience", "stories", "contact"];

function useActiveSection() {
  const [id, setId] = useState("home");
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const line = window.innerHeight * 0.45;
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

function Portfolio() {
  const active = useActiveSection();
  const { data: content } = usePortfolioContent();
  const { data: projects } = useProjects();
  const c: PortfolioContent = content ?? DEFAULTS;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <DecorLeaves />
      <Nav active={active} />
      <Hero hero={c.hero} />
      <About about={c.about} />
      <Skills skills={c.skills} />
      <Projects projects={projects ?? []} />
      <Experience journey={c.journey} />
      <Stories stories={c.stories} />
      <Contact contact={c.contact} />
      <Footer contact={c.contact} />
      <PlutoChat hint={c.hints[active as keyof typeof c.hints] ?? c.hints.home} />
    </div>
  );
}

function DecorLeaves() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  return (
    <>
      <motion.div style={{ y }} aria-hidden className="pointer-events-none fixed left-0 top-1/3 z-0 opacity-50">
        <Leaf className="h-24 w-24 -rotate-45 text-primary/15" strokeWidth={1} />
      </motion.div>
      <motion.div style={{ y }} aria-hidden className="pointer-events-none fixed right-2 bottom-10 z-0 opacity-50">
        <Leaf className="h-20 w-20 rotate-45 text-primary/15" strokeWidth={1} />
      </motion.div>
    </>
  );
}

function Nav({ active }: { active: string }) {
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
              className={`relative transition-colors hover:text-foreground ${active === l.id ? "text-foreground" : ""}`}
            >
              {l.label}
              {active === l.id && (
                <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 left-0 right-0 mx-auto h-[2px] w-5 rounded-full bg-primary" />
              )}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-flex">
          Let's Connect <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

function Hero({ hero }: { hero: PortfolioContent["hero"] }) {
  const img = hero.imageUrl || defaultSrinivas;
  return (
    <section id="home" className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {hero.headlinePrefix}{" "}
              <em className="italic text-primary">{hero.italicWords[0]}</em>
              <br />
              <em className="italic text-primary">{hero.italicWords[1]}</em> &amp;
              <br />
              <em className="italic text-primary">{hero.italicWords[2]}</em>
              <br />
              {hero.headlineSuffix}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-base text-foreground/70">{hero.subhead}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={hero.primaryCta.href} className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href={hero.secondaryCta.href} className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground">
                {hero.secondaryCta.label} <Download className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
          <div className="mt-16 hidden flex-col items-center gap-2 text-xs text-muted-foreground sm:flex">
            <MousePointer2 className="h-4 w-4 animate-bounce" />
            Scroll to explore
          </div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-[50%_50%_45%_45%/55%_55%_45%_45%] bg-gradient-to-b from-accent/40 to-primary/20" />
            <img src={img} alt="Srinivas Nelapatla" className="relative h-full w-full object-contain object-bottom" />
          </motion.div>

          {hero.exploring.length > 0 && (
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
                {hero.exploring.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="absolute -bottom-6 right-0 hidden w-44 sm:block"
          >
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <img src={plutoSit} alt="Pluto" className="h-auto w-full" />
            </motion.div>
            <div className="absolute -top-4 -left-28 w-52 rounded-2xl bg-card p-3 shadow-lift ring-1 ring-border/60">
              <p className="text-xs font-medium">{hero.plutoIntroTitle}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{hero.plutoIntroSub}</p>
              <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-card" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function About({ about }: { about: PortfolioContent["about"] }) {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 rounded-[2rem] bg-card/70 p-8 shadow-soft ring-1 ring-border/50 lg:grid-cols-[1fr_1.2fr_1fr] lg:p-12">
          <div className="space-y-4">
            {about.cards.map((c, i) => {
              const Icon = getIcon(c.icon);
              return (
                <Reveal key={c.title + i} delay={i * 0.08}>
                  <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-background/70 p-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display text-base">{c.title}</p>
                      <p className="text-xs text-muted-foreground">{c.sub}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="relative">
            <Reveal>
              <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
                {about.heading} <em className="italic text-primary">{about.italicWord}</em> me.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/80">
                {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <a href="#work" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">
                More About Me <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
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

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl bg-primary p-7 text-primary-foreground shadow-lift">
              <div className="grid grid-cols-3 gap-3 text-center">
                {about.stats.map((s) => (
                  <div key={s.l}>
                    <p className="font-display text-3xl">{s.n}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-wider opacity-80">{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-primary-foreground/20 pt-5">
                <p className="font-display italic text-lg leading-snug whitespace-pre-line">
                  "{about.quote}"
                </p>
                <p className="mt-3 text-right font-display italic text-sm opacity-80">— {about.quoteAuthor}</p>
              </div>
              <Leaf className="absolute -right-2 -bottom-2 h-24 w-24 rotate-12 text-primary-foreground/10" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Skills({ skills }: { skills: PortfolioContent["skills"] }) {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">✦ What I do best</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            My <em className="italic text-primary">Skills</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <Reveal key={s.title + i} delay={i * 0.06}>
                <motion.div whileHover={{ y: -4 }} className="h-full rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lift">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

const filters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Apps" },
  { id: "data", label: "Data Projects" },
  { id: "tools", label: "Tools" },
];

function Projects({ projects }: { projects: DbProject[] }) {
  const [filter, setFilter] = useState("all");
  const visible = projects.filter((p) => p.is_published).filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">✦ Things I've built</p>
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
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${filter === f.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {visible.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-border bg-card/40 p-12 text-center">
            <p className="font-display text-lg">No projects yet</p>
            <p className="mt-2 text-sm text-muted-foreground">Check back soon!</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <Link to="/projects/$slug" params={{ slug: p.slug }} preload="intent" className="block h-full">
                  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-lift">
                    <div className="aspect-[4/3] overflow-hidden bg-secondary">
                      {p.image ? (
                        <motion.img src={p.image} alt={p.title} loading="lazy" whileHover={{ scale: 1.06 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary/10 to-accent/20" />
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-base">{p.title}</h3>
                        <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-foreground/70">{t}</span>
                        ))}
                      </div>
                      <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary">
                        View project <ArrowRight className="h-3 w-3" />
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Experience({ journey }: { journey: PortfolioContent["journey"] }) {
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
            {journey.map((j, i) => {
              const Icon = getIcon(j.icon);
              return (
                <Reveal key={j.title + i} delay={i * 0.08}>
                  <div className="relative">
                    <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-card shadow-soft ring-2 ring-primary/30">
                      <Icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <p className="mt-5 font-display text-lg">{j.title}</p>
                    <p className="mt-0.5 text-xs uppercase tracking-wider text-primary/80">{j.year}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{j.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stories({ stories }: { stories: PortfolioContent["stories"] }) {
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
          {stories.map((e, i) => {
            const Icon = getIcon(e.icon);
            return (
              <Reveal key={e.title + i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }} className="h-full rounded-2xl border border-border bg-gradient-to-br from-card to-accent/10 p-7 shadow-soft">
                  <Icon className="mb-4 h-6 w-6 text-primary" />
                  <h3 className="font-display text-xl">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact({ contact }: { contact: PortfolioContent["contact"] }) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">{contact.eyebrow}</p>
          <h2 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">
            {contact.heading} <em className="italic text-primary">{contact.italicWord}</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-foreground/70">{contact.sub}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! I'll get back to you soon 🌿");
              formRef.current?.reset();
            }}
            className="mx-auto mt-10 grid max-w-xl gap-4 rounded-3xl border border-border bg-card p-8 text-left shadow-soft"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Your name" required className="h-12 rounded-xl bg-background" />
              <Input type="email" placeholder="Email" required className="h-12 rounded-xl bg-background" />
            </div>
            <Textarea placeholder="Tell me about your project…" rows={5} className="rounded-xl bg-background" />
            <Button type="submit" className="mt-2 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Send message
            </Button>
          </form>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <Mail className="h-4 w-4" />
              <span>{contact.email}</span>
            </a>
            <a href={contact.github} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a href={contact.linkedin} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ contact }: { contact: PortfolioContent["contact"] }) {
  return (
    <footer className="border-t border-border bg-primary/5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-muted-foreground sm:flex-row">
        <p className="flex items-center gap-2">
          <Leaf className="h-3.5 w-3.5 text-primary" />
          {contact.footer}
        </p>
        <p>{contact.copyright}</p>
      </div>
    </footer>
  );
}
