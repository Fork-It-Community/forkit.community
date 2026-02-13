import { configure } from "@bearstudio/astro-assets-generation";

configure({
  debugBackground: "#0a0a0a",
  siteUrl: import.meta.env.SITE ?? "http://localhost:4321",
  isDev: import.meta.env.DEV,
  customFonts: [
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
});
