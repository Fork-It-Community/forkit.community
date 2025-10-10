import type { ROUTES } from "@/routes.gen";

import type { ExtractParams } from "@bearstudio/lunalink";
import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

export const GET: APIRoute<
  ExtractParams<(typeof ROUTES.news)[":page"]["__path"]>
> = async ({ params }) => {
  const news = await getCollection("news");
  const article = news.find((article) => article.id === params.id);

  if (!article) {
    return new Response(`Article not found`);
  }

  return new Response(
    `${getArticleTitle(article)} 
    \n${getArticleContent(article)}`,
  );
};
export async function getStaticPaths() {
  const news = await getCollection("news");

  return news.map((article) => ({
    params: { id: article.id },
  }));
}

export const getArticleTitle = (article: CollectionEntry<"news">) => {
  return `# ${article.data.title}`;
};

export const getArticleContent = (article: CollectionEntry<"news">) => {
  if (!article.body) return;

  return `${stripMdxContent(article.body)}`;
};

export function stripMdxContent(input: string) {
  let output = input;

  // Remove import / export
  output = output.replace(/^\s*(?:import|export)\b.*$/gm, "");

  // Remove components
  output = output.replace(/<([A-Z][\w.]*)\b[^>]*>[\s\S]*?<\/\1>/g, "");

  // Clean line break
  output = output
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return output;
}
