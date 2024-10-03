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
    socials: z
      .array(
        z.object({
          type: zSocialTypes,
          href: z.string().url(),
        }),
      )
      .optional(),
  });

export type SpeakerContent = {
  id: string;
  collection: string;
  body: string;
  slug: string;
  data: Speaker;
};

export const speakersCollection = defineCollection({
  type: "content",
  schema: zSpeaker(),
});
