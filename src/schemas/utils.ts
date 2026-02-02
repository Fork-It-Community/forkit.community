import { z, type SchemaContext } from "astro:content";

export type SocialType = z.infer<typeof zSocialTypes>;
export const zSocialTypes = z.enum([
  "x",
  "linkedin",
  "instagram",
  "github",
  "bluesky",
  "facebook",
  "mastodon",
  "source",
  "openstreetmap",
  "website",
  "tiktok",
  "sessionize",
]);

export const zMediaImage = ({ image }: SchemaContext) =>
  z.object({
    media: image(),
    alt: z.string(),
    credit: z.string().optional(),
  });

export const zAgeRange = () =>
  z.object({
    from: z.number().int().min(0),
    to: z.number().int().min(0),
  });
