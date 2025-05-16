import { reference, z, type SchemaContext } from "astro:content";
import { zAgeRange } from "./utils";
import { zEventBasicInfo } from "./events";

export const zForKidsEvent = ({ image }: SchemaContext) =>
  zEventBasicInfo({ image }).merge(
    z.object({
      startTime: z.date(),
      endTime: z.date().optional(),
      workshops: z.array(reference("forKidsWorkshop")),
      ageRange: zAgeRange(),
    }),
  );
