import { z, reference, type SchemaContext } from "astro:content";

const zNewsType = z.enum(["long", "short"]);

export type News = z.infer<ReturnType<typeof zNews>>;
export const zNews = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    // Preview text
    excerpt: z.string().optional(),
    featuredImage: image().optional(),
    authors: z.array(reference("people")).optional(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    state: z.enum(["draft", "published"]).default("draft"),
    type: zNewsType,
    c2a: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),
  });
