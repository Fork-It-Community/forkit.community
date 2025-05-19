import { getEventsCollection } from "./events";

export async function getLocationsCollection() {
  const events = await getEventsCollection();

  return events.map((e) => {
    const latitude = e.data.location?.coordinates?.latitude ?? 0;
    const longitude = e.data.location?.coordinates?.longitude ?? 0;

    return {
      lat: latitude,
      lng: longitude,
      size: 0.1,
      color: "red",
    };
  });
}
