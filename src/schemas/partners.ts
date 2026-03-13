import { zSocialTypes } from "@/schemas/utils";
import { z } from "astro/zod";
import { type SchemaContext } from "astro:content";

export type Partner = z.infer<ReturnType<typeof zPartner>>;
export const zPartner = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    href: z.url(),
    logos: z.object({
      bgWhite: image(),
      noBg: image(),
      noBgSquare: image(),
    }),
    socials: z
      .array(
        z.object({
          type: zSocialTypes,
          href: z.url(),
        }),
      )
      .optional(),
  });
