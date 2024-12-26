import { reference, z } from "astro:content";

export type Talk = z.infer<ReturnType<typeof zTalk>>;
export const zTalk = () =>
  z.object({
    title: z.string(),
    speakers: z.array(reference("people")),
    language: z.enum(["french", "english"]),
    feedback: z
      .object({
        link: z.string().url(),
      })
      .optional(),
    hosts: z.string().array().optional().describe("Hosts of the round table"),
    vod: z.string().url().optional(),
  });
