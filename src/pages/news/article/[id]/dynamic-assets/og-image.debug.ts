import generateImageMethods from "./og-image";
const imageMethods = generateImageMethods({ isDebug: true });
export const getStaticPaths = imageMethods.getStaticPaths;
export const GET = imageMethods.GET;
