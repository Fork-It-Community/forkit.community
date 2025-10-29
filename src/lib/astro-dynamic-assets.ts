import { astroDynamicAssets } from "@bearstudio/astro-dynamic-assets";

export default astroDynamicAssets({
  site: import.meta.env.SITE,
  fonts: [
    {
      name: "Tomorrow",
      url: "/fonts/tomorrow/Tomorrow-Regular.ttf",
      style: "normal",
      weight: 400,
    },
    {
      name: "Tomorrow",
      url: "/fonts/tomorrow/Tomorrow-Medium.ttf",
      style: "normal",
      weight: 500,
    },
    {
      name: "Tomorrow",
      url: "/fonts/tomorrow/Tomorrow-Bold.ttf",
      style: "normal",
      weight: 700,
    },
  ],
  ssr: import.meta.env.SSR,
});
