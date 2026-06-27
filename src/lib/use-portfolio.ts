import { useQuery } from "@tanstack/react-query";
import { DEFAULTS, type PortfolioContent, type DbProject } from "./portfolio-content";
import { getSiteContent } from "./api/content.server";

export function usePortfolioContent() {
  return useQuery({
    queryKey: ["site_content"],
    queryFn: async (): Promise<PortfolioContent> => {
      try {
        const dbContent = await getSiteContent();

        // Merge db overrides into defaults
        const merged = { ...DEFAULTS } as Record<string, unknown>;
        if (dbContent && Array.isArray(dbContent)) {
          dbContent.forEach((row) => {
            if (row.key && row.value && merged[row.key] !== undefined) {
              if (Array.isArray(row.value)) {
                // If it's an array (like projects, skills, journey), completely overwrite
                merged[row.key] = row.value;
              } else if (typeof row.value === "object" && row.value !== null) {
                // If it's an object (like hero, about), merge it
                merged[row.key] = {
                  ...(merged[row.key] as Record<string, unknown>),
                  ...row.value,
                };
              } else {
                merged[row.key] = row.value;
              }
            }
          });
        }
        return merged as unknown as PortfolioContent;
      } catch (e) {
        console.error("Failed to load portfolio content from DB, using defaults", e);
        return DEFAULTS;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProjects() {
  const query = usePortfolioContent();
  return {
    ...query,
    data: query.data?.projects
      ? [...query.data.projects].sort((a, b) => a.sort_order - b.sort_order)
      : [],
  };
}

export function useProject(slug: string) {
  const query = usePortfolioContent();
  return {
    ...query,
    data: query.data?.projects?.find((p) => p.slug === slug) ?? null,
  };
}
