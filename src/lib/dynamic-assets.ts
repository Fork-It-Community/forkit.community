import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import path from "node:path";
import type { ImageMetadata, GetStaticPathsOptions, Params } from "astro";
import { match } from "ts-pattern";
import { renderToStaticMarkup } from "react-dom/server";

export const COLORS = {
  primary: "#EBFF11",
  black: "#000000",
  white: "#FFFFFF",
  background: "#171717",
};

const FONTS = [
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
] as const;

type ImageParams = {
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
  return `data:image/${fileType};charset=utf-8;base64, ${buffer.toString("base64")}`;
}

type GetStaticPathItemWithGeneric<Props> = {
  params: {
    [K in keyof Params]: Params[K] | number | undefined;
  };
  props?: Props;
};

type PropsWithDebug<T> = T & { isDebug: boolean };
export function generateImageMethods<Props>(
  params: ImageParams & {
    getStaticPaths: (
      options: GetStaticPathsOptions,
    ) => Promise<Array<GetStaticPathItemWithGeneric<Props>>>;
    render: (
      props: PropsWithDebug<Props>,
    ) => Promise<JSX.Element> | JSX.Element;
  },
) {
  return (p: { __image: string }) => ({
    getStaticPaths: async (options: GetStaticPathsOptions) => {
      return withType({
        entries: await params.getStaticPaths(options),
        params: p,
      });
    },
    GET: async function ({ props }: { props: PropsWithDebug<Props> }) {
      const jsx = await params.render(props);
      return generateImageResponse(jsx, {
        isDebug: props.isDebug,
        width: params.width,
        height: params.height,
        debugScale: params.debugScale,
      });
    },
  });
}

export const TYPES = ["jpg", "debug"];

/**
 *
 * @param entries Provide an array of getStaticPaths item so this function will add the required parameters for the assets
 * @returns An updated array with the value
 */
export async function withType<
  Props,
  T extends GetStaticPathItemWithGeneric<Props>,
>({
  entries,
  params,
}: {
  entries: Array<T>;
  params: { __image: string };
}): Promise<Array<T & { props: { isDebug: boolean } }>> {
  return entries
    .map((entry) => {
      return TYPES.map((type) =>
        type === "debug" && import.meta.env.PROD
          ? undefined
          : {
              ...entry,

              params: {
                ...entry.params,
                __type: type,
                __image: params.__image,
              },

              props: {
                ...entry.props,
                isDebug: type === "debug" && import.meta.env.DEV,
              },
            },
      );
    })
    .flat()
    .filter((i) => !!i);
}

async function apiImageGenerator() {
  // const __filename = fileURLToPath(import.meta.url);
  // const result = await fs.readdir(path.resolve(path.dirname(__filename)));
  // const tsxFiles = result.filter((file) => file.endsWith(".tsx"));
  // const contents = await Promise.all(
  //   tsxFiles.map(async (file) => {
  //     const fileName = file.replace(/\.tsx$/, "").replace(/^_/, "");
  //     const content = await import(`./_${fileName}.tsx`);
  //     return {
  //       methods: content.default({ __image: fileName }),
  //       fileName,
  //     };
  //   }),
  // );
  // // dynamic import pour le rendu et la "collection"
  // // map pour pour générer les routes et composants
  // const getStaticPaths = async (options: GetStaticPathsOptions) => {
  //   return (
  //     await Promise.all(
  //       contents.map(
  //         async (content) => await content.methods.getStaticPaths(options),
  //       ),
  //     )
  //   ).flat(Infinity);
  // };
  //  const GET: APIRoute = (options) => {
  //   const { params } = options;
  //   return contents
  //     .find((content) => content.fileName === params.__image)
  //     ?.methods.GET(options);
  // };
}
