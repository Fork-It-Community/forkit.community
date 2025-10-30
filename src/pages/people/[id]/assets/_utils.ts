import { NotFoundAssetError } from "@bearstudio/astro-dynamic-assets";
import { getEntry, type CollectionEntry } from "astro:content";

export async function getPersonData(id: CollectionEntry<"people">["id"]) {
  const person = await getEntry("people", id);

  if (!person) {
    throw new NotFoundAssetError();
  }

  return person;
}
