import { zLanguage } from "@/schemas/language";
import { z } from "astro/zod";
import { reference, type SchemaContext } from "astro:content";

export type Platform = z.infer<ReturnType<typeof zPlatform>>;
const zPlatform = () =>
  z.enum([
    "link-to-download",
    "spotify",
    "apple-podcast",
    "podcast-index",
    "deezer",
    "youtube",
  ]);

export const zPodcast = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    cover: image(),
    rssFeed: z.url().optional(),
    language: zLanguage(),
    keywords: z.array(z.string()).optional(),
    urls: z
      .array(
        z.object({
          platform: zPlatform(),
          url: z.url(),
        }),
      )
      .optional(),
  });

export const zEpisode = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string().optional(),
    releaseDate: z.date(),
    duration: z.number().describe("Duration in seconds"),
    urls: z
      .array(
        z.object({
          platform: zPlatform(),
          url: z.url(),
        }),
      )
      .optional(),
    cover: image(),
    tags: z.array(z.string()).optional(),
    hosts: z.array(reference("people")),
    guests: z.array(reference("people")).optional(),
    language: zLanguage(),
  });
