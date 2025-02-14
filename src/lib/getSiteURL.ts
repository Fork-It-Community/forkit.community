export const getSiteUrl = () => {
  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://www.forkit.community";

  const branchUrl = process.env.VERCEL_BRANCH_URL
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : productionUrl;

  const localUrl = "http://localhost:4321";

  if (!import.meta.env.PROD) {
    return localUrl;
  }

  if (import.meta.env.PROD && process.env.VERCEL_TARGET_ENV === "preview") {
    return branchUrl;
  }

  return productionUrl;
};
