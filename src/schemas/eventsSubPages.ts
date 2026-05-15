import { z } from "astro/zod";

export type EventSubPage = z.infer<ReturnType<typeof zEventSubPage>>;
export const zEventSubPage = () =>
  z.object({
    title: z.string(),
    description: z.string().optional(),
    pageType: z.enum(["base", "marketing"]).default("base"),
  });
