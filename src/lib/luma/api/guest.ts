import { APPROVAL_STATUSES, LUMA_BASE_URL } from "@/lib/luma/consts";
import { zGuests, type Guest, type Guests } from "@/lib/luma/schemas/guest";
import { getHeaders } from "@/lib/luma/utils";
import { lunalink } from "@bearstudio/lunalink";
import { z } from "astro/zod";

type Params = z.infer<ReturnType<typeof zParams>>;
const zParams = () =>
  z.object({
    event_api_id: z.string(),
    pagination_cursor: z
      .string()
      .optional()
      .describe("Value of next_cursor from a previous request."),
    pagination_limit: z
      .number()
      .optional()
      .describe(
        "The number of items to return. The server will enforce a maximum number.",
      ),
    approval_status: z.enum(APPROVAL_STATUSES).optional(),
    sort_column: z
      .enum(["name", "email", "created_at", "registered_at", "checked_in_at"])
      .optional(),
    sort_direction: z
      .enum(["asc", "desc", "asc nulls last", "desc nulls last"])
      .optional(),
  });

export async function getGuests(params: Params) {
  const url = `${LUMA_BASE_URL}${lunalink("/v1/event/get-guests", params)}`;
  const response = await fetch(url, {
    headers: getHeaders(),
  });

  const json = await response.json();

  return zGuests().parse(json);
}

export async function getAllGuests(params: Params) {
  let hasMore: Guests["has_more"] = true;
  let guests: Array<Guest> = [];
  let nextCursor: Guests["next_cursor"];

  while (hasMore) {
    const response = await getGuests({
      ...params,
      pagination_cursor: nextCursor,
    });

    guests = [...guests, ...response.entries.map((entry) => entry.guest)];
    hasMore = response.has_more;
    nextCursor = response.next_cursor;
  }

  return guests;
}
