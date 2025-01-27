import { generateOGResponse, getAstroImageBase64 } from "@/og-images/utils";
import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getNewsCollection } from "@/lib/news";
import defaultBackgroundImage from "@/assets/images/news.jpeg";
import { OGNews } from "@/og-images/OGNews";

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
export const endpoint: (isDebug?: boolean | undefined) => APIRoute =
  (isDebug) =>
  async ({ props }) => {
    const { article } = props as Props;

    return generateOGResponse(
      OGNews({
        article,
        background: await getAstroImageBase64(
          article.data.featuredImage ?? defaultBackgroundImage,
        ),
      }),
      { isDebug },
    );
  };

export const GET: APIRoute = endpoint();
