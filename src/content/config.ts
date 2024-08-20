import { z } from "astro:content";
import { talksCollection } from "./talks";
import { eventsCollection } from "./events";
import { organizersCollection } from "./organizers";
import { partnersCollection } from "./partners";
import { speakersCollection } from "./speaker";
import { sponsorsCollection } from "./sponsors";

export const zSocialTypes = () =>
  z.enum(["x", "linkedin", "instagram", "github"]);

export const collections = {
  organizers: organizersCollection,
  partners: partnersCollection,
  sponsors: sponsorsCollection,
  events: eventsCollection,
  speaker: speakersCollection,
  talk: talksCollection,
};
