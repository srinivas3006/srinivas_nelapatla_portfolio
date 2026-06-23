import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  DEFAULTS,
  type PortfolioContent,
} from "./portfolio-content";

export type DbProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  year: string;
  role: string;
  timeline: string;
  overview: string;
  problem: string;
  solution: string;
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
  sort_order: number;
  is_published: boolean;
};

export function usePortfolioContent() {
  return useQuery({
    queryKey: ["site_content"],
    queryFn: async (): Promise<PortfolioContent> => {
      const { data, error } = await supabase.from("site_content").select("key,value");
      if (error) throw error;
      const merged: PortfolioContent = JSON.parse(JSON.stringify(DEFAULTS));
      for (const row of data ?? []) {
        const key = row.key as keyof PortfolioContent;
        if (key in merged && row.value) {
          // shallow replace per top-level key
          (merged as Record<string, unknown>)[key] = row.value;
        }
      }
      return merged;
    },
    staleTime: 60_000,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<DbProject[]> => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as DbProject[];
    },
    staleTime: 60_000,
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ["projects", slug],
    queryFn: async (): Promise<DbProject | null> => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as DbProject) ?? null;
    },
    staleTime: 60_000,
  });
}
