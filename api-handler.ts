import { apiImageGenerator } from "./dynamic-images";

const methods = await apiImageGenerator({
  modules: import.meta.glob("./src/inte/**/_*.tsx", {
    eager: true,
  }),
});

export const getStaticPaths = methods.getStaticPaths;
export const GET = methods.GET;
