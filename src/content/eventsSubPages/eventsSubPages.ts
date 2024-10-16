import { z, defineCollection } from "astro:content";

export type EventsSubPages = z.infer<ReturnType<typeof zEventsSubPages>>;
const zEventsSubPages = () =>
  z.object({
    title: z.string(),
    description: z.string().optional(),
  });

export const eventsSubPagesCollection = defineCollection({
  type: "content",
  schema: zEventsSubPages(),
});
