import type { APIRoute } from "astro";

import {
  DEBUG_HTML,
  JPG,
  SVG,
  generateImageResponseHTML,
  generateImageResponseJPG,
  generateImageResponseSVG,
} from "@/generated-assets/image";

export class NotFoundAssetError extends Error {
  constructor({ cause }: { cause?: unknown } = {}) {
    super("Asset not found");
    this.cause = cause;
    this.name = "NotFoundAssetError";
  }
}

export const apiImageEndpoint: (modules: Record<string, unknown>) => APIRoute =
  (modules) =>
  async ({ params }) => {
    try {
      const files = Object.entries(modules);

      const content = files
        .map(([path, file]) => {
          return {
            fileName: path
              .split("/")
              .at(-1)
              ?.replace(/\.tsx$/, "")
              .replace(/^_/, ""),
            file,
          };
        })
        .find(({ fileName }) => fileName === params.__image)?.file as any;

      const component = await content.default({ params });
      const config = content.config;

      if (params.__type === "debug") {
        const html = await DEBUG_HTML(component, config);
        return generateImageResponseHTML(html);
      }

      if (params.__type === "jpg") {
        const jpg = await JPG(component, config);
        return generateImageResponseJPG(jpg);
      }

      if (params.__type === "svg") {
        const svg = await SVG(component, config);
        return generateImageResponseSVG(svg);
      }

      return new Response(null, {
        status: 404,
        statusText: "Not found",
      });
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundAssetError) {
        return new Response(null, {
          status: 404,
          statusText: error.message,
        });
      }
      return new Response("Failed to generate asset", {
        status: 500,
      });
    }
  };
