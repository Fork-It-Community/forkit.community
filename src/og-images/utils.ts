import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import path from "node:path";
import type { ImageMetadata } from "astro";

export const COLORS = {
  primary: "#EBFF11",
  black: "#000000",
  white: "#FFFFFF",
  background: "#171717",
};

export async function SVG(component: JSX.Element) {
  const tomorrowData = await fs.readFile(
    "./public/fonts/tomorrow/Tomorrow-Regular.ttf",
  );
  const tomorrowBoldData = await fs.readFile(
    "./public/fonts/tomorrow/Tomorrow-Bold.ttf",
  );
  const tomorrowMediumData = await fs.readFile(
    "./public/fonts/tomorrow/Tomorrow-Medium.ttf",
  );

  return await satori(component, {
    width: 1920,
    height: 1080,
    fonts: [
      {
        name: "Tomorrow",
        data: tomorrowData,
        style: "normal",
        weight: 400,
      },
      {
        name: "Tomorrow",
        data: tomorrowMediumData,
        style: "normal",
        weight: 500,
      },
      {
        name: "Tomorrow",
        data: tomorrowBoldData,
        style: "normal",
        weight: 700,
      },
    ],
  });
}

export async function PNG(component: JSX.Element) {
  return await sharp(Buffer.from(await SVG(component)))
    .png()
    .toBuffer();
}

export async function generateOGResponse(component: JSX.Element) {
  const png = await PNG(component);

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}

export async function getAstroImageBuffer(image: ImageMetadata) {
  const fileToRead = import.meta.env.DEV
    ? path.resolve(image.src.replace(/\?.*/, "").replace("/@fs", ""))
    : path.resolve(image.src.replace("/", "dist/"));

  return await fs.readFile(fileToRead);
}
