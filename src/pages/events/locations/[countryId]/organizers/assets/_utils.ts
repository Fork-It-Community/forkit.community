import { NotFoundAssetError } from "@/generated-assets/api";
import { getEntry } from "astro:content";

export const getCountryData = async (id: string) => {
  const country = await getEntry("countries", id);

  if (!country) {
    throw new NotFoundAssetError();
  }

  return country;
};
