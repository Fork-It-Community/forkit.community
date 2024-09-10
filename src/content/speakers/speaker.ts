import { z, defineCollection } from "astro:content";
import { zSocialTypes } from "@/content/utils";

export type Speaker = z.infer<ReturnType<typeof zSpeaker>>;
const zSpeaker = () =>
  z.object({
    name: z.string(),
    imageUrl: z.string().optional(),
    job: z.string().optional(),
    company: z
      .object({
        title: z.string(),
        href: z.string().url().optional(),
      })
      .optional(),
    companyHref: z.string().url().optional(),
    socials: z
      .array(
        z.object({
          type: zSocialTypes,
          href: z.string().url(),
        }),
      )
      .optional(),
  });

export const speakersCollection = defineCollection({
  type: "content",
  schema: zSpeaker(),
});
