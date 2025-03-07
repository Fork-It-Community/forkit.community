import { z } from "astro:content";

export type SocialType = z.infer<typeof zSocialTypes>;
export const zSocialTypes = z.enum([
  "x",
  "linkedin",
  "instagram",
  "github",
  "bluesky",
  "facebook",
]);
