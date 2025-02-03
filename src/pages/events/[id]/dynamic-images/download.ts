import { getEventAssetsSources } from "@/pages/events/[id]/dynamic-images/_utils";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import dayjs from "dayjs";
import AdmZip from "adm-zip";

export const prerender = false;

export const GET: APIRoute = async ({ params, site }) => {
  const event = await getEntry("events", params.id!);
  if (!event) {
    return new Response("", { status: 404 });
  }

  const zip = new AdmZip();
  const imagesSrc = getEventAssetsSources(event);

  await Promise.all(
    imagesSrc.map(async (src) => {
      const url = new URL(src, site).toString();
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch image at ${src}`);
      }
      const blob = await response.blob();
      zip.addFile(
        src.split("/").at(-1)!, // Clean me
        Buffer.from(await blob.arrayBuffer()),
      );
    }),
  );

  return new Response(zip.toBuffer(), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="event-assets-${dayjs().format("YYYYMMDDHHmmss")}.zip"`,
    },
  });
};
