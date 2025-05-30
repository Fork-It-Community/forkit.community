import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

import { zCity } from "@/schemas/city";
import { zCountry } from "@/schemas/country";
import { zEvent } from "@/schemas/events";
import { zEventSubPage } from "@/schemas/eventsSubPages";
import { zNews } from "@/schemas/news";
import { zPartner } from "@/schemas/partners";
import { zPerson } from "@/schemas/people";
import { zEpisode, zPodcast } from "@/schemas/podcasts";
import { zTalk } from "@/schemas/talks";

export const collections = {
  partners: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/partners" }),
    schema: zPartner,
  }),
  events: defineCollection({
    loader: glob({
      pattern: ["**/*.mdx", "!**/pages/*.mdx"],
      base: "./src/content/events",
    }),
    schema: zEvent,
  }),
  eventsSubPages: defineCollection({
    loader: glob({
      pattern: "**/pages/*.mdx",
      base: "./src/content/events",
    }),
    schema: zEventSubPage,
  }),
  talks: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/talks" }),
    schema: zTalk,
  }),
  people: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/people" }),
    schema: zPerson,
  }),
  news: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/news" }),
    schema: zNews,
  }),
  podcasts: defineCollection({
    loader: glob({
      pattern: ["**/*.mdx", "!**/episodes/**/*.mdx"],
      base: "./src/content/podcasts",
    }),
    schema: zPodcast,
  }),
  episodes: defineCollection({
    loader: glob({
      pattern: "**/episodes/**/*.mdx",
      base: "./src/content/podcasts",
    }),
    schema: zEpisode,
  }),
  countries: defineCollection({
    loader: glob({
      pattern: "**/*.mdx",
      base: "./src/content/countries",
    }),
    schema: zCountry,
  }),
  cities: defineCollection({
    loader: glob({
      pattern: "**/*.mdx",
      base: "./src/content/cities",
    }),
    schema: zCity,
  }),
};
