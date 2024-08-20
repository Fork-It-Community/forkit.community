import { z, defineCollection } from "astro:content";
import { zSocialTypes } from "./config";

export type Sponsor = z.infer<ReturnType<typeof zSponsor>>;
const zSponsor = () =>
  z.object({
    name: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    href: z.string().url().optional(),
    socials: z
      .array(
        z.object({
          type: zSocialTypes(),
          href: z.string().url(),
        }),
      )
      .optional(),
  });

export const sponsorsCollection = defineCollection({
  type: "content",
  schema: zSponsor(),
});
