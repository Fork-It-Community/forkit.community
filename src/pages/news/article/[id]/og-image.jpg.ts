import { OGNews } from "@/og-images/OGNews";
import { generateOGResponse, getAstroImageBase64 } from "@/og-images/utils";
import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getNewsCollection } from "@/lib/news";
import defaultBackgroundImage from "@/assets/images/news.jpeg";

export async function getStaticPaths() {
  const news = await getNewsCollection();

  return Promise.all(
    news.map(async (article) => {
      return {
        params: { id: article.id },
        props: { article },
      };
    }),
  );
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute = async ({ props }) => {
  const { article } = props as Props;

  const background = await getAstroImageBase64(
    article.data.featuredImage ?? defaultBackgroundImage,
  );

  return generateOGResponse(
    OGNews({
      article,
      background,
    }),
  );
};
