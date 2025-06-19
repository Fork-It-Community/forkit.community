import { type EventComputed } from "@/lib/events";
import { getAppearances } from "@/lib/utils";
import { ROUTES } from "@/routes.gen";
import { lunalink, type ExtractParams } from "@bearstudio/lunalink";
import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { match } from "ts-pattern";

export const GET: APIRoute<
  ExtractParams<(typeof ROUTES.people)[":id"]["__path"]>
> = async ({ params }) => {
  const people = await getCollection("people");
  const person = people.find((p) => p.id === params.id);

  if (!person) {
    return new Response(`Person not found`);
  }

  return new Response(
    `${displayName(person)}

${displayParagraph(person)}
    
${displayDescription(person)}

${displaySocial(person)}

${await displayContribution(person)}`,
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
};

export async function getStaticPaths() {
  const people = await getCollection("people");

  return people.map((person) => ({
    params: { id: person.id },
  }));
}

const displayName = (person: CollectionEntry<"people">) => {
  return `# ${person?.data.name}`;
};

const displayParagraph = (person: CollectionEntry<"people">) => {
  const paragraphCompany = (person: CollectionEntry<"people">) => {
    return `${
      person.data.company?.title ? `at ${person.data.company?.title}` : ""
    }`;
  };

  const paragraphJob = (person: CollectionEntry<"people">) => {
    return `${person.data.job ? `as ${person.data.job}` : ""}`;
  };

  const paragraphForkitRole = (person: CollectionEntry<"people">) => {
    return `${person.data.forkit?.role ? `They also are ${person.data.forkit?.role} of Fork it! Community.` : ""}`;
  };

  if (!person.data.name) return "";

  return `\`\`\`
${person.data.name} is working ${paragraphCompany(
    person,
  )} ${paragraphJob(person)}. ${paragraphForkitRole(person)}
\`\`\``;
};

const displayDescription = (person: CollectionEntry<"people">) => {
  if (!person.body) return "";

  return `## Description 
\`\`\`${person.body}\`\`\``;
};

const displaySocial = (person: CollectionEntry<"people">) => {
  if (!person.data.socials) return "";

  return `## Socials
${person.data.socials
  .map((social) => `- [${social.type}](${social.href})`)
  .join("\n")}`;
};

const displayContribution = async (person: CollectionEntry<"people">) => {
  const contributions = await getAppearances(person, Infinity);
  if (!contributions) return "";

  const contributionList = contributions
    .map((contribution) => {
      const item = match(contribution)
        .with({ collection: "news" }, (item) => ({
          title: item.data.title,
          href: lunalink(ROUTES.news.article[":id"].__path, { id: item.id }),
        }))
        .with({ collection: "episodes" }, (item) => ({
          title: item.data.title,
          href: lunalink(ROUTES.podcasts[":id"].__path, { id: item.id }),
        }))
        .with({ collection: "events" }, (item: EventComputed) => ({
          title: item.data._computed.name,
          href: lunalink(ROUTES.events[":id.html.md"].__path, { id: item.id }),
        }))
        .exhaustive();

      return `- [${item.title}](${item.href})`;
    })
    .join("\n");

  return `## Contributions
${contributionList}`;
};
