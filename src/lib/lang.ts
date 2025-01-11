import type { Language } from "@/schemas/language";
import { match } from "ts-pattern";

export function lang(language: Language | undefined) {
  return match(language)
    .with("french", () => "fr")
    .with("english", undefined, () => "en")
    .exhaustive();
}
