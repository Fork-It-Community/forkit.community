import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://www.forkit.community",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
    robotsTxt(),
  ],
  redirects: {
    // Events
    // "/events/2024-06-07-rouen": "/events/2024-france-rouen",
    // "/meetups/2024-11-28-casablanca": "/events/2024-morocco-casablanca",
    // "/meetups/2024-11-15-da-nang": "/events/2024-vietnam-da-nang",
    // "/meetups/2024-11-05-bangkok": "/events/2024-thailand-bangkok",
    // "/meetups/2024-10-22-kuala-lumpur": "/events/2024-malaisia-kuala-lumpur",
    // "/meetups/2024-10-17-hanoi": "/events/2024-vietnam-hanoi",
    // "/meetups/2024-09-24-tunis": "/events/2024-tunisia-tunis",
    // "/meetups/2024-11-19-belgium":
    //   "/events/2024-belgium-ottignies-louvain-la-neuve",
    // Rouen subpages
    // "/events/2024-06-07-rouen/informations":
    //   "/events/2024-france-rouen/pages/informations",
    // "/events/2024-06-07-rouen/weekend":
    //   "/events/2024-france-rouen/pages/weekend",
    // Events schedule
    // "/events/2024-06-07-rouen/[...rest]": "/events/2024-france-rouen/[...rest]",
    // "/meetups/2024-11-28-casablanca/[...rest]":
    //   "/events/2024-morocco-casablanca/[...rest]",
    // "/meetups/2024-11-15-da-nang/[...rest]":
    //   "/events/2024-vietnam-da-nang/[...rest]",
    // "/meetups/2024-11-05-bangkok/[...rest]":
    //   "/events/2024-thailand-bangkok/[...rest]",
    // "/meetups/2024-10-22-kuala-lumpur/[...rest]":
    //   "/events/2024-malaisia-kuala-lumpur/[...rest]",
    // "/meetups/2024-10-17-hanoi/[...rest]":
    //   "/events/2024-vietnam-hanoi/[...rest]",
    // "/meetups/2024-09-24-tunis/[...rest]":
    //   "/events/2024-tunisia-tunis/[...rest]",
    // "/meetups/2024-11-19-belgium/[...rest]":
    //   "/events/2024-belgium-ottignies-louvain-la-neuve/[...rest]",
  },
});
