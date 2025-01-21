import { z, reference, type SchemaContext } from "astro:content";

const zNewsType = z.enum(["long", "short"]);

export type News = z.infer<ReturnType<typeof zNews>>;
export const zNews = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    // Preview text
    description: z.string().optional(),
    featuredImage: image().optional(),
    authors: z.array(reference("people")),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    state: z.enum(["draft", "published"]).default("draft"),
    type: zNewsType,
    c2a: z.string().optional(),
  });
