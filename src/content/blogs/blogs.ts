import { z, defineCollection } from "astro:content";

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
    author: z.object({
      name: z.string(),
      Linkedin: z.string().optional(),
      image: z.string().optional(),
    }),
    date: z.date(),
    tags: z.array(z.string()).optional(),
  });

export const blogsCollection = defineCollection({
  type: "content",
  schema: zBlog(),
});
