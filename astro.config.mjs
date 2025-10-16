// @ts-check
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

import vercel from "@astrojs/vercel";
import { getSiteUrl } from "./src/lib/getSiteURL";
import astrobook from "astrobook";

import bearstudiotypedRoutes from "@bearstudio/astro-typed-routes";

import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(),

  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },

  trailingSlash: "never",

  experimental: {
    contentIntellisense: true,
  },

  env: {
    schema: {
      ENV_NAME: envField.string({
        context: "server",
        access: "public",
        optional: true,
      }),
      LUMA_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
      SENTRY_AUTH_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap({
      filter: (page) =>
        !page.endsWith("/attendee") &&
        !page.endsWith("/events/locations") &&
        !page.includes("/branding/components") &&
        !page.includes("/dashboard"),
    }),
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/branding/components"],
        },
      ],
    }),
    astrobook({
      subpath: "/branding/components",
      css: ["./src/styles/globals.css"],
      title: "Components | Fork it! Community",
    }),
    bearstudiotypedRoutes(),
    sentry({
      dsn: "https://6a0a01bf72307a132c7aa8a8e91577c0@sentry.bearstudio.info/8",
      sourceMapsUploadOptions: {
        project: "forkit-community",
        authToken: process.env.SENTRY_AUTH_TOKEN ?? "",
      },
    }),
  ],

  adapter: vercel({ isr: true }),
});
