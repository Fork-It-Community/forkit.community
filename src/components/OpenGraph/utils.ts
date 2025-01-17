import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";

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

  return await satori(component, {
    width: 1920,
    height: 1080,
    fonts: [
      {
        name: "Tomorrow",
        data: tomorrowData,
        style: "normal",
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
