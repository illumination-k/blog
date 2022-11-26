import { z } from "zod";

const headingsSchema = z.array(z.object({
  depth: z.number(),
  value: z.string(),
}));

export type Headings = z.infer<typeof headingsSchema>;

export const postMetaSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PostMeta = z.infer<typeof postMetaSchema>;

export type Post = PostMeta & Headings & { markdown: string; rawText: string };

export interface PostRepository {
  retrive: (uuid: string) => Post;
  list: (tag?: string[], category?: string) => Post[];
  all: () => Post[];
  recommends: (post: Post) => Post[];
  search: (words: string) => Post[];
}
