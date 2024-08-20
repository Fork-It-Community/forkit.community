import { z, defineCollection } from "astro:content";

export type Partner = z.infer<ReturnType<typeof zPartner>>;
const zPartner = () =>
  z.object({
    name: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    href: z.string().url().optional(),
  });

export const partnersCollection = defineCollection({
  type: "content",
  schema: zPartner(),
});
