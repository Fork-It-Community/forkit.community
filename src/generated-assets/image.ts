import fs from "fs/promises";
import path from "node:path";
import type { ImageMetadata } from "astro";
import { match } from "ts-pattern";

function getAstroImagePath(image: ImageMetadata) {
  return import.meta.env.DEV
    ? path.resolve(image.src.replace(/\?.*/, "").replace("/@fs", ""))
    : image.src;
}

async function getAstroImageBuffer(image: ImageMetadata) {
  const fileExtension = RegExp(/.(jpg|jpeg|png)$/)
    .exec(image.src)?.[0]
    .slice(1);
  const fileToRead = getAstroImagePath(image);

  return {
    buffer: await match(import.meta.env.DEV || !import.meta.env.SSR)
      .with(true, async () => await fs.readFile(fileToRead))
      .with(false, async () => {
        const res = await fetch(new URL(fileToRead, import.meta.env.SITE));

        if (!res.ok) {
          throw new Error(`Failed to fetch image: ${fileToRead}`);
        }

        return Buffer.from(await res.arrayBuffer());
      })
      .run(),
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

export function getImageNameFromTsxPath(path: string) {
  return path
    .split("/")
    .at(-1)
    ?.replace(/\.tsx$/, "")
    .replace(/^_/, "");
}
