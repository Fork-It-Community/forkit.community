import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import robotsTxt from "astro-robots-txt";
import { defineConfig, envField } from "astro/config";

import { getSiteUrl } from "./src/lib/getSiteURL";

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(),

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
    },
  },

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap({
      filter: (page) => !page.endsWith("/attendee"),
    }),
    robotsTxt(),
  ],

  adapter: vercel({ isr: true }),
});
