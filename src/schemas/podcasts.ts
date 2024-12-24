import { reference, z } from "astro:content";

export const zPodcast = () =>
  z.object({
    title: z.string(),
    description: z.string().optional(),
    releaseDate: z.date(),
    duration: z.number(),
    urls: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url(),
        }),
      )
      .optional(),
    featuredImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    hosts: z.array(reference("people")),
    guests: z.array(reference("people")).optional(),
    language: z.enum(["french", "english"]),
  });
