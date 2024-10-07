import { z, defineCollection, reference } from "astro:content";

export type Podcast = z.infer<ReturnType<typeof zPodcast>>;
const zPodcast = () =>
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
    // The "notes" field is an array of objects, where each object represents a topic
    // discussed in the podcast and the time (in minutes and seconds) when it was mentioned.
    // Example :  //   [{ time: "01:10", subject: "What is Fork It?" }],
    notes: z
      .array(
        z.object({
          time: z.string(),
          subject: z.string(),
        }),
      )
      .optional(),
  });

export const podcastsCollection = defineCollection({
  type: "content",
  schema: zPodcast(),
});
