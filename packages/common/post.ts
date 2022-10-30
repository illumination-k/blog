import { z } from "zod";

const postMetaSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PostMeta = z.infer<typeof postMetaSchema>;

export type Post = PostMeta & { content: string };
