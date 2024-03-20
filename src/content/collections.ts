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
          }),
        )
        .optional(),
    }),
  }),
  sponsor: defineCollection({
    folder: "sponsor",
    schema: z.object({
      name: z.string(),
      image: z.object({
        src: z.string(),
        alt: z.string(),
      }),
      href: z.string().url().optional(),
      socials: z
        .array(
          z.object({
            type: z.enum(["x", "linkedin", "instagram"]),
            href: z.string().url(),
          }),
        )
        .optional(),
    }),
  }),
  event: defineCollection({
    folder: "event",
    schema: z.object({
      name: z.string(),
      date: z.date().optional(),
      location: z
        .object({
          name: z.string().optional(),
          address: z.string(),
        })
        .optional(),
      excerpt: z.string().optional(),
      image: z
        .object({
          src: z.string(),
          alt: z.string(),
        })
        .optional(),
      cfp: z
        .object({
          href: z.string().url(),
          endDate: z.date().optional(),
        })
        .optional(),
      tickets: z.object({ href: z.string().url() }).optional(),
      prospectus: z
        .object({ href: z.string().url(), title: z.string().optional() })
        .optional(),
      published: z.boolean().optional(),
      sponsoringLevels: z.array(z.string()),
      sponsors: z
        .array(
          z.object({
            slug: z.string(), // <- the slug of the sponsor
            level: z.string(), // <- the level of sponsoring
            options: z.array(z.enum(["lunch"])).optional(), // <- if the sponsor has an option
          }),
        )
        .optional(),
    }),
  }),
} as const;

export default collections;

export type Event = z.infer<typeof collections.event.schema>;
export type Sponsor = z.infer<typeof collections.sponsor.schema>;
