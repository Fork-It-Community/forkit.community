import z from "zod";

export type TeamMember = z.infer<ReturnType<typeof zTeamMember>>;
export const zTeamMember = () =>
  z.object({
    name: z.string(),
    imageUrl: z.string(),
    role: z.string().optional(),
  });
