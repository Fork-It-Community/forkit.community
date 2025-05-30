import { zMediaImage } from "@/schemas/utils";
import { reference, type SchemaContext } from "astro:content";
import { z } from "astro:schema";

export type City = z.infer<ReturnType<typeof zCity>>;
export const zCity = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    cover: zMediaImage({ image }),
    country: reference("countries"),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    timezone: z.string(),
    description: z.string(),
  });
