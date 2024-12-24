import { z } from "astro:content";

export type EventsSubPages = z.infer<ReturnType<typeof zEventsSubPages>>;
export const zEventsSubPages = () =>
  z.object({
    title: z.string(),
    description: z.string().optional(),
  });
