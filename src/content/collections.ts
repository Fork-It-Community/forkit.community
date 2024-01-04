import { defineCollection } from "@/lib/typed-mdx";
import { z } from "zod";

const collections = {
  organizer: defineCollection({
    folder: "organizer",
    schema: z.object({
      name: z.string(),
      imageUrl: z.string(),
      role: z.string().optional(),
    }),
  }),
  sponsor: defineCollection({
    folder: "sponsor",
    schema: z.object({
      name: z.string(),
      imageUrl: z.string(),
    }),
  }),
} as const;

export default collections;
