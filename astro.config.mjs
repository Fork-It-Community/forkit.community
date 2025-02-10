import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

import vercel from "@astrojs/vercel";

const getSiteUrl = () => {
  const productionUrl =
    import.meta.env.VERCEL_PROJECT_PRODUCTION_URL ??
    "https://www.forkit.community";

  const branchUrl = import.meta.env.VERCEL_BRANCH_URL ?? productionUrl;
  const localUrl = "http://localhost:4321";

  console.log({
    metaVERCEL_PROJECT_PRODUCTION_URL: import.meta.env
      .VERCEL_PROJECT_PRODUCTION_URL,
    metaVERCEL_BRANCH_URL: import.meta.env.VERCEL_BRANCH_URL,
    processVERCEL_PROJECT_PRODUCTION_URL:
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
    processVERCEL_BRANCH_URL: process.env.VERCEL_BRANCH_URL,
    productionUrl,
    branchUrl,
    localUrl,
  });

  if (!import.meta.env.PROD) {
    return localUrl;
  }
  if (import.meta.env.PROD && import.meta.env.VERCEL_TARGET_ENV === "preview") {
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
