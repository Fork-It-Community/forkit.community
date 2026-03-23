import { getEventAssetsSources } from "./_utils";
import { getTalkAssetDownloadFileName } from "../talks/[talkId]/assets/_utils";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import dayjs from "dayjs";
import AdmZip from "adm-zip";
import { eventWithComputed } from "@/lib/events";

const getZipFileName = async (src: string) => {
  const parts = src.split("/");

  // If the asset is a talk, format the filename to have speaker name
  const talksIndex = parts.indexOf("talks");
  if (talksIndex !== -1) {
    const talkId = parts[talksIndex + 1]!;
    const assetName = parts.at(-1)!.replace(/\.jpg$/i, "");
    return getTalkAssetDownloadFileName(talkId, assetName);
  }

  return src
    .replaceAll("/events/", "")
    .replaceAll("/assets", "")
    .replaceAll("/", "_");
};

export const prerender = false;

export const GET: APIRoute = async ({ params, site }) => {
  const eventEntry = await getEntry("events", params.id!);
  if (!eventEntry) {
    return new Response("", { status: 404 });
  }

  const event = await eventWithComputed(eventEntry);

  const zip = new AdmZip();
  const imagesSrc = getEventAssetsSources(event);

  await Promise.all(
    imagesSrc.map(async (src) => {
      const url = new URL(src, site).toString();
      const response = await fetch(url);
      if (!response.ok) {
        // Ignore not generated images
        return;
      }
      const blob = await response.blob();

      const fileName = await getZipFileName(src);
      zip.addFile(fileName, Buffer.from(await blob.arrayBuffer()));
    }),
  );

  return new Response(new Uint8Array(zip.toBuffer()), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${event.data.date.getFullYear()}-${event.data._computed.country?.id}-${event.data.city.id}-assets-${dayjs().format("YYYYMMDDHHmmss")}.zip"`,
    },
  });
};
