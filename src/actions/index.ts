import { search } from "@/actions/search";
import { defineAction } from "astro:actions";

export const server = {
  search: defineAction({
    handler: search,
  }),
};
