import { ROUTES } from "@/routes.gen";
import { type ExtractParams } from "@bearstudio/lunalink";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute<
  {},
  ExtractParams<(typeof ROUTES.people)[":id"]["__path"]>
> = async () => {
  return new Response(`# Member`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

export async function getStaticPaths() {
  const people = await getCollection("people");

  return people.map((person) => ({ params: { id: person.id } }));
}
