import { queryOptions } from "@tanstack/react-query";
import { listPublicProjects } from "./content.functions";
import type { CmsProject } from "./cms-types";

/**
 * Single source of truth for public portfolio data. Every page (home, work,
 * case study) shares this one cached request, so opening a case study after
 * the Work page has loaded needs no network round trip at all.
 */
export const projectsQuery = queryOptions({
  queryKey: ["public-projects"],
  queryFn: () => listPublicProjects() as Promise<CmsProject[]>,
  staleTime: 10 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  retry: 2,
});
