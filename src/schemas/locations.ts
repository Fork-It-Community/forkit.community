import { z } from "zod";

export type zLocation = z.infer<ReturnType<typeof zLocation>>;
const zLocation = () =>
  z.object({
    name: z.string(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
  });
