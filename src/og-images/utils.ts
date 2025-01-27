import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import path from "node:path";
import type { ImageMetadata } from "astro";
import { match } from "ts-pattern";

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

export async function JPG(component: JSX.Element) {
  return await sharp(Buffer.from(await SVG(component)))
    .jpeg()
    .toBuffer();
}

export async function generateOGResponse(component: JSX.Element) {
  const jpg = await JPG(component);

  return new Response(jpg, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
}

function getAstroImagePath(image: ImageMetadata) {
  return import.meta.env.DEV
    ? path.resolve(image.src.replace(/\?.*/, "").replace("/@fs", ""))
    : path.resolve(image.src.replace("/", "dist/"));
}

async function getAstroImageBuffer(image: ImageMetadata) {
  const fileExtension = image.src.match(/.(jpg|jpeg|png)$/)?.[0].slice(1);
  const fileToRead = getAstroImagePath(image);
  return {
    buffer: await fs.readFile(fileToRead),
    fileType: match(fileExtension)
      .with("jpg", "jpeg", () => "jpeg")
      .with("png", () => "png")
      .otherwise(() => {
        throw new Error(`Must be a jpg, jpeg or png`);
      }),
  };
}

export async function getAstroImageBase64(image: ImageMetadata) {
  const { buffer, fileType } = await getAstroImageBuffer(image);
  return `data:image/${fileType};charset=utf-8;base64, ${buffer.toString("base64")}`;
}
