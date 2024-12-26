import { zSocialTypes } from "@/schemas/utils";
import { z, type SchemaContext } from "astro:content";

export type Sponsor = z.infer<ReturnType<typeof zSponsor>>;
export const zSponsor = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    image: z.object({
      src: image(),
      alt: z.string(),
    }),
    logo: z
      .object({
        src: image(),
        alt: z.string().optional(),
      })
      .optional(),
    href: z.string().url().optional(),
    socials: z
      .array(
        z.object({
          type: zSocialTypes,
          href: z.string().url(),
        }),
      )
      .optional(),
  });
