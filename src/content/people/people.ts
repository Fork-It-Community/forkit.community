import { z, defineCollection } from "astro:content";
import { zSocialTypes } from "../utils";

export type People = z.infer<ReturnType<typeof zPeople>>;
const zPeople = () =>
  z.object({
    name: z.string(),
    imageUrl: z.string().optional(),
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
    companyHref: z.string().url().optional(),
  });

export const peopleCollection = defineCollection({
  type: "data",
  schema: zPeople(),
});
