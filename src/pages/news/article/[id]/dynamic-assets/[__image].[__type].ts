import { apiImageGenerator, getDirname } from "@/lib/dynamic-assets";

const methods = await apiImageGenerator({
  fromDirectory: getDirname(import.meta.url),
});
export const getStaticPaths = methods.getStaticPaths;
export const GET = methods.GET;
