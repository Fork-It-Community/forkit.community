import { changeLanguage, init } from "@/i18n";
import { defineMiddleware } from "astro:middleware";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.clarity.ms https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://img.youtube.com https://*.facebook.com data:",
  "font-src 'self'",
  "frame-src https://www.youtube.com https://embed.acast.com https://www.openstreetmap.org",
  "connect-src 'self' https://*.clarity.ms https://*.facebook.com https://*.facebook.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

export const onRequest = defineMiddleware(async ({ currentLocale }, next) => {
  await init();
  changeLanguage(currentLocale);

  const response = await next();

  response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");

  return response;
});
