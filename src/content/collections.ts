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
              availability: z.enum(["InStock", "SoldOut", "PreOrder"]),
              validFrom: z.date(),
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
      status: z.enum([
        "EventCancelled",
        "EventMovedOnline",
        "EventPostponed",
        "EventRescheduled",
        "EventScheduled",
      ]),
      attendanceMode: z.enum([
        "OfflineEventAttendanceMode",
        "OnlineEventAttendanceMode",
        "MixedEventAttendanceMode",
      ]),
      schedule: z.array(
        z.object({
          type: z.enum(["conference", "roundtable", "break", "lunch"]),
          sponsorSlug: z.string().optional(),
          description: z.string().optional(),
          name: z.string().optional(),
          slug: z.string().optional(),
          startTime: z.date().optional(),
          duration: z.number().optional(),
          location: z.string(),
        }),
      ),
      feedback: z
        .object({
          link: z.string().url(),
        })
        .optional(),
      postEventPictures: z.array(z.string()).optional(),
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
      title: z.string(),
      speakers: z.string().array(),
      language: z.enum(["french", "english"]),
      feedback: z
        .object({
          link: z.string().url(),
        })
        .optional(),
      hosts: z.string().array().optional(),
    }),
  }),
} as const;

export default collections;

export type EventFrontmatter = z.infer<typeof collections.event.schema>;
export type Sponsor = z.infer<typeof collections.sponsor.schema>;
export type Partner = z.infer<typeof collections.partner.schema>;
export type Speaker = z.infer<typeof collections.speaker.schema>;
export type TalkFrontmatter = z.infer<typeof collections.talk.schema>;

export type Event = Awaited<ReturnType<typeof collections.event.getBySlug>>;
export type Talk = Awaited<ReturnType<typeof collections.talk.getBySlug>>;
