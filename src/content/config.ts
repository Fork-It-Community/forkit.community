import { talksCollection } from "./talks/talks";
import { eventsCollection } from "./events/events";
import { partnersCollection } from "./partners/partners";
import { sponsorsCollection } from "./sponsors/sponsors";
import { componentsCollection } from "@/content/components/components";
import { meetupsCollection } from "./meetups/meetups";
import { peopleCollection } from "./people/people";

export const collections = {
  partners: partnersCollection,
  sponsors: sponsorsCollection,
  events: eventsCollection,
  meetups: meetupsCollection,
  talk: talksCollection,
  people: peopleCollection,
  components: componentsCollection,
};
