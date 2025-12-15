import { z } from "astro:content";

const zEventMarketingSlot = z.enum([
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

export type EventBlocks = z.infer<ReturnType<typeof zEventBlocks>>;
export const zEventBlocks = () =>
  z.object({
    title: z.string().optional(),
    slot: zEventMarketingSlot,
    order: z.number().default(0),
  });
