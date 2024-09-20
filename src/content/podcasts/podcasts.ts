import { z, defineCollection, reference } from "astro:content";

export type Podcast = z.infer<ReturnType<typeof zPodcast>>;
const zPodcast = () =>
  z.object({
    title: z.string(),
    description: z.string().optional(),
    episodeNumber: z.number(),
    releaseDate: z.date(),
    duration: z.number(),
    podcastUrls: z
      .array(
        z.object({
          platform: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
    featuredImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    hosts: z.array(reference("people")),
    guests: z.array(reference("people")).optional(),
    language: z.enum(["french", "english"]),
    notes: z
      .array(
        z.object({
          minute: z.string(),
          subject: z.string(),
        }),
      )
      .optional(),
  });

export const podcastsCollection = defineCollection({
  type: "content",
  schema: zPodcast(),
});
