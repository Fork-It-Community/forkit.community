import { z } from "astro:content";

export type Language = z.infer<ReturnType<typeof zLanguage>>;
export const zLanguage = () => z.enum(["french", "english"]);
