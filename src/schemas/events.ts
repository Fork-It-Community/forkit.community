import { zMediaImage } from "@/schemas/utils";
import { z, reference, type SchemaContext } from "astro:content";

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
    image: zMediaImage({ image }),
    status: z.enum([
      "draft",
      "published-without-date",
      "published",
      "cancelled",
    ]),
    coOrganizers: z.array(reference("partners")).optional(),
    partners: z.array(reference("partners")).optional(),
    organizers: z
      .array(reference("people"))
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
  });

const zEventBase = ({ image }: SchemaContext) =>
  zEventBasicInfo({ image }).merge(
    z.object({
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
          href: z.string().url(),
          endDate: z.date().optional(),
        })
        .optional(),
      tickets: z
        .object({
          link: z.union([
            z.string().url(),
            z.array(
              z.object({
                title: z.string(),
                description: z.string().optional(),
                href: z.string().url().optional(),
              }),
            ),
          ]),
          endDate: z.date().optional(),
          offers: z
            .array(
              z.object({
                name: z.string(),
                price: z.number().positive(),
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
          href: z.string().url(),
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
      speakers: z
        .array(reference("people"))
        .optional()
        .describe(
          "Collection of people to be added in addition to the schedule",
        ),
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
                type: z.enum(["conference", "roundtable", "info", "lunch"]),
                sponsors: z.array(reference("partners")).optional(),
                description: z.string().optional(),
                name: z.string().optional(),
                slug: reference("talks").optional(),
                startTime: z.date().optional(),
                duration: z.number().optional().describe("Number of minutes"),
                location: z.string().optional(),
              }),
            )
            .optional(),
        })
        .optional(),
      feedback: z
        .object({
          link: z.string().url(),
        })
        .optional(),
      afterEventContent: z
        .object({
          afterMovie: z
            .object({
              href: z.string().url(),
              thumbnail: z.object({
                image: image(),
                alt: z.string(),
              }),
            })
            .optional(),
          vods: z
            .object({
              href: z.string().url().describe("The playlist of the VODs"),
            })
            .optional(),
          photos: z.object({
            href: z.string().url().optional(),
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
        })
        .optional(),
      subPages: z.array(reference("eventsSubPages")).optional(),
      sponsoringLevels: z.array(z.string()).optional(),
      updatesChannels: z
        .array(
          z.object({
            type: z.enum(["whatsapp", "newsletter"]),
            link: z.object({
              title: z.string(),
              href: z.string().url(),
            }),
          }),
        )
        .optional(),
    }),
  );

const zMeetup = () => z.object({ type: z.literal("meetup") });
const zEventClassic = () =>
  z.object({
    type: z.literal("event"),
  });

export type Event = z.infer<ReturnType<typeof zEvent>>;
export const zEvent = ({ image }: SchemaContext) =>
  z.discriminatedUnion("type", [
    zEventBase({ image }).merge(zMeetup()),
    zEventBase({ image }).merge(zEventClassic()),
  ]);
