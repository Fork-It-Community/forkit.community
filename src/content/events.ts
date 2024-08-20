import { z, defineCollection } from "astro:content";

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

export const eventsCollection = defineCollection({
  type: "content",
  schema: zEvent(),
});
