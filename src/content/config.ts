import { talksCollection } from "./talks/talks";
import { eventsCollection } from "./events/events";
import { organizersCollection } from "./organizers/organizers";
import { partnersCollection } from "./partners/partners";
import { speakersCollection } from "./speakers/speaker";
import { sponsorsCollection } from "./sponsors/sponsors";
import { meetupsCollection } from "./meetups/meetups";

export const collections = {
  organizers: organizersCollection,
  partners: partnersCollection,
  sponsors: sponsorsCollection,
  events: eventsCollection,
  meetups: meetupsCollection,
  speaker: speakersCollection,
  talk: talksCollection,
};
