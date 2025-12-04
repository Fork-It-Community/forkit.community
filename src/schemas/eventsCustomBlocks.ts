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
  "AfterFAQ",
  "AfterPartners",
  "AfterAssets",
  "AfterRelatedEvents",
]);

export type EventCustomBlocks = z.infer<ReturnType<typeof zEventCustomBlocks>>;
export const zEventCustomBlocks = () =>
  z.object({
    title: z.string().optional(),
    slot: SLOTS_ENUM,
    order: z.number().default(0),
  });
