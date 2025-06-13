import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { zEvent } from "@/schemas/events";
import { zNews } from "@/schemas/news";
import { zPerson } from "@/schemas/people";
import { zPartner } from "@/schemas/partners";
import { zTalk } from "@/schemas/talks";
import { zEventSubPage } from "@/schemas/eventsSubPages";
import { zEpisode, zPodcast } from "@/schemas/podcasts";
import { zCountry } from "@/schemas/country";
import { zCity } from "@/schemas/city";
import { zForKidsEvent } from "./schemas/forKidsEvent";
import { zForKidsWorkshop } from "./schemas/forKidsWorkshop";

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
  forKidsEvent: defineCollection({
    loader: glob({
      pattern: ["**/*.mdx"],
      base: "./src/content/for-kids-events",
    }),
    schema: zForKidsEvent,
  }),
  forKidsWorkshop: defineCollection({
    loader: glob({
      pattern: "**/*.mdx",
      base: "./src/content/for-kids-workshops",
    }),
    schema: zForKidsWorkshop,
  }),
};
