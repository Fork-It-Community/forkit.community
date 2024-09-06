import { defineCollection, reference, z } from "astro:content";
import { talksCollection } from "./talks/talks";
import { eventsCollection } from "./events_rename/events";
import { organizersCollection } from "./organizers/organizers";
import { partnersCollection } from "./partners/partners";
import { speakersCollection } from "./speakers/speaker";
import { sponsorsCollection } from "./sponsors/sponsors";

export const zSocialTypes = z.enum(["x", "linkedin", "instagram", "github"]);

export const collections = {
  organizers: organizersCollection,
  partners: partnersCollection,
  sponsors: sponsorsCollection,
  // events: eventsCollection,
  speaker: speakersCollection,
  talk: talksCollection,
  events: defineCollection({
    type: "content",
    schema: z.object({
      name: z.string(),
      subpages: z.array(reference("eventsSubpages")),
    }),
  }),
  eventsSubpages: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
    }),
  }),
};
