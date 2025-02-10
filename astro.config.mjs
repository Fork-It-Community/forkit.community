import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

import vercel from "@astrojs/vercel";

const getSiteUrl = () => {
  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://www.forkit.community";

  const branchUrl = process.env.VERCEL_BRANCH_URL
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : productionUrl;

  const localUrl = "http://localhost:4321";

  if (!import.meta.env.PROD) {
    return localUrl;
  }
  if (import.meta.env.PROD && process.env.VERCEL_TARGET_ENV === "preview") {
    return branchUrl;
  }
  return productionUrl;
};

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
    sitemap(),
    robotsTxt(),
  ],

  adapter: vercel({ isr: true }),
});
