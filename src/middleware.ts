import { changeLanguage, init } from "@/i18n";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(
  async ({ currentLocale, url }, next) => {
    await init();
    changeLanguage(currentLocale);

    const response = await next();

    if (url.pathname === "/") {
      response.headers.set(
        "Link",
        '</llms.txt>; rel="describedby"; type="text/plain"',
      );
    }

    return response;
  },
);
