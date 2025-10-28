import { astroDynamicAssets } from "@bearstudio/astro-dynamic-assets";

export const dynamicAssets = astroDynamicAssets({
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
  theme: {
    primary: "#EBFF11",
    black: "#000000",
    white: "#FFFFFF",
    background: "#171717",
  },
});
