import { apiImageGenerator } from "@/dynamic-images";

export const prerender = false;
const methods = await apiImageGenerator({
  modules: import.meta.glob("./_*.tsx", { eager: true }),
});
export const GET = methods.GET;
