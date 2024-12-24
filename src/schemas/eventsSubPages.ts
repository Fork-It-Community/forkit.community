import { z } from "astro:content";

export type EventSubPage = z.infer<ReturnType<typeof zEventSubPage>>;
export const zEventSubPage = () =>
  z.object({
    title: z.string(),
    description: z.string().optional(),
  });
