import type { zLocation } from "@/schemas/locations";
import { getEventsCollection } from "./events";

const mapLocations = new Map();

export async function getLocationsCollection(): Promise<zLocation[]> {
  await readLocationCollection();

  const locations: zLocation[] = [];

  mapLocations.forEach((value, key) => {
    key = JSON.parse(key);
    const latitude = key[0];
    const longitude = key[1];
    locations.push({
      lat: latitude,
      lng: longitude,
      size: value,
      name: key[2],
      color: "red",
    });
  });

  return locations;
}

async function readLocationCollection() {
  const events = await getEventsCollection();
  return events.map((e) => {
    const latitude = e.data.location?.coordinates?.latitude ?? 0;
    const longitude = e.data.location?.coordinates?.longitude ?? 0;

    const key = JSON.stringify([
      latitude,
      longitude,
      `${e.data.city}, ${e.data.country}`,
    ]);
    if (mapLocations.has(key)) {
      const occurences = mapLocations.get(key) + 0.1;
      mapLocations.set(key, occurences);
    } else {
      mapLocations.set(key, 0.1);
    }
  });
}
