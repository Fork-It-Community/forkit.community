import { apiImageEndpoint } from "@bearstudio/astro-assets-generation";
import { getTalkAssetDownloadFileName } from "./_utils";
import type { APIRoute } from "astro";

export const prerender = false;

const baseEndpoint = apiImageEndpoint(
  import.meta.glob("./_*.tsx", { eager: true }),
);

export const GET: APIRoute = async (context) => {
  const response = await baseEndpoint(context);

  if (!response.ok || context.params.__type !== "jpg") {
    return response;
  }

  const fileName = await getTalkAssetDownloadFileName(
    context.params.id!,
    context.params.talkId!,
    context.params.__image!,
  );

  const headers = new Headers(response.headers);
  headers.set("Content-Disposition", `inline; filename="${fileName}"`);

  return new Response(response.body, { status: response.status, headers });
};
