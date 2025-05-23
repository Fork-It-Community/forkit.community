import { reference, type SchemaContext } from "astro:content";
import { z } from "astro:schema";

// TODO)) zMediaImage avec l'object de cover

export type City = z.infer<ReturnType<typeof zCity>>;
export const zCity = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    cover: z.object({
      media: image(),
      alt: z.string(),
      credit: z.string().optional(),
    }),
    country: reference("countries"),
    location: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    timezone: z.string(),
  });
