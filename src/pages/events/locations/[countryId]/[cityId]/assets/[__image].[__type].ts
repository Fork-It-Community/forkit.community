import type { APIRoute } from "astro";

import { apiImageEndpoint } from "@/generated-assets/api";

export const prerender = false;

export const GET: APIRoute = apiImageEndpoint(
  import.meta.glob("./_*.tsx", { eager: true }),
);
