import { zEventTypeEnum } from "@/schemas/utils";
import { z } from "astro:schema";

export type EventTypes = z.infer<ReturnType<typeof zEventTypes>>;
export const zEventTypes = () =>
  z.object({
    name: zEventTypeEnum,
    label: z.string(),
    description: z.string(),
  });
