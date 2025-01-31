import { apiImageGenerator } from "@/lib/api-route";
// import { getDirname } from "@/lib/dynamic-assets";

const methods = await apiImageGenerator({
  modules: import.meta.glob("./_*.tsx", { eager: true }),
});
export const getStaticPaths = methods.getStaticPaths;
export const GET = methods.GET;
