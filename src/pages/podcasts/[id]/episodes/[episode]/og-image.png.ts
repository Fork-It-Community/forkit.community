import { OGPodcast } from "@/components/OpenGraph/OGPodcast";
import {
  generateOGResponse,
  getAstroImageBuffer,
} from "@/components/OpenGraph/utils";
import { getPodcastsEpisodesCollection } from "@/lib/podcasts";
import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getEntry } from "astro:content";
import backgroundImage from "@/assets/images/podcasts.jpeg";

export async function getStaticPaths() {
  const episodes = await getPodcastsEpisodesCollection();

  return Promise.all(
    episodes.map(async (e) => {
      const [id = "", _, episode] = e.id.split("/");

      const show = await getEntry<"podcasts", string>({
        collection: "podcasts",
        id,
      });

      return {
        params: { id, episode },
        props: {
          episode: e,
          show,
          number: episode,
        },
      };
    }),
  );
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute = async ({ props, site }) => {
  const { episode, show } = props as Props;

  const episodeCover = await getAstroImageBuffer(episode.data.cover);
  const background = await getAstroImageBuffer(backgroundImage);

  return generateOGResponse(
    OGPodcast({
      episode,
      show,
      site: site?.toString() ?? "",
      episodeCover,
      background,
    }),
  );
};
