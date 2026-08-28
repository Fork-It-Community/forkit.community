/**
 * Some behaviour only exists once the site is served by Vercel — the
 * `vercel.json` redirects, ISR, the image service. A local `astro preview`
 * run with the node adapter knows nothing about any of it, so the specs that
 * cover it skip themselves rather than fail.
 */
const VERCEL_HOSTNAMES = [/\.vercel\.app$/, /(^|\.)forkit\.community$/];

export const isVercelTarget = (baseURL: string | undefined): boolean => {
  if (!baseURL) return false;
  try {
    const { hostname } = new URL(baseURL);
    return VERCEL_HOSTNAMES.some((pattern) => pattern.test(hostname));
  } catch {
    return false;
  }
};
