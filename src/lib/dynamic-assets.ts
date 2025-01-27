import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import path from "node:path";
import type { ImageMetadata } from "astro";
import { match } from "ts-pattern";
import { renderToStaticMarkup } from "react-dom/server";

export const COLORS = {
  primary: "#EBFF11",
  black: "#000000",
  white: "#FFFFFF",
  background: "#171717",
};

type ImageParams = {
  width: number;
  height: number;
  debugScale?: number | undefined;
};

export async function SVG(
  component: JSX.Element,
  params: { width: number; height: number },
) {
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
    width: params.width,
    height: params.height,
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

export async function JPG(component: JSX.Element, params: ImageParams) {
  return await sharp(Buffer.from(await SVG(component, params)))
    .jpeg()
    .toBuffer();
}

export async function generateImageResponseJpg(
  component: JSX.Element,
  params: ImageParams,
) {
  const jpg = await JPG(component, params);

  return new Response(jpg, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
}

export async function generateImageResponseDebug(
  component: JSX.Element,
  params: ImageParams,
) {
  return new Response(
    `<!DOCTYPE html>
      <html>
        <head>
          <title>Debug</title>
          <style>
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
              background: red;
            }

          </style>
        </head>
        <body>
          <div id="screen">
            <div id="render">
              ${renderToStaticMarkup(component)}
            </div>
          </div>
        </body>
      </html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    },
  );
}

export async function generateImageResponse(
  component: JSX.Element,
  params: {
    isDebug?: boolean | undefined;
  } & ImageParams,
) {
  if (params.isDebug) {
    return generateImageResponseDebug(component, params);
  }

  return generateImageResponseJpg(component, params);
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

import type { GetStaticPathsOptions, Params } from "astro";

export function generateImageMethods<Props>(
  params: ImageParams & {
    getStaticPaths: (options: GetStaticPathsOptions) => Promise<
      Array<{
        params: {
          [K in keyof Params]: Params[K] | number;
        };
        props?: Props;
      }>
    >;
    render: (props: Props) => Promise<JSX.Element> | JSX.Element;
  },
) {
  return ({ isDebug }: { isDebug?: boolean | undefined } = {}) => ({
    getStaticPaths:
      isDebug && import.meta.env.PROD ? () => [] : params.getStaticPaths,
    GET: async function ({ props }: { props: Props }) {
      const jsx = await params.render(props);
      return generateImageResponse(jsx, {
        isDebug: isDebug,
        width: params.width,
        height: params.height,
        debugScale: params.debugScale,
      });
    },
  });
}
