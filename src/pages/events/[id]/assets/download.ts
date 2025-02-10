import { getEventAssetsSources } from "./_utils";
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

  return new Response(zip.toBuffer(), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${event.data.date.getFullYear()}-${event.data.country.toLowerCase()}-${event.data.city.toLowerCase()}-assets-${dayjs().format("YYYYMMDDHHmmss")}.zip"`,
    },
  });
};
