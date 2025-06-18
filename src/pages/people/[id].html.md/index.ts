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
    
${displayJob(person)}

${displayCompany(person)}

${displaySocial(person)}

${await displayDescription(person)}

${await displayContribution(person)}

${displayForkItRole(person)}`,
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

const displayJob = (person: CollectionEntry<"people">) => {
  if (!person.data.job) return "";

  return `## Job
- ${person?.data.job}`;
};

const displayCompany = (person: CollectionEntry<"people">) => {
  if (!person.data.company?.title) return "";

  return `## Company
- (${person?.data.company?.title})${person?.data.company?.href ? `[${person?.data.company?.href}]` : ""}`;
};

const displaySocial = (person: CollectionEntry<"people">) => {
  if (!person.data.socials) return "";

  return `## Socials
${person.data.socials
  .map((social) => `- [${social.type}](${social.href})`)
  .join("\n")}`;
};

const displayDescription = async (person: CollectionEntry<"people">) => {
  if (!person.body) return "";

  return `## Description
- ${person.body}
`;
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

const displayForkItRole = (person: CollectionEntry<"people">) => {
  if (!person.data.forkit?.role) return "";

  return `## Fork it role
- ${person.data.forkit?.role}`;
};
