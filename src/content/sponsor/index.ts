import defineCollection from "@/lib/typed-mdx";
import { z } from "zod";

export type Sponsor = z.infer<typeof Sponsor>;
export const Sponsor = z.object({
  name: z.string(),
  imageUrl: z.string(),
});

export default defineCollection("sponsor", Sponsor);
