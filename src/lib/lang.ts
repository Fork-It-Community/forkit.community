import { match } from "ts-pattern";

import type { Language } from "@/schemas/language";

export function lang(language: Language | undefined) {
  return match(language)
    .with("french", () => "fr")
    .with("english", undefined, () => "en")
    .with("arabic", () => "ar")
    .exhaustive();
}
