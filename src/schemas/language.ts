import { z } from "astro/zod";

export type Language = z.infer<ReturnType<typeof zLanguage>>;
export const zLanguage = () => z.enum(["french", "english", "arabic"]);
