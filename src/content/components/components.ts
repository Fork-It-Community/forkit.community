import { z, defineCollection } from "astro:content";

export type Component = z.infer<ReturnType<typeof zComponent>>;
const zComponent = () =>
  z.object({
    name: z.string(),
  });

export const componentsCollection = defineCollection({
  type: "content",
  schema: zComponent(),
});
