import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ImageMetadata } from "astro";
import { match } from "ts-pattern";
import { renderToStaticMarkup } from "react-dom/server";

import { COLORS, FONTS } from "./theme";

export type AssetImageConfig = {
  width: number;
  height: number;
  debugScale?: number | undefined;
};

export async function SVG(
  component: JSX.Element,
  params: { width: number; height: number },
) {
  const fonts = await Promise.all(
    FONTS.map(async ({ url, ...font }) => ({
      ...font,
      data: await fs.readFile(`./public/${url}`),
    })),
  );

  return await satori(component, {
    width: params.width,
    height: params.height,
    fonts,
  });
}

export async function JPG(component: JSX.Element, params: AssetImageConfig) {
  return await sharp(Buffer.from(await SVG(component, params)))
    .jpeg()
    .toBuffer();
}

export async function DEBUG_HTML(
  component: JSX.Element,
  params: AssetImageConfig,
) {
  const html = renderToStaticMarkup(component);
  return `<!DOCTYPE html>
      <html>
        <head>
          <title>Debug</title>
          <style>
          ${FONTS.map(
            (font) => `
              @font-face {
                font-family: ${font.name};
                font-style: ${font.style};
                font-weight: ${font.weight};
                src: url("${font.url}") format("truetype");
              }
            `,
          ).join(" ")}
            :root {
              --width: ${params.width}px;
              --height: ${params.height}px;
              --scale: ${params.debugScale ?? 0.4};
            }
            body {
              background: ${COLORS.background} url('/debug.png') repeat;
              margin: 0;
              width: 100vw;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              min-width: calc(var(--width)*var(--scale));
              min-height: calc(var(--height)*var(--scale));
            }
            #screen {
              width: calc(var(--width)*var(--scale));
              height: calc(var(--height)*var(--scale));
              overflow: hidden;
            }
            #render {
              width: var(--width);
              height: var(--height);
              flex: none;
              transform: scale(var(--scale));
              transform-origin: top left;
              background: black;
            }

          </style>
        </head>
        <body>
          <div id="screen">
            <div id="render">
              ${html}
            </div>
          </div>
        </body>
      </html>`;
}

export async function generateImageResponseJPG(jpg: Buffer) {
  return new Response(jpg, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
}

export async function generateImageResponseHTML(html: string) {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

// src/lib
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nextJsRootDir = path.resolve(__dirname, "../../");

export function resolve(importMetaUrl: string, ...paths: string[]) {
  const dirname = path.dirname(fileURLToPath(importMetaUrl));
  const absPath = path.resolve(dirname, ...paths);
  // Required for ISR serverless functions to pick up the file path
  // as a dependency to bundle.
  return path.resolve(process.cwd(), absPath.replace(nextJsRootDir, "."));
}

function getAstroImagePath(image: ImageMetadata) {
  console.log(import.meta.url, image.src);
  return import.meta.env.DEV
    ? resolve(
        import.meta.url,
        image.src.replace(/\?.*/, "").replace("/@fs", ""),
      )
    : resolve(import.meta.url, image.src);
}

async function getAstroImageBuffer(image: ImageMetadata) {
  const fileExtension = RegExp(/.(jpg|jpeg|png)$/)
    .exec(image.src)?.[0]
    .slice(1);
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
  return imageBufferToBase64(buffer, fileType);
}

export function imageBufferToBase64(buffer: Buffer, fileType: string) {
  return `data:image/${fileType};base64, ${buffer.toString("base64")}`;
}
