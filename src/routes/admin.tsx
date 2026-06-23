import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/lib/use-admin";
import { usePortfolioContent, useProjects, type DbProject } from "@/lib/use-portfolio";
import {
  DEFAULTS,
  type HeroContent,
  type AboutContent,
  type ContactContent,
  type SectionHints,
  type SkillGroup,
  type JourneyItem,
  type StoryItem,
  ICON_OPTIONS,
} from "@/lib/portfolio-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Loader2, LogOut, Plus, Save, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin dashboard" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { loading, session, isAdmin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/auth" });
  }, [loading, session, navigate]);

  if (loading)
    return (
      <Centered>
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </Centered>
    );
  if (!session) return null;
  if (!isAdmin)
    return (
      <Centered>
        <div className="text-center">
          <p className="font-display text-2xl">Not an admin</p>
          <p className="mt-2 text-sm text-muted-foreground">
            This account doesn't have admin access.
          </p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="mt-6 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
          >
            Sign out
          </button>
        </div>
      </Centered>
    );

  return <AdminShell email={session.user.email ?? ""} />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen items-center justify-center px-6">{children}</div>;
}

function AdminShell({ email }: { email: string }) {
  const navigate = useNavigate();
  const qc = useQueryClient();

  async function signOut() {
    await supabase.auth.signOut();
    qc.clear();
    navigate({ to: "/auth" });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Portfolio
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <p className="font-display text-base">Admin</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground/80 hover:bg-accent sm:inline-flex"
            >
              View site <ExternalLink className="h-3 w-3" />
            </Link>
            <p className="hidden text-xs text-muted-foreground sm:block">{email}</p>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-3 py-1.5 text-xs text-foreground hover:bg-foreground/10"
            >
              <LogOut className="h-3 w-3" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-start gap-1 rounded-xl bg-muted p-1">
            {[
              { v: "projects", l: "Projects" },
              { v: "hero", l: "Hero" },
              { v: "about", l: "About" },
              { v: "skills", l: "Skills" },
              { v: "journey", l: "Experience" },
              { v: "stories", l: "Stories" },
              { v: "contact", l: "Contact" },
              { v: "hints", l: "Pluto hints" },
            ].map((t) => (
              <TabsTrigger key={t.v} value={t.v}>
                {t.l}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="projects"><ProjectsAdmin /></TabsContent>
          <TabsContent value="hero"><HeroAdmin /></TabsContent>
          <TabsContent value="about"><AboutAdmin /></TabsContent>
          <TabsContent value="skills"><JsonSectionAdmin sectionKey="skills" label="Skills" defaultValue={DEFAULTS.skills} /></TabsContent>
          <TabsContent value="journey"><JsonSectionAdmin sectionKey="journey" label="Experience timeline" defaultValue={DEFAULTS.journey} /></TabsContent>
          <TabsContent value="stories"><JsonSectionAdmin sectionKey="stories" label="Stories / Exploring" defaultValue={DEFAULTS.stories} /></TabsContent>
          <TabsContent value="contact"><ContactAdmin /></TabsContent>
          <TabsContent value="hints"><HintsAdmin /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// ──────────────── content helpers ────────────────

async function saveSection(key: string, value: unknown) {
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value: value as never }, { onConflict: "key" });
  if (error) throw error;
}

function useContentForKey<K extends keyof typeof DEFAULTS>(key: K) {
  const { data, isLoading } = usePortfolioContent();
  const value = (data?.[key] ?? DEFAULTS[key]) as (typeof DEFAULTS)[K];
  return { value, isLoading };
}

function SaveBar({ onSave, busy, onReset }: { onSave: () => void; busy: boolean; onReset?: () => void }) {
  return (
    <div className="mt-6 flex items-center justify-end gap-3">
      {onReset && (
        <Button variant="ghost" size="sm" onClick={onReset} disabled={busy}>
          Reset to default
        </Button>
      )}
      <Button onClick={onSave} disabled={busy} className="gap-2">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Save changes
      </Button>
    </div>
  );
}

// ──────────────── Hero ────────────────

function HeroAdmin() {
  const qc = useQueryClient();
  const { value, isLoading } = useContentForKey("hero");
  const [draft, setDraft] = useState<HeroContent>(value);
  const [busy, setBusy] = useState(false);
  useEffect(() => setDraft(value), [value]);

  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;

  function set<K extends keyof HeroContent>(k: K, v: HeroContent[K]) {
    setDraft({ ...draft, [k]: v });
  }

  async function save() {
    setBusy(true);
    try {
      await saveSection("hero", draft);
      toast.success("Hero updated");
      qc.invalidateQueries({ queryKey: ["site_content"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero section</CardTitle>
        <CardDescription>Headline, intro, hero image, "currently exploring" list.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Field label="Eyebrow"><Input value={draft.eyebrow} onChange={(e) => set("eyebrow", e.target.value)} /></Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Headline prefix"><Input value={draft.headlinePrefix} onChange={(e) => set("headlinePrefix", e.target.value)} /></Field>
          <Field label="Headline suffix"><Input value={draft.headlineSuffix} onChange={(e) => set("headlineSuffix", e.target.value)} /></Field>
        </div>
        <Field label="Italic words (exactly 3)">
          <div className="grid gap-2 sm:grid-cols-3">
            {draft.italicWords.map((w, i) => (
              <Input
                key={i}
                value={w}
                onChange={(e) => {
                  const next = [...draft.italicWords] as [string, string, string];
                  next[i] = e.target.value;
                  set("italicWords", next);
                }}
              />
            ))}
          </div>
        </Field>
        <Field label="Subhead"><Textarea rows={2} value={draft.subhead} onChange={(e) => set("subhead", e.target.value)} /></Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Primary CTA label"><Input value={draft.primaryCta.label} onChange={(e) => set("primaryCta", { ...draft.primaryCta, label: e.target.value })} /></Field>
          <Field label="Primary CTA link"><Input value={draft.primaryCta.href} onChange={(e) => set("primaryCta", { ...draft.primaryCta, href: e.target.value })} /></Field>
          <Field label="Secondary CTA label"><Input value={draft.secondaryCta.label} onChange={(e) => set("secondaryCta", { ...draft.secondaryCta, label: e.target.value })} /></Field>
          <Field label="Secondary CTA link"><Input value={draft.secondaryCta.href} onChange={(e) => set("secondaryCta", { ...draft.secondaryCta, href: e.target.value })} /></Field>
        </div>

        <Field label="Currently exploring (one per line)">
          <Textarea
            rows={4}
            value={draft.exploring.join("\n")}
            onChange={(e) => set("exploring", e.target.value.split("\n").filter(Boolean))}
          />
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Pluto bubble title"><Input value={draft.plutoIntroTitle} onChange={(e) => set("plutoIntroTitle", e.target.value)} /></Field>
          <Field label="Pluto bubble subtitle"><Input value={draft.plutoIntroSub} onChange={(e) => set("plutoIntroSub", e.target.value)} /></Field>
        </div>

        <Field label="Hero image">
          <ImagePicker
            value={draft.imageUrl}
            onChange={(url) => set("imageUrl", url)}
            placeholder="Leave empty to use the default illustration"
            pathPrefix="hero"
          />
        </Field>

        <SaveBar
          onSave={save}
          busy={busy}
          onReset={() => setDraft(DEFAULTS.hero)}
        />
      </CardContent>
    </Card>
  );
}

// ──────────────── About ────────────────

function AboutAdmin() {
  const qc = useQueryClient();
  const { value, isLoading } = useContentForKey("about");
  const [draft, setDraft] = useState<AboutContent>(value);
  const [busy, setBusy] = useState(false);
  useEffect(() => setDraft(value), [value]);
  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;

  async function save() {
    setBusy(true);
    try {
      await saveSection("about", draft);
      toast.success("About updated");
      qc.invalidateQueries({ queryKey: ["site_content"] });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Save failed"); }
    finally { setBusy(false); }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>About section</CardTitle>
        <CardDescription>Story paragraphs, mini cards, stats and quote.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Heading"><Input value={draft.heading} onChange={(e) => setDraft({ ...draft, heading: e.target.value })} /></Field>
          <Field label="Italic word"><Input value={draft.italicWord} onChange={(e) => setDraft({ ...draft, italicWord: e.target.value })} /></Field>
        </div>
        <Field label="Story paragraphs (blank line between paragraphs)">
          <Textarea rows={6} value={draft.paragraphs.join("\n\n")} onChange={(e) => setDraft({ ...draft, paragraphs: e.target.value.split(/\n{2,}/).filter(Boolean) })} />
        </Field>

        <JsonField
          label="Cards"
          hint='[{ "icon": "GraduationCap", "title": "...", "sub": "..." }]'
          value={draft.cards}
          onChange={(v) => setDraft({ ...draft, cards: v })}
        />
        <JsonField
          label="Stats"
          hint='[{ "n": "10+", "l": "Projects Completed" }]'
          value={draft.stats}
          onChange={(v) => setDraft({ ...draft, stats: v })}
        />
        <Field label="Quote (use line breaks)"><Textarea rows={3} value={draft.quote} onChange={(e) => setDraft({ ...draft, quote: e.target.value })} /></Field>
        <Field label="Quote author"><Input value={draft.quoteAuthor} onChange={(e) => setDraft({ ...draft, quoteAuthor: e.target.value })} /></Field>

        <SaveBar onSave={save} busy={busy} onReset={() => setDraft(DEFAULTS.about)} />
      </CardContent>
    </Card>
  );
}

// ──────────────── Contact ────────────────

function ContactAdmin() {
  const qc = useQueryClient();
  const { value, isLoading } = useContentForKey("contact");
  const [draft, setDraft] = useState<ContactContent>(value);
  const [busy, setBusy] = useState(false);
  useEffect(() => setDraft(value), [value]);
  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;
  function set<K extends keyof ContactContent>(k: K, v: ContactContent[K]) { setDraft({ ...draft, [k]: v }); }

  async function save() {
    setBusy(true);
    try { await saveSection("contact", draft); toast.success("Contact updated"); qc.invalidateQueries({ queryKey: ["site_content"] }); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Save failed"); }
    finally { setBusy(false); }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact &amp; footer</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Eyebrow"><Input value={draft.eyebrow} onChange={(e) => set("eyebrow", e.target.value)} /></Field>
          <Field label="Italic word"><Input value={draft.italicWord} onChange={(e) => set("italicWord", e.target.value)} /></Field>
          <Field label="Heading"><Input value={draft.heading} onChange={(e) => set("heading", e.target.value)} /></Field>
          <Field label="Subhead"><Input value={draft.sub} onChange={(e) => set("sub", e.target.value)} /></Field>
          <Field label="Email"><Input value={draft.email} onChange={(e) => set("email", e.target.value)} /></Field>
          <Field label="GitHub URL"><Input value={draft.github} onChange={(e) => set("github", e.target.value)} /></Field>
          <Field label="LinkedIn URL"><Input value={draft.linkedin} onChange={(e) => set("linkedin", e.target.value)} /></Field>
        </div>
        <Field label="Footer note"><Input value={draft.footer} onChange={(e) => set("footer", e.target.value)} /></Field>
        <Field label="Copyright"><Input value={draft.copyright} onChange={(e) => set("copyright", e.target.value)} /></Field>
        <SaveBar onSave={save} busy={busy} onReset={() => setDraft(DEFAULTS.contact)} />
      </CardContent>
    </Card>
  );
}

// ──────────────── Hints ────────────────

function HintsAdmin() {
  const qc = useQueryClient();
  const { value, isLoading } = useContentForKey("hints");
  const [draft, setDraft] = useState<SectionHints>(value);
  const [busy, setBusy] = useState(false);
  useEffect(() => setDraft(value), [value]);
  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;

  async function save() {
    setBusy(true);
    try { await saveSection("hints", draft); toast.success("Hints updated"); qc.invalidateQueries({ queryKey: ["site_content"] }); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Save failed"); }
    finally { setBusy(false); }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pluto's scroll hints</CardTitle>
        <CardDescription>One short message per section.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {(Object.keys(DEFAULTS.hints) as (keyof SectionHints)[]).map((k) => (
          <Field key={k} label={k}>
            <Input value={draft[k]} onChange={(e) => setDraft({ ...draft, [k]: e.target.value })} />
          </Field>
        ))}
        <SaveBar onSave={save} busy={busy} onReset={() => setDraft(DEFAULTS.hints)} />
      </CardContent>
    </Card>
  );
}

// ──────────────── Generic JSON section (skills / journey / stories) ────────────────

function JsonSectionAdmin<T>({
  sectionKey,
  label,
  defaultValue,
}: {
  sectionKey: "skills" | "journey" | "stories";
  label: string;
  defaultValue: T;
}) {
  const qc = useQueryClient();
  const { value, isLoading } = useContentForKey(sectionKey);
  const [text, setText] = useState(JSON.stringify(value, null, 2));
  const [busy, setBusy] = useState(false);
  useEffect(() => setText(JSON.stringify(value, null, 2)), [value]);

  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;

  async function save() {
    let parsed: unknown;
    try { parsed = JSON.parse(text); }
    catch { toast.error("Invalid JSON"); return; }
    setBusy(true);
    try {
      await saveSection(sectionKey, parsed);
      toast.success(`${label} updated`);
      qc.invalidateQueries({ queryKey: ["site_content"] });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Save failed"); }
    finally { setBusy(false); }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        <CardDescription>
          Edit as a JSON list. Icon names available:{" "}
          <code className="text-[10px]">{ICON_OPTIONS.join(", ")}</code>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={20}
          className="font-mono text-xs"
        />
        <SaveBar onSave={save} busy={busy} onReset={() => setText(JSON.stringify(defaultValue, null, 2))} />
      </CardContent>
    </Card>
  );
}

// ──────────────── Projects ────────────────

function emptyProject(): DbProject {
  return {
    id: "",
    slug: "",
    title: "",
    description: "",
    image: "",
    tags: [],
    category: "web",
    year: "",
    role: "",
    timeline: "",
    overview: "",
    problem: "",
    solution: "",
    highlights: [],
    stack: [],
    links: [],
    sort_order: 0,
    is_published: true,
  };
}

function ProjectsAdmin() {
  const { data: projects, isLoading } = useProjects();
  const [editing, setEditing] = useState<DbProject | null>(null);

  if (isLoading) return <Loader2 className="h-5 w-5 animate-spin" />;

  if (editing) {
    return <ProjectForm project={editing} onClose={() => setEditing(null)} />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Add, edit and order portfolio projects.</CardDescription>
        </div>
        <Button onClick={() => setEditing(emptyProject())} className="gap-2">
          <Plus className="h-4 w-4" /> New project
        </Button>
      </CardHeader>
      <CardContent>
        {!projects || projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-10 text-center">
            <p className="font-display text-lg">No projects yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Add your first project to populate the work section.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {projects.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    {p.image && <img src={p.image} alt="" className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-display text-base">{p.title || <em>Untitled</em>}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      /{p.slug} · {p.category} · {p.is_published ? "published" : "draft"} · order {p.sort_order}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setEditing(p)}>Edit</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function ProjectForm({ project, onClose }: { project: DbProject; onClose: () => void }) {
  const qc = useQueryClient();
  const [d, setD] = useState<DbProject>(project);
  const [busy, setBusy] = useState(false);
  const isNew = !d.id;

  function set<K extends keyof DbProject>(k: K, v: DbProject[K]) { setD({ ...d, [k]: v }); }

  async function save() {
    if (!d.slug || !d.title) { toast.error("Slug and title are required"); return; }
    setBusy(true);
    try {
      if (isNew) {
        const { id: _ignored, ...payload } = d;
        void _ignored;
        const { error } = await supabase.from("projects").insert(payload as never);
        if (error) throw error;
        toast.success("Project created");
      } else {
        const { id, ...payload } = d;
        const { error } = await supabase.from("projects").update(payload as never).eq("id", id);
        if (error) throw error;
        toast.success("Project saved");
      }
      qc.invalidateQueries({ queryKey: ["projects"] });
      onClose();
    } catch (e) { toast.error(e instanceof Error ? e.message : "Save failed"); }
    finally { setBusy(false); }
  }

  async function remove() {
    if (!confirm("Delete this project?")) return;
    setBusy(true);
    try {
      const { error } = await supabase.from("projects").delete().eq("id", d.id);
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Deleted");
      onClose();
    } catch (e) { toast.error(e instanceof Error ? e.message : "Delete failed"); }
    finally { setBusy(false); }
  }

  return (
    <Card>
      <CardHeader>
        <button onClick={onClose} className="mb-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> Back to projects
        </button>
        <CardTitle>{isNew ? "New project" : `Edit "${project.title || project.slug}"`}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title*"><Input value={d.title} onChange={(e) => set("title", e.target.value)} /></Field>
          <Field label="Slug* (url-friendly, unique)"><Input value={d.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-"))} /></Field>
          <Field label="Short description (card)"><Input value={d.description} onChange={(e) => set("description", e.target.value)} /></Field>
          <Field label="Category">
            <select value={d.category} onChange={(e) => set("category", e.target.value)} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm">
              <option value="web">Web Apps</option>
              <option value="data">Data Projects</option>
              <option value="tools">Tools</option>
            </select>
          </Field>
          <Field label="Year"><Input value={d.year} onChange={(e) => set("year", e.target.value)} /></Field>
          <Field label="Role"><Input value={d.role} onChange={(e) => set("role", e.target.value)} /></Field>
          <Field label="Timeline"><Input value={d.timeline} onChange={(e) => set("timeline", e.target.value)} /></Field>
          <Field label="Sort order (lower = first)">
            <Input type="number" value={d.sort_order} onChange={(e) => set("sort_order", Number(e.target.value) || 0)} />
          </Field>
        </div>

        <Field label="Cover image">
          <ImagePicker value={d.image} onChange={(url) => set("image", url)} pathPrefix={`projects/${d.slug || "untitled"}`} />
        </Field>

        <Field label="Tags (comma separated)">
          <Input value={d.tags.join(", ")} onChange={(e) => set("tags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
        </Field>
        <Field label="Tech stack (comma separated)">
          <Input value={d.stack.join(", ")} onChange={(e) => set("stack", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
        </Field>

        <Field label="Overview"><Textarea rows={3} value={d.overview} onChange={(e) => set("overview", e.target.value)} /></Field>
        <Field label="Problem"><Textarea rows={3} value={d.problem} onChange={(e) => set("problem", e.target.value)} /></Field>
        <Field label="Solution / approach"><Textarea rows={3} value={d.solution} onChange={(e) => set("solution", e.target.value)} /></Field>

        <Field label="Highlights (one per line)">
          <Textarea rows={4} value={d.highlights.join("\n")} onChange={(e) => set("highlights", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))} />
        </Field>

        <JsonField
          label="External links"
          hint='[{ "label": "Live site", "href": "https://..." }]'
          value={d.links}
          onChange={(v) => set("links", v)}
        />

        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={d.is_published} onChange={(e) => set("is_published", e.target.checked)} />
          Published (visible to visitors)
        </label>

        <div className="mt-4 flex items-center justify-between">
          {!isNew ? (
            <Button variant="ghost" className="gap-2 text-destructive hover:text-destructive" onClick={remove} disabled={busy}>
              <Trash2 className="h-4 w-4" /> Delete project
            </Button>
          ) : <span />}
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onClose} disabled={busy}>Cancel</Button>
            <Button onClick={save} disabled={busy} className="gap-2">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save project
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ──────────────── Image picker (URL or upload) ────────────────

function ImagePicker({
  value,
  onChange,
  placeholder,
  pathPrefix,
}: {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  pathPrefix: string;
}) {
  const [busy, setBusy] = useState(false);

  async function upload(file: File) {
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${pathPrefix}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from("portfolio-images")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (error) throw error;
      // bucket is private — use a long-lived signed URL
      const { data: signed, error: sErr } = await supabase.storage
        .from("portfolio-images")
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      if (sErr) throw sErr;
      onChange(signed.signedUrl);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "https://… or upload below"}
      />
      <div className="flex items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-accent">
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          {busy ? "Uploading…" : "Upload image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
        </label>
        {value && (
          <div className="h-10 w-16 overflow-hidden rounded-md border border-border bg-muted">
            <img src={value} alt="" className="h-full w-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────── tiny field helpers ────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function JsonField<T>({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: T;
  onChange: (v: T) => void;
}) {
  const [text, setText] = useState(JSON.stringify(value, null, 2));
  const [err, setErr] = useState<string | null>(null);
  useMemo(() => setText(JSON.stringify(value, null, 2)), [value]);
  return (
    <Field label={label}>
      <Textarea
        rows={6}
        value={text}
        className="font-mono text-xs"
        onChange={(e) => {
          setText(e.target.value);
          try {
            const parsed = JSON.parse(e.target.value);
            setErr(null);
            onChange(parsed);
          } catch (err2) {
            setErr((err2 as Error).message);
          }
        }}
      />
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      {err && <p className="text-[11px] text-destructive">Invalid JSON: {err}</p>}
    </Field>
  );
}

// Re-export so TS doesn't trim
export type _Unused = SkillGroup | JourneyItem | StoryItem;
