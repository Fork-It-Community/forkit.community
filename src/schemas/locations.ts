import { z } from "zod";

export type zLocation = z.infer<ReturnType<typeof zLocation>>;
const zLocation = () =>
  z.object({
    latitude: z.number(),
    longitude: z.number(),
    size: z.number(),
    color: z.string(),
  });
