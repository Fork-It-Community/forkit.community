import { OGEvent } from "@/components/OpenGraph/OGEvent";
import {
  generateOGResponse,
  getAstroImageBuffer,
} from "@/components/OpenGraph/utils";
import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";

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

  const postCover = await getAstroImageBuffer(event.data.image.src);

  return generateOGResponse(
    OGEvent({ event, site: site?.toString() ?? "", postCover }),
  );
};
