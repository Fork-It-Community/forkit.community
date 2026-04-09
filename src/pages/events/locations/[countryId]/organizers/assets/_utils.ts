import { NotFoundAssetError } from "@bearstudio/astro-assets-generation";
import { getEntry } from "astro:content";

export const getCountryData = async (id: string) => {
  const country = await getEntry("countries", id);

  if (!country) {
    throw new NotFoundAssetError();
  }

  return country;
};
