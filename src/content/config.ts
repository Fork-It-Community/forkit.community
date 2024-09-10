import { z } from "astro:content";
import { talksCollection } from "./talks/talks";
import { eventsCollection } from "./events/events";
import { organizersCollection } from "./organizers/organizers";
import { partnersCollection } from "./partners/partners";
import { speakersCollection } from "./speakers/speaker";
import { sponsorsCollection } from "./sponsors/sponsors";
import { eventsSubPagesCollection } from "./eventsSubPages/eventsSubPages";

export const zSocialTypes = z.enum(["x", "linkedin", "instagram", "github"]);

export const collections = {
  organizers: organizersCollection,
  partners: partnersCollection,
  sponsors: sponsorsCollection,
  events: eventsCollection,
  speaker: speakersCollection,
  talk: talksCollection,
  eventsSubPages: eventsSubPagesCollection,
};
