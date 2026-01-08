import { z } from "astro:content";

const SLOTS_ENUM = z.enum([
  "afterHero",
  "afterFirstSponsors",
  "afterStayTuned",
  "afterAfterEvent",
  "afterVenue",
  "afterCFP",
  "afterScheduleAndSpeaker",
  "afterFeedback",
  "afterSecondSponsors",
  "afterOrganizers",
  "afterProspectus",
  "afterEventVibes",
  "afterFAQ",
  "afterPartners",
  "afterAssets",
  "afterRelatedEvents",
]);

export type EventBlocks = z.infer<ReturnType<typeof zEventBlocks>>;
export const zEventBlocks = () =>
  z.object({
    title: z.string().optional(),
    slot: SLOTS_ENUM,
    order: z.number().default(0),
  });
