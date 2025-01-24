import { OGPodcast } from "@/og-images/OGPodcast";
import { generateOGResponse, getAstroImageBuffer } from "@/og-images/utils";
import { getPodcastsEpisodesCollection } from "@/lib/podcasts";
import type { APIRoute, InferGetStaticPropsType } from "astro";
import backgroundImage from "@/assets/images/podcasts.jpeg";

export async function getStaticPaths() {
  const episodes = await getPodcastsEpisodesCollection();

  return Promise.all(
    episodes.map(async (e) => {
      const [id = "", _, episode] = e.id.split("/");

      return {
        params: { id, episode },
        props: {
          episode: e,
          number: episode,
        },
      };
    }),
  );
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute = async ({ props }) => {
  const { episode } = props as Props;

  const episodeCover = await getAstroImageBuffer(episode.data.cover);
  const background = await getAstroImageBuffer(backgroundImage);

  return generateOGResponse(
    OGPodcast({
      episode,
      episodeCover,
      background,
    }),
  );
};
