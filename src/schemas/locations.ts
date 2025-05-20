import { z } from "zod";

export type zLocation = z.infer<ReturnType<typeof zLocation>>;
const zLocation = () =>
  z.object({
    lat: z.number(),
    lng: z.number(),
    size: z.number(),
    name: z.string(),
    color: z.string(),
  });
