import { z } from "zod";

const headingSchema = z.object({
  depth: z.number(),
  value: z.string(),
});

export type Heading = z.infer<typeof headingSchema>;

export const postMetaSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  headings: z.array(headingSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PostMeta = z.infer<typeof postMetaSchema>;

export type Post = PostMeta & { markdown: string; rawText: string };

export interface PostRepository {
  retrive: (uuid: string) => Post;
  list: (tag?: string[], category?: string) => Post[];
  all: () => Post[];
  recommends: (post: Post) => Post[];
  search: (words: string) => Post[];
}
