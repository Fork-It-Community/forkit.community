import { zChannel } from "@/schemas/channel";
import { zMediaImage } from "@/schemas/utils";
import { z } from "astro/zod";
import { reference, type SchemaContext } from "astro:content";

export type Country = z.infer<ReturnType<typeof zCountry>>;
export const zCountry = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    cover: zMediaImage({ image }),
    countryCode: z.string().length(2).describe("ISO 3166-1, Code Alpha-2"),
    description: z.string().optional(),
    organizers: z.array(reference("people")).optional().default([]),
    flag: image().optional(),
    channels: z.array(zChannel()).optional(),
    eventVibesImages: z.array(image()).length(6).optional(),
  });
