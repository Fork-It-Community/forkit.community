import { changeLanguage, init } from "@/i18n";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ currentLocale }, next) => {
  await init();
  changeLanguage(currentLocale);

  return next();
});
