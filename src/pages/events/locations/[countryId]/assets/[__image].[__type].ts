import DynamicAssets from "@/lib/astro-dynamic-assets";
export const prerender = false;

export const GET = DynamicAssets.apiImageEndpoint(
  import.meta.glob("./_*.tsx", { eager: true }),
);
