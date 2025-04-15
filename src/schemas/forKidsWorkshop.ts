import { z, type SchemaContext } from "astro:content";
import { zAgeRange } from "./utils";

export const zForKidsWorkshop = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    ageRange: zAgeRange,
    image: z.object({
      media: image(),
      alt: z.string(),
      credit: z.string().optional(),
    }),
    difficultyLevel: z
      .enum(["beginner", "intermediate", "advanced", "expert"])
      .optional(),
  });
