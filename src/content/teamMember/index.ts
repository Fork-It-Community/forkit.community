import defineCollection from "@/lib/typed-mdx";
import { z } from "zod";

export type TeamMember = z.infer<typeof TeamMember>;
export const TeamMember = z.object({
  name: z.string(),
  imageUrl: z.string(),
  role: z.string().optional(),
});

export default defineCollection("teamMember", TeamMember);
