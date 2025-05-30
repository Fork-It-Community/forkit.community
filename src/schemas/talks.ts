import { reference, z } from "astro:content";

import { zLanguage } from "@/schemas/language";

export type Talk = z.infer<ReturnType<typeof zTalk>>;
export const zTalk = () =>
  z.object({
    title: z.string(),
    speakers: z.array(
      z.object({ id: reference("people"), role: z.string().optional() }),
    ),
    language: zLanguage(),
    feedback: z
      .object({
        link: z.string().url(),
      })
      .optional(),
    hosts: z
      .array(reference("people"))
      .optional()
      .describe("Hosts of the round table"),
    vod: z
      .object({
        type: z.enum(["youtube"]),
        youtubeId: z.string(),
      })
      .optional(),
    contentLanguage: zLanguage().optional().default("english"),
  });
