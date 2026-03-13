import { zMediaImage } from "@/schemas/utils";
import { z } from "astro/zod";
import { reference, type SchemaContext } from "astro:content";

export type City = z.infer<ReturnType<typeof zCity>>;
export const zCity = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    cover: zMediaImage({ image }).optional(),
    country: reference("countries"),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    timezone: z.string(),
    description: z.string(),
    organizers: z.array(reference("people")).optional(),
  });
