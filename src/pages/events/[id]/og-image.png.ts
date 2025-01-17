import { OGEvent } from "@/components/OpenGraph/OGEvent";
import { generateOGResponse } from "@/components/OpenGraph/utils";
import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";
import fs from "node:fs";
import path from "node:path";
import { match, P } from "ts-pattern";

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

  const postCover = match(event.data.image)
    .with(P.not(P.nullish), (image) => {
      const fileToRead = import.meta.env.DEV
        ? path.resolve(image.src.src.replace(/\?.*/, "").replace("/@fs", ""))
        : path.resolve(image.src.src.replace("/", "dist/"));

      return fs.readFileSync(fileToRead);
    })
    .otherwise(() => undefined);

  return generateOGResponse(
    OGEvent({ event, site: site?.toString() ?? "", postCover }),
  );
};
