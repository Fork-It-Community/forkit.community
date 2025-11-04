import type { ROUTES } from "@/routes.gen";
import type { ExtractParams } from "@bearstudio/lunalink";
import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { mdxToPlainText } from "@/lib/markdown-clean";

export const GET: APIRoute<
  ExtractParams<(typeof ROUTES.news)[":page"]["__path"]>
> = async ({ params }) => {
  const news = await getCollection("news");
  const article = news.find((article) => article.id === params.id);

  if (!article) {
    return new Response("Article not found", { status: 404 });
  }

  return new Response(
    `${getArticleTitle(article)}\n\n${await getContent(article)}`,
    {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    },
  );
};

export async function getStaticPaths() {
  const news = await getCollection("news");
  return news.map((article) => ({ params: { id: article.id } }));
}

export const getArticleTitle = (article: CollectionEntry<"news">) => {
  return `# ${article.data.title}`;
};

export const getContent = async (article: CollectionEntry<"news">) => {
  const response = await mdxToPlainText(article.body ?? "");

  return response.text;
};
