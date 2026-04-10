import { zMediaImage } from "@/schemas/utils";
import { z } from "astro/zod";
import { reference, type SchemaContext } from "astro:content";

export const zEventBasicInfo = ({ image }: SchemaContext) =>
  z.object({
    city: reference("cities"),
    date: z.date(),
    location: z
      .object({
        name: z.string().optional(),
        address: z.string(),
        image: image().optional(),
      })
      .optional(),
    excerpt: z.string().optional(),
    image: zMediaImage({ image }).optional(),
    status: z.enum([
      "draft",
      "published-without-date",
      "published",
      "cancelled",
    ]),
    coOrganizers: z.array(reference("partners")).optional(),
    partners: z.array(reference("partners")).optional(),
    organizers: z
      .array(
        z.object({
          person: reference("people"),
          role: z.string().optional(),
        }),
      )
      .optional()
      .describe("Collection of people that organize the event"),
    volunteers: z
      .array(reference("people"))
      .optional()
      .describe("Collection of people that volunteer during the event"),
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional()
      .describe("Frequently Asked Questions for the event"),
    lumaEventId: z.string().optional(),
    afterEventContent: z
      .object({
        afterMovie: z
          .object({
            href: z.url(),
            thumbnail: z.object({
              image: image(),
              alt: z.string(),
            }),
          })
          .optional(),
        vods: z
          .object({
            href: z.url().describe("The playlist of the VODs"),
          })
          .optional(),
        photos: z.object({
          href: z.url().optional(),
          sources: z
            .array(
              z
                .object({
                  image: image(),
                  alt: z.string().optional(),
                })
                .optional(),
            )

            .max(4)
            .optional(),
        }),
        rating: z
          .object({
            averageScore: z.number().min(1).max(5),
            count: z.number().int().positive(),
            comments: z
              .array(
                z.object({
                  author: z.string(),
                  text: z.string(),
                  score: z.number().min(1).max(5),
                }),
              )
              .optional(),
          })
          .optional(),
      })
      .optional(),
  });

const zEventBase = ({ image }: SchemaContext) =>
  z.object({
    ...zEventBasicInfo({ image }).shape,
    postponed: z
      .object({
        originalDate: z
          .date()
          .describe("The original date before it was postponed"),
        message: z
          .string()
          .optional()
          .describe(
            "A default message will be displayed if the event's status is 'published-without-date'. Use this to override the default or to show a message if the event's status is 'published'",
          ),
      })
      .optional()
      .describe(
        "Makes it possible to show that the event has been postponed. Use in combination with the 'status'.",
      ),

    cfp: z
      .object({
        href: z.url(),
        endDate: z.date().optional(),
      })
      .optional(),
    tickets: z
      .object({
        link: z.union([
          z.url(),
          z.array(
            z.object({
              title: z.string(),
              description: z.string().optional(),
              href: z.url().optional(),
            }),
          ),
        ]),
        endDate: z.date().optional(),
        offers: z
          .array(
            z.object({
              name: z.string(),
              price: z.number().nonnegative(),
              priceCurrency: z.string(),
              availability: z.enum([
                "BackOrder",
                "Discontinued",
                "InStock",
                "InStoreOnly",
                "LimitedAvailability",
                "OnlineOnly",
                "OutOfStock",
                "PreOrder",
                "PreSale",
                "SoldOut",
              ]),
              validFrom: z.date(),
            }),
          )
          .optional(),
      })
      .optional(),
    prospectus: z
      .object({
        href: z.url(),
        endDate: z.date().optional(),
        title: z.string().optional(),
      })
      .optional(),
    sponsors: z
      .array(
        z.object({
          slug: reference("partners"), // <- the slug of the sponsor
          level: z.string(), // <- the level of sponsoring
          options: z.array(z.enum(["lunch"])).optional(), // <- if the sponsor has an option
        }),
      )
      .optional(),
    eventStatus: z.enum([
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
    schedule: z
      .object({
        status: z.enum(["final", "not-final", "preview"]).default("final"),
        stats: z
          .array(z.object({ count: z.string(), name: z.string() }))
          .length(4)
          .optional(),
        items: z
          .array(
            z.object({
              // TODO Discriminated union
              type: z.enum([
                "conference",
                "roundtable",
                "info",
                "lunch",
                "keynote",
              ]),
              sponsors: z.array(reference("partners")).optional(),
              description: z.string().optional(),
              name: z.string().optional(),
              slug: reference("talks").optional(),
              period: z.enum(["opening", "afternoon"]).optional(),
              startTime: z.date().optional(),
              duration: z.number().optional().describe("Number of minutes"),
              location: z.string().optional(),
              locationUrl: z.url().optional(),
              status: z
                .enum(["cancelled", "replacement", "published"])
                .default("published"),
            }),
          )
          .optional(),
      })
      .optional(),
    feedback: z
      .object({
        link: z.url(),
      })
      .optional(),
    subPages: z.array(reference("eventsSubPages")).optional(),
    sponsoringLevels: z.array(z.string()).optional(),
    marketing: z
      .object({
        withFlags: z.boolean().optional().default(false),
        videos: z
          .array(
            z.object({
              title: z.string(),
              href: z.url(),
              thumbnail: z
                .object({
                  image: image(),
                  alt: z.string(),
                })
                .optional(),
            }),
          )
          .optional(),
      })
      .optional(),
  });

const zMeetup = () => z.object({ type: z.literal("meetup") });
const zEventClassic = () =>
  z.object({
    type: z.literal("event"),
    assets: z
      .object({
        backgroundColor: z.string(),
        color: z.string().default("#ffffff"),
      })
      .optional(),
  });

export type Event = z.infer<ReturnType<typeof zEvent>>;
export const zEvent = ({ image }: SchemaContext) =>
  z.discriminatedUnion("type", [
    zEventBase({ image }).extend(zMeetup().shape),
    zEventBase({ image }).extend(zEventClassic().shape),
  ]);
