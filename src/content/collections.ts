import { defineCollection } from "typed-mdx";
import { z } from "zod";

const zSocialTypes = () => z.enum(["x", "linkedin", "instagram", "github"]);

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
            type: zSocialTypes(),
            href: z.string().url(),
          }),
        )
        .optional(),
    }),
  }),
  partner: defineCollection({
    folder: "partner",
    schema: z.object({
      name: z.string(),
      image: z.object({
        src: z.string(),
        alt: z.string(),
      }),
      href: z.string().url().optional(),
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
            type: zSocialTypes(),
            href: z.string().url(),
          }),
        )
        .optional(),
    }),
  }),
  event: defineCollection({
    folder: "event",
    schema: z.object({
      title: z.string(),
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
      tickets: z
        .object({
          href: z.string().url(),
          offers: z.array(
            z.object({
              name: z.string(),
              price: z.number().positive(),
              priceCurrency: z.string(),
            }),
          ),
        })
        .optional(),
      prospectus: z
        .object({
          href: z.string().url(),
          endDate: z.date().optional(),
          title: z.string().optional(),
        })
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
      speakers: z.array(z.string()).optional(),
      talks: z.array(z.string()).optional(),
      faq: z
        .array(z.object({ question: z.string(), answer: z.string() }))
        .optional(),
    }),
  }),
  speaker: defineCollection({
    folder: "speaker",
    schema: z.object({
      name: z.string(),
      imageUrl: z.string().optional(),
      job: z.string().optional(),
      company: z
        .object({
          title: z.string(),
          href: z.string().url().optional(),
        })
        .optional(),
      companyHref: z.string().url().optional(),
      socials: z
        .array(
          z.object({
            type: zSocialTypes(),
            href: z.string().url(),
          }),
        )
        .optional(),
    }),
  }),
  talk: defineCollection({
    folder: "talk",
    schema: z.object({
      kind: z.string(),
      title: z.string(),
      description: z.string().nullish(),
      speakers: z.string().array(),
    }),
  }),
} as const;

export default collections;

export type Event = z.infer<typeof collections.event.schema>;
export type Sponsor = z.infer<typeof collections.sponsor.schema>;
export type Partner = z.infer<typeof collections.partner.schema>;
export type Speaker = z.infer<typeof collections.speaker.schema>;
export type Talk = z.infer<typeof collections.talk.schema>;
