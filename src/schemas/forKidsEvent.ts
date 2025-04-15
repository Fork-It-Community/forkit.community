import { reference, z, type SchemaContext } from "astro:content";
import { zAgeRange } from "./utils";

export const zForKidsEvent = ({ image }: SchemaContext) =>
  z.object({
    startTime: z.date(),
    endTime: z.date().optional(),
    status: z.enum([
      "draft",
      "published-without-date",
      "published",
      "cancelled",
    ]),
    location: z
      .object({
        name: z.string().optional(),
        address: z.string(),
        image: image().optional(),
      })
      .optional(),
    excerpt: z.string().optional(),
    image: z.object({
      media: image(),
      alt: z.string(),
      credit: z.string().optional(),
    }),
    workshops: z.array(reference("forKidsWorkshop")),
    ageRange: zAgeRange,
    organizers: z
      .array(reference("people"))
      .optional()
      .describe("Collection of people that organize the event"),
    volunteers: z
      .array(reference("people"))
      .optional()
      .describe("Collection of people that volunteer during the event"),
    coOrganizers: z.array(reference("partners")).optional(),
    partners: z.array(reference("partners")).optional(),
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional()
      .describe("Frequently Asked Questions for the event"),
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
  });
