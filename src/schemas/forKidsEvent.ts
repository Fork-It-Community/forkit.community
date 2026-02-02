import { z } from "astro/zod";
import { reference, type SchemaContext } from "astro:content";
import { zAgeRange } from "./utils";
import { zEventBasicInfo } from "./events";

export const zForKidsEvent = ({ image }: SchemaContext) =>
  z.object({
    ...zEventBasicInfo({ image }).shape,
    startTime: z.date(),
    endTime: z.date().optional(),
    workshops: z.array(reference("forKidsWorkshop")).optional(),
    ageRange: zAgeRange(),
    tickets: z
      .object({
        link: z.url(),
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
  });
export type ForKidsEvent = z.infer<ReturnType<typeof zForKidsEvent>>;
