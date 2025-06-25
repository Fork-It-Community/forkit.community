import { z } from "astro:schema";

export const logos = [
  {
    label: "Yellow",
    bg: "bg-black",
    image: "/brand-assets/png/logo.png",
    variants: [
      { type: "svg", url: "/brand-assets/svg/logo.svg" },
      { type: "png", url: "/brand-assets/png/logo.png" },
    ],
  },
  {
    label: "Black",
    bg: "bg-gray-100",
    image: "/brand-assets/png/logo-black.png",

    variants: [
      {
        type: "svg",
        url: "/brand-assets/svg/logo-black.svg",
      },
      {
        type: "png",
        url: "/brand-assets/png/logo-black.png",
      },
    ],
  },
  {
    label: "black",
    bg: "bg-gray-100",
    image: "/brand-assets/png/logo-vertical-black.png",
    variants: [
      {
        type: "svg",
        url: "/brand-assets/svg/logo-vertical-black.svg",
      },
      {
        type: "png",
        url: "/brand-assets/png/logo-vertical-black.png",
      },
    ],
  },
];
export const icons = [
  {
    label: "black",
    image: "/brand-assets/png/icon/black.png",
    bg: "bg-gray-100",
    variants: [
      { type: "svg", url: "/brand-assets/svg/icon/black.svg" },
      { type: "png", url: "/brand-assets/png/icon/black.png" },
    ],
  },
  {
    label: "lead",
    image: "/brand-assets/png/icon/lead.png",
    bg: "bg-black",

    variants: [
      { type: "svg", url: "/brand-assets/svg/icon/lead.svg" },
      { type: "png", url: "/brand-assets/png/icon/lead.png" },
    ],
  },
  {
    label: "white",
    image: "/brand-assets/png/icon/white.png",
    bg: "bg-black",

    variants: [
      { type: "svg", url: "/brand-assets/svg/icon/white.svg" },
      { type: "png", url: "/brand-assets/png/icon/white.png" },
    ],
  },
];
const AssetSchema = z.object({
  label: z.string(),
  bg: z.string(),
  image: z.string(),
  variants: z.array(
    z.object({
      type: z.string(),
      url: z.string(),
    }),
  ),
});
export type Asset = z.infer<typeof AssetSchema>;
