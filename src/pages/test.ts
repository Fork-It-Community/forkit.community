import { generateImageResponseJPG, JPG } from "@/generated-assets/image";
import type { APIRoute } from "astro";
import render from "./_test";

export const prerender = false;

export const GET: APIRoute = async () => {
  const jpg = await JPG(await render(), { width: 100, height: 100 });
  return generateImageResponseJPG(jpg);
};
