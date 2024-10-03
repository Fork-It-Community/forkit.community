import { z, defineCollection } from "astro:content";

export type Talk = z.infer<ReturnType<typeof zTalk>>;
const zTalk = () =>
  z.object({
    title: z.string(),
    speakers: z.string().array(),
    language: z.enum(["french", "english"]),
    feedback: z
      .object({
        link: z.string().url(),
      })
      .optional(),
    hosts: z.string().array().optional(),
  });

export type TalkContent = {
  id: string;
  collection: string;
  body: string;
  slug: string;
  data: Talk;
};

export const talksCollection = defineCollection({
  type: "content",
  schema: zTalk(),
});
