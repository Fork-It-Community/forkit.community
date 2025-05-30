import { type SchemaContext, reference, z } from "astro:content";

export type News = z.infer<ReturnType<typeof zNews>>;
export const zNews = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    featuredImage: image().optional(),
    authors: z.array(reference("people")).optional(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    state: z.enum(["draft", "published"]).default("draft"),
  });
