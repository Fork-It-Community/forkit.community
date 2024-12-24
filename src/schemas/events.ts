import { z, reference, type SchemaContext } from "astro:content";

const zEventBase = ({ image }: SchemaContext) =>
  z.object({
    city: z.string(),
    country: z.string(),
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
        src: image(),
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
    published: z.boolean().optional().default(false),
    sponsoringLevels: z.array(z.string()),
    sponsors: z
      .array(
        z.object({
          slug: reference("sponsors"), // <- the slug of the sponsor
          level: z.string(), // <- the level of sponsoring
          options: z.array(z.enum(["lunch"])).optional(), // <- if the sponsor has an option
        }),
      )
      .optional(),
    speakers: z.array(reference("people")).optional(),
    talks: z.array(reference("talks")).optional(),
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
        sponsors: z.array(reference("sponsors")).optional(),
        description: z.string().optional(),
        name: z.string().optional(),
        slug: z.string().optional(),
        startTime: z.date().optional(),
        duration: z.number().optional(),
        location: z.string().optional(),
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

const zMeetup = () => z.object({ type: z.literal("meetup") });
const zEventClassic = () =>
  z.object({
    type: z.literal("event"),
    subPages: z.array(reference("eventsSubPages")).optional(),
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
