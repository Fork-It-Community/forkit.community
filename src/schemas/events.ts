import { z, reference, type SchemaContext } from "astro:content";

const zEventBase = ({ image }: SchemaContext) =>
  z.object({
    city: z.string(),
    country: z.string(),
    date: z.date(),
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
      })
      .optional(),
    excerpt: z.string().optional(),
    image: z
      .object({
        src: image(),
        alt: z.string(),
        credit: z.string().optional(),
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
        offers: z
          .array(
            z.object({
              name: z.string(),
              price: z.number().positive(),
              priceCurrency: z.string(),
              availability: z.enum(["InStock", "SoldOut", "PreOrder"]),
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
    coOrganizers: z.array(reference("partners")).optional(),
    partners: z.array(reference("partners")).optional(),
    speakers: z
      .array(reference("people"))
      .optional()
      .describe("Collection of people to be added in addition to the schedule"),
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional()
      .describe("Frequently Asked Questions for the event"),
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
      .array(
        z.object({
          // TODO Discriminated union
          type: z.enum(["conference", "roundtable", "break", "lunch"]),
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
    subPages: z.array(reference("eventsSubPages")).optional(),
    sponsoringLevels: z.array(z.string()).optional(),
  });

const zMeetup = () => z.object({ type: z.literal("meetup") });
const zEventClassic = () =>
  z.object({
    type: z.literal("event"),
  });

export type Event = z.infer<ReturnType<typeof zEvent>>;
export const zEvent = ({ image }: SchemaContext) =>
  z
    .discriminatedUnion("type", [
      zEventBase({ image }).merge(zMeetup()),
      zEventBase({ image }).merge(zEventClassic()),
    ])
    .transform((event) => ({
      ...event,
      name: `${event.city}, ${event.country}, ${event.date?.getFullYear()}`,
    }));
