import { OGPodcast } from "@/components/OpenGraph/OGPodcast";
import { generateOGResponse } from "@/components/OpenGraph/utils";
import { getPodcastsEpisodesCollection } from "@/lib/podcasts";
import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getEntry } from "astro:content";
import fs from "node:fs";
import path from "node:path";
import { match, P } from "ts-pattern";
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

  const episodeCover = match(episode.data.cover)
    .with(P.not(P.nullish), (image) => {
      const fileToRead = import.meta.env.DEV
        ? path.resolve(image.src.replace(/\?.*/, "").replace("/@fs", ""))
        : path.resolve(image.src.replace("/", "dist/"));

      return fs.readFileSync(fileToRead);
    })
    .otherwise(() => undefined);

  const background = fs.readFileSync(
    import.meta.env.DEV
      ? path.resolve(
          backgroundImage.src.replace(/\?.*/, "").replace("/@fs", ""),
        )
      : path.resolve(backgroundImage.src.replace("/", "dist/")),
  );

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
