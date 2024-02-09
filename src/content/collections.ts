import { defineCollection } from "typed-mdx";
import { z } from "zod";

const collections = {
  organizer: defineCollection({
    folder: "organizer",
    schema: z.object({
      name: z.string(),
      imageUrl: z.string(),
      role: z.string().optional(),
      socials: z
        .array(
          z.object({
            type: z.enum(["x", "linkedin"]),
            href: z.string().url(),
          })
        )
        .optional(),
    }),
  }),
  sponsor: defineCollection({
    folder: "sponsor",
    schema: z.object({
      name: z.string(),
      image: z
        .object({
          src: z.string(),
          alt: z.string(),
        })
        .optional(),
      events: z.array(z.string()).optional(),
    }),
  }),
  event: defineCollection({
    folder: "event",
    schema: z.object({
      name: z.string(),
      date: z.date().optional(),
      location: z.string().optional(),
      excerpt: z.string().optional(),
      image: z
        .object({
          src: z.string(),
          alt: z.string(),
        })
        .optional(),
      cfp: z.object({ href: z.string().url() }).optional(),
      tickets: z.object({ href: z.string().url() }).optional(),
      prospectus: z
        .object({ href: z.string().url(), title: z.string().optional() })
        .optional(),
    }),
  }),
} as const;

export default collections;

export type Event = z.infer<typeof collections.event.schema>;
