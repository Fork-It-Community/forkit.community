// @ts-check
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { qrcode } from "vite-plugin-qrcode";

import node from "@astrojs/node";
import vercel from "@astrojs/vercel";
import { getSiteUrl } from "./src/lib/getSiteURL";
import astrobook from "astrobook";

import bearstudiotypedRoutes from "@bearstudio/astro-typed-routes";

const adapter =
  process.argv[3] === "--node" ||
  process.argv[4] === "--node" ||
  import.meta.env.DEV
    ? node({ mode: "standalone" })
    : vercel({
        isr: {
          // TODO: Revert — exclude actions from ISR due to @astrojs/vercel bug:
          // ISR entrypoint reconstructs POST body without `duplex: 'half'`, causing a TypeError.
          // Excluding actions from ISR lets them go directly to the serverless function.
          // Remove this once the bug is fixed in Astro/Vercel adapter.
          exclude: [/^\/_actions\/.*/],
        },
      });

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
        optional: true,
      }),
      GITHUB_ACCESS_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      MAPTILER_API_KEY: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
    },
  },
  vite: {
    plugins: [qrcode()],
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
        !page.endsWith("/prospectus") &&
        !page.includes("/branding/components") &&
        !page.includes("/dashboard") &&
        !page.endsWith("/events/types"),
    }),
    robotsTxt({
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/branding/components", "/events/*/prospectus"],
        },
      ],
    }),
    astrobook({
      subpath: "/branding/components",
      css: ["./src/styles/globals.css"],
      title: "Components | Fork it! Community",
    }),
    bearstudiotypedRoutes(),
  ],

  adapter,
});
