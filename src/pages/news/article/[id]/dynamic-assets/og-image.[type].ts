import generateImageMethods from "./_og-image";

const imageMethods = generateImageMethods();
export const getStaticPaths = imageMethods.getStaticPaths;
export const GET = imageMethods.GET;
