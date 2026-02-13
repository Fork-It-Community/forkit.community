import { apiImageEndpoint } from "@bearstudio/astro-assets-generation";
import type { APIRoute } from "astro";
import "@/generated-assets/lib";

export const prerender = false;

export const GET: APIRoute = apiImageEndpoint(
  import.meta.glob("./_*.tsx", { eager: true }),
);
