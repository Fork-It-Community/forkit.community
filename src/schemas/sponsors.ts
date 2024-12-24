import { zSocialTypes } from "@/schemas/utils";
import { z } from "astro:content";

export type Sponsor = z.infer<ReturnType<typeof zSponsor>>;
export const zSponsor = () =>
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
          type: zSocialTypes,
          href: z.string().url(),
        }),
      )
      .optional(),
  });
