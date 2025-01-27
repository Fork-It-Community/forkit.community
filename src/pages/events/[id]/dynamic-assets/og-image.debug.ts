import * as og from "./og-image.jpg";

export const getStaticPaths = import.meta.env.PROD
  ? () => []
  : og.getStaticPaths;
export const GET = og.endpoint(true);
