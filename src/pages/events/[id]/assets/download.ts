import { getEventAssetsSources, getGroupedAssets } from "./_utils";
import { DOWNLOAD_EXCLUDED_CATEGORIES } from "@/assets/consts";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import dayjs from "dayjs";
import AdmZip from "adm-zip";
import { eventWithComputed } from "@/lib/events";

export const prerender = false;

export const GET: APIRoute = async ({ params, site }) => {
  const eventEntry = await getEntry("events", params.id!);
  if (!eventEntry) {
    return new Response("", { status: 404 });
  }

  const event = await eventWithComputed(eventEntry);

  const zip = new AdmZip();
  const imagesSrc = getGroupedAssets(
    getEventAssetsSources(event),
    event.data.type,
    DOWNLOAD_EXCLUDED_CATEGORIES,
  ).flatMap((group) => group.images);

  await Promise.all(
    imagesSrc.map(async (src) => {
      const url = new URL(src, site).toString();
      const response = await fetch(url);
      if (!response.ok) {
        // Ignore not generated images
        return;
      }
      const blob = await response.blob();
      zip.addFile(
        `${src.replaceAll("/events/", "").replaceAll("/assets", "").replaceAll("/", "_")}`,
        Buffer.from(await blob.arrayBuffer()),
      );
    }),
  );

  return new Response(new Uint8Array(zip.toBuffer()), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${event.data.date.getFullYear()}-${event.data._computed.country?.id}-${event.data.city.id}-assets-${dayjs().format("YYYYMMDDHHmmss")}.zip"`,
    },
  });
};
