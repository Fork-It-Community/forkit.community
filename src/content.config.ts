import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { zEvent } from "@/schemas/events";
import { zNews } from "@/schemas/news";
import { zPerson } from "@/schemas/people";
import { zSponsor } from "@/schemas/sponsors";
import { zPartner } from "@/schemas/partners";
import { zMeetup } from "@/schemas/meetups";
import { zTalk } from "@/schemas/talks";

export const collections = {
  partners: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/partners" }),
    schema: zPartner(),
  }),
  sponsors: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/sponsors" }),
    schema: zSponsor(),
  }),
  events: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/events" }),
    schema: zEvent(),
  }),
  meetups: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/meetups" }),
    schema: zMeetup(),
  }),
  talk: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/talks" }),
    schema: zTalk(),
  }),
  people: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/people" }),
    schema: zPerson(),
  }),
  news: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/news" }),
    schema: zNews(),
  }),
};
