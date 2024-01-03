import { defineCollection } from "@/lib/typed-mdx";
import { z } from "zod";

export type Organizers = z.infer<typeof Organizers>;
export const Organizers = z.object({
  name: z.string(),
  imageUrl: z.string(),
  role: z.string().optional(),
});

export default defineCollection("organizers", Organizers);
