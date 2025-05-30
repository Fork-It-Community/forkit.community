import { type SchemaContext } from "astro:content";
import { z } from "astro:schema";

export type Country = z.infer<ReturnType<typeof zCountry>>;
export const zCountry = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    cover: z.object({
      media: image(),
      alt: z.string(),
      credit: z.string().optional(),
    }),
    countryCode: z.string().length(2).describe("ISO 3166-1, Code Alpha-2"),
    description: z.string(),
  });
