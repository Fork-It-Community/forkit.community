import { reference, z, type SchemaContext } from "astro:content";

export const zPodcast = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    cover: image(),
    rssFeed: z.string().url().optional(),
    language: z.enum(["french", "english"]),
    keywords: z.array(z.string()).optional(),
    urls: z
      .array(
        z.object({
          platform: z.enum([
            "spotify",
            "apple-podcast",
            "podcast-index",
            "deezer",
          ]),
          url: z.string().url(),
        }),
      )
      .optional(),
  });

export const zEpisode = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string().optional(),
    releaseDate: z.date(),
    duration: z.number().describe("Duration in seconds"),
    urls: z
      .array(
        z.object({
          platform: z.enum([
            "spotify",
            "apple-podcast",
            "podcast-index",
            "deezer",
          ]),
          url: z.string().url(),
        }),
      )
      .optional(),
    cover: image(),
    tags: z.array(z.string()).optional(),
    hosts: z.array(reference("people")),
    guests: z.array(reference("people")).optional(),
    language: z.enum(["french", "english"]),
  });
