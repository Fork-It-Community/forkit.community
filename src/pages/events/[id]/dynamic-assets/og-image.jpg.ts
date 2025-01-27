import { OGEvent } from "@/og-images/OGEvent";
import { generateOGResponse, getAstroImageBase64 } from "@/og-images/utils";
import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const events = await getCollection("events");

  return events.map((event) => {
    return {
      params: { id: event.id },
      props: { event },
    };
  });
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;
export const endpoint: (isDebug?: boolean | undefined) => APIRoute =
  (isDebug) =>
  async ({ props }) => {
    const { event } = props as Props;

    return generateOGResponse(
      OGEvent({
        event,
        postCover: await getAstroImageBase64(event.data.image.src),
      }),
      {
        isDebug,
      },
    );
  };

export const GET: APIRoute = endpoint();
