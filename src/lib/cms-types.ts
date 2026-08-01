import type { Project } from "@/data/projects";

export type CmsMedia = {
  id: string;
  kind: string;
  url: string;
  caption: string;
  sortOrder: number;
};

export type CmsProject = Project & {
  id: string;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  tags: string[];
  media: CmsMedia[];
  updatedAt: string;
};

export type ProjectInput = {
  id?: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  categories: string[];
  year: string;
  client: string;
  duration: string;
  role: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  workflow: { step: string; detail: string }[];
  tools: string[];
  features: string[];
  outcome: { metric: string; label: string }[];
  tags: string[];
  featured: boolean;
  published: boolean;
};
