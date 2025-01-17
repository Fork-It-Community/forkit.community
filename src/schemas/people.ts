import { zSocialTypes } from "@/schemas/utils";
import { z, type SchemaContext } from "astro:content";

export type Person = z.infer<ReturnType<typeof zPerson>>;
export const zPerson = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    avatar: image().optional(),
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
    forkit: z
      .object({
        role: z.enum(["founder", "organizer", "volunteer"]),
        avatar: image().optional(),
      })
      .optional(),
  });
