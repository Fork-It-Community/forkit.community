import { z } from "astro/zod";

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
  "afterKeynoteSection",
]);

export type EventBlocks = z.infer<ReturnType<typeof zEventBlocks>>;
export const zEventBlocks = () =>
  z.object({
    title: z.string().optional(),
    slot: SLOTS_ENUM,
    order: z.number().default(0),
  });
