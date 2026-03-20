import { APPROVAL_STATUSES, LUMA_BASE_URL } from "@/lib/luma/consts";
import { zGuests, type Guest, type Guests } from "@/lib/luma/schemas/guest";
import { getHeaders } from "@/lib/luma/utils";
import { lunalink } from "@bearstudio/lunalink";
import { z } from "astro/zod";
import { Result } from "better-result";

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
  const headersResult = getHeaders();
  if (headersResult.isErr()) return Result.err(headersResult.error);

  const url = `${LUMA_BASE_URL}${lunalink("/v1/event/get-guests", params)}`;

  return Result.tryPromise({
    try: async () => {
      const response = await fetch(url, {
        headers: headersResult.value,
      });
      const json = await response.json();
      return zGuests().parse(json);
    },
    catch: (e) => (e instanceof Error ? e : new Error(String(e))),
  });
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

    if (response.isErr()) return response;

    guests = [...guests, ...response.value.entries.map((entry) => entry.guest)];
    hasMore = response.value.has_more;
    nextCursor = response.value.next_cursor;
  }

  return Result.ok(guests);
}
