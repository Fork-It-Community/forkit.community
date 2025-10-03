import { APPROVAL_STATUSES } from "@/lib/luma/consts";
import { z } from "astro/zod";

export type Guest = z.infer<ReturnType<typeof zGuest>>;
export const zGuest = () =>
  z.object({
    id: z.string(),
    user_id: z.string(),
    user_email: z.string(),
    user_name: z.string().nullable(),
    user_first_name: z.string().nullable(),
    user_last_name: z.string().nullable(),
    approval_status: z.enum(APPROVAL_STATUSES).nullable(),
    check_in_qr_code: z.string(),
    custom_source: z.string().nullable(),
    eth_address: z.string().nullable(),
    invited_at: z.string().nullable(),
    joined_at: z.string().nullable(),
    phone_number: z.string().nullable(),
    registered_at: z.string().nullable(),
    registration_answers: z
      .array(
        z.object({
          answer: z.boolean(),
          label: z.string(),
          question_id: z.string(),
          question_type: z.string(),
        }),
      )
      .nullable(),
    solana_address: z.string().nullable(),
    event_tickets: z.array(
      z.object({
        id: z.string(),
        amount: z.number(),
        amount_discount: z.number(),
        amount_tax: z.number(),
        currency: z.string().nullable(),
        checked_in_at: z.string().nullable(),
        event_ticket_type_id: z.string(),
        is_captured: z.boolean(),
        name: z.string(),
      }),
    ),
  });

export type Guests = z.infer<ReturnType<typeof zGuests>>;
export const zGuests = () =>
  z.object({
    entries: z.array(z.object({ api_id: z.string(), guest: zGuest() })),
    has_more: z.boolean().default(false),
    next_cursor: z.string().optional(),
  });
