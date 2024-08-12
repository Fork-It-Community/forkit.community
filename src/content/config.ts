import { defineCollection, z } from "astro:content";

const zSocialTypes = () => z.enum(["x", "linkedin", "instagram", "github"]);

export type Organizer = z.infer<ReturnType<typeof zOrganizer>>;
const zOrganizer = () =>
  z.object({
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
  });

const organizersCollection = defineCollection({
  type: "content",
  schema: zOrganizer(),
});

export type Partner = z.infer<ReturnType<typeof zPartner>>;
const zPartner = () =>
  z.object({
    name: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    href: z.string().url().optional(),
  });

const partnersCollection = defineCollection({
  type: "content",
  schema: zPartner(),
});

export type Sponsor = z.infer<ReturnType<typeof zSponsor>>;
const zSponsor = () =>
  z.object({
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
  });

const sponsorsCollection = defineCollection({
  type: "content",
  schema: zSponsor(),
});

export type Event = z.infer<ReturnType<typeof zEvent>>;
const zEvent = () =>
  z.object({
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
    content: z
      .object({
        afterMovie: z
          .object({
            href: z.string().url(),
          })
          .optional(),
      })
      .optional(),
  });

const eventsCollection = defineCollection({
  type: "content",
  schema: zEvent(),
});

export type Speaker = z.infer<ReturnType<typeof zSpeaker>>;
const zSpeaker = () =>
  z.object({
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
  });

const speakersCollection = defineCollection({
  type: "content",
  schema: zSpeaker(),
});

export type Talk = z.infer<ReturnType<typeof zTalk>>;
const zTalk = () =>
  z.object({
    title: z.string(),
    speakers: z.string().array(),
    language: z.enum(["french", "english"]),
    feedback: z
      .object({
        link: z.string().url(),
      })
      .optional(),
    hosts: z.string().array().optional(),
  });

const talksCollection = defineCollection({
  type: "content",
  schema: zTalk(),
});
export const collections = {
  organizers: organizersCollection,
  partners: partnersCollection,
  sponsors: sponsorsCollection,
  events: eventsCollection,
  speaker: speakersCollection,
  talk: talksCollection,
};
