import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import astroDynamicImages from "./astro-dynamic-images.ts";

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.PROD
    ? "https://www.forkit.community"
    : "http://localhost:4321",

  trailingSlash: "never",

  experimental: {
    contentIntellisense: true,
  },

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
    robotsTxt(),
    astroDynamicImages({
      basePaths: ["/events/[id]/dynamic-images"],
    }),
  ],
});
