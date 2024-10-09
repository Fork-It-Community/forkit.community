import { z, defineCollection, reference } from "astro:content";

export type Blog = z.infer<ReturnType<typeof zBlog>>;
const zBlog = () =>
  z.object({
    title: z.string(),
    // Preview text
    description: z.string().optional(),
    featuredImage: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    authors: z.array(reference("people")),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    state: z.enum(["draft", "published"]).default("draft"),
  });

export const blogsCollection = defineCollection({
  type: "content",
  schema: zBlog(),
});
