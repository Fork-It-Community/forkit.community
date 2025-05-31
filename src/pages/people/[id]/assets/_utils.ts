import { NotFoundAssetError } from "@/generated-assets/api";
import { getEntry, type CollectionEntry } from "astro:content";

export async function getPersonData(id: CollectionEntry<"people">["id"]) {
  const person = await getEntry("people", id);

  if (!person) {
    throw new NotFoundAssetError();
  }

  return person;
}
