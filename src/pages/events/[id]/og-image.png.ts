import { OGEvent } from "@/components/OpenGraph/OGEvent";
import { generateOGResponse } from "@/components/OpenGraph/utils";
import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";
import fs from "node:fs";
import path from "node:path";

export async function getStaticPaths() {
  const events = await getCollection("events");

  return events.map((event) => ({
    params: { id: event.id },
    props: { event },
  }));
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute = async ({ props, site }) => {
  const { event } = props as Props;

  const postCover = event.data.image
    ? fs.readFileSync(
        import.meta.env.DEV
          ? path.resolve(
              event.data.image.src.src.replace(/\?.*/, "").replace("/@fs", ""),
            )
          : path.resolve(event.data.image.src.src.replace("/", "dist/")),
      )
    : undefined;

  return generateOGResponse(
    OGEvent({ event, site: site?.toString() ?? "", postCover }),
  );
};
