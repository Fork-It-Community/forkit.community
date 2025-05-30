import { type SchemaContext, z } from "astro:content";

import { zSocialTypes } from "@/schemas/utils";

export type Partner = z.infer<ReturnType<typeof zPartner>>;
export const zPartner = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    href: z.string().url(),
    logos: z.object({
      bgWhite: image(),
      noBg: image(),
      noBgSquare: image(),
    }),
    socials: z
      .array(
        z.object({
          type: zSocialTypes,
          href: z.string().url(),
        }),
      )
      .optional(),
  });
