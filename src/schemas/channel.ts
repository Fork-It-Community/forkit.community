import { z } from "astro:schema";

const CHANNEL_TYPES = ["whatsapp", "newsletter"] as const;

export type Channel = z.infer<ReturnType<typeof zChannel>>;
export const zChannel = () =>
  z.object({
    type: z.enum(CHANNEL_TYPES),
    link: z.object({
      title: z.string(),
      href: z.string().url(),
    }),
  });
