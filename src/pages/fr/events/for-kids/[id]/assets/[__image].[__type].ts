import { dynamicAssets } from "@/lib/astro-dynamic-assets";

export const prerender = false;

export const GET = dynamicAssets.apiImageEndpoint(
  import.meta.glob("./_*.tsx", { eager: true }),
);
