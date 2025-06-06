import type { APIRoute } from "astro";
import { getEventsCollection } from "@/lib/events";
import { lunalink } from "@bearstudio/lunalink";
import { ROUTES } from "@/routes.gen";
import { getNewsCollection } from "@/lib/news";
import { getPodcastsEpisodesCollection } from "@/lib/podcasts";
import { getCollection } from "astro:content";

const events = await getEventsCollection();
const news = await getNewsCollection();
const podcasts = await getPodcastsEpisodesCollection();
const people = await getCollection("people");

export const GET: APIRoute = async ({ request }) => {
  const prefix = new URL(request.url);

  return new Response(
    `# Fork it! Community ${prefix}

- [Events](${lunalink(ROUTES.events.__path, {})})
- [Podcasts](${lunalink(ROUTES.podcasts.__path, {})})
- [News](${lunalink(ROUTES.news.__path, {})})


## Events

${events
  .map((event) => {
    return `- [${event.data._computed.name}](${lunalink(ROUTES.events[":id.html.md"].__path, { id: event.id })})`;
  })
  .join("\n")}

## Podcasts

${podcasts
  .map((episode) => {
    return `- [${episode.data.title}](${lunalink(ROUTES.podcasts[":id"].episodes[":episode"].__path, { id: episode.id.split("/").at(0) ?? "", episode: episode.id.split("/").at(2) ?? "" })})`;
  })
  .join("\n")}

## News

${news
  .map((article) => {
    return `- [${article.data.title}](${lunalink(ROUTES.news.article[":id"].__path, { id: article.id })})`;
  })
  .join("\n")}

## Members

${people
  .map((person) => {
    return `- [${person.data.name}](${lunalink(ROUTES.people[":id"].__path, { id: person.id })})`;
  })
  .join("\n")}
  `,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
