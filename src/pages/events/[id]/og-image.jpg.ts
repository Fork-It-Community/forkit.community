import { OGEvent } from "@/og-images/OGEvent";
import { generateOGResponse, getAstroImageBase64 } from "@/og-images/utils";
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

export const GET: APIRoute = async ({ props }) => {
  const { event } = props as Props;

  const postCover = await getAstroImageBase64(event.data.image.src);
  return generateOGResponse(OGEvent({ event, postCover }));
};
