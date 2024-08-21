import { z, defineCollection } from "astro:content";
import { zSocialTypes } from "../config";

export type Organizer = z.infer<ReturnType<typeof zOrganizer>>;
const zOrganizer = () =>
  z.object({
    name: z.string(),
    imageUrl: z.string(),
    role: z.string().optional(),
    socials: z
      .array(
        z.object({
          type: zSocialTypes,
          href: z.string().url(),
        }),
      )
      .optional(),
  });

export const organizersCollection = defineCollection({
  type: "content",
  schema: zOrganizer(),
});
