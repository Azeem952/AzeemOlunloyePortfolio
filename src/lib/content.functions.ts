import { createServerFn } from "@tanstack/react-start";
import type { CmsProject } from "./cms-types";

/** Public: every published project, in the order set in the dashboard. */
export const listPublicProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<CmsProject[]> => {
    const { fetchPublicProjects } = await import("./cms.server");
    return fetchPublicProjects();
  },
);

/** Public: one published project by slug (null when missing or hidden). */
export const getPublicProject = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }): Promise<CmsProject | null> => {
    const { fetchPublicProject } = await import("./cms.server");
    return fetchPublicProject(slug);
  });
