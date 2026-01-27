import { reference, z, type SchemaContext } from "astro:content";
import { zAgeRange } from "./utils";
import { zEventBasicInfo } from "./events";

export const zForKidsEvent = ({ image }: SchemaContext) =>
  zEventBasicInfo({ image }).merge(
    z.object({
      startTime: z.date(),
      endTime: z.date().optional(),
      eventTypes: reference("eventTypes"),
      workshops: z.array(reference("forKidsWorkshop")).optional(),
      ageRange: zAgeRange(),
      tickets: z
        .object({
          link: z.string().url(),
          endDate: z.date().optional(),
        })
        .optional(),
      organizers: z
        .array(
          z.object({
            person: reference("people"),
            role: z.string().optional(),
          }),
        )
        .optional()
        .describe("Collection of people that organize the event"),
    }),
  );
export type ForKidsEvent = z.infer<ReturnType<typeof zForKidsEvent>>;
