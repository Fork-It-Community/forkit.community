import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async function get(context) {
  const people = (await getCollection("people")).sort((a, b) =>
    a.data.name.localeCompare(b.data.name),
  );
  return rss({
    title: "Fork it! Community members",
    description: "People of the growing community since 2024",
    site: context.site!,
    items: people.map((person) => ({
      title: person.data.name,
      description: person.body,
      categories: [person.data.forkit?.role ?? "member"],
    })),
  });
};
