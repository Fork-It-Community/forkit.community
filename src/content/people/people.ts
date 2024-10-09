import { z, defineCollection } from "astro:content";
import { zSocialTypes } from "../utils";

export type Person = z.infer<ReturnType<typeof zPerson>>;
const zPerson = () =>
  z.object({
    name: z.string(),
    avatar: z.string().optional(),
    job: z.string().optional(),
    socials: z
      .array(
        z.object({
          type: zSocialTypes,
          href: z.string().url(),
        }),
      )
      .optional(),
    company: z
      .object({
        title: z.string(),
        href: z.string().url().optional(),
      })
      .optional(),
  });

export const peopleCollection = defineCollection({
  type: "content",
  schema: zPerson(),
});
