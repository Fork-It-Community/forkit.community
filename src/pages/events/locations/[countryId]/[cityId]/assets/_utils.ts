import { NotFoundAssetError } from "@/generated-assets/api";
import { getEntry } from "astro:content";

export const getCityData = async (id: string) => {
  const city = await getEntry("cities", id);

  if (!city) {
    throw new NotFoundAssetError();
  }

  return city;
};

export const getCountryData = async (id: string) => {
  const country = await getEntry("countries", id);

  if (!country) {
    throw new NotFoundAssetError();
  }

  return country;
};
