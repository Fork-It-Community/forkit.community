import { apiImageEndpoint } from "@/generated-assets/api";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = apiImageEndpoint(
  import.meta.glob("./_*.tsx", { eager: true }),
);
