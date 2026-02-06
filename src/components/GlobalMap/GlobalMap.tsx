"use client";

import { useRef } from "react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
  MapClusterLayer,
} from "@/components/ui/map";
import { cn } from "@/lib/utils-client";
import { MdEvent, MdPeople } from "react-icons/md";
import type { EventsByCities } from "@/lib/events";

type GlobalMapProps = {
  events: EventsByCities;
  className?: string;
};

export function GlobalMap({ events, className }: GlobalMapProps) {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const geoJsonData = {
    type: "FeatureCollection" as const,
    features: Object.entries(events)
      .map(([cityId, cityEvents]) => {
        const city = cityEvents[0]?.data._computed.city?.data;
        if (!city) return null;

        return {
          type: "Feature" as const,
          geometry: {
            type: "Point" as const,
            coordinates: [city.location.lng, city.location.lat] as [
              number,
              number,
            ],
          },
          properties: {
            cityId: cityId,
            cityName: city.name,
            countryName: cityEvents[0].data._computed.country?.data.name ?? "",
            eventCount: cityEvents.length,
            events: cityEvents.map((event) => ({
              id: event.id,
              name: event.data._computed.name,
              type: event.data.type,
              date: event.data.date,
            })),
          },
        };
      })
      .filter(
        (feature): feature is NonNullable<typeof feature> => feature !== null,
      ),
  };
  return (
    <div
      className={cn(
        "relative h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm md:h-[500px]",
        className,
      )}
    >
      <Map
        ref={mapRef}
        center={[10, 30]}
        zoom={2}
        projection={{ type: "globe" }}
        attributionControl={false}
      >
        <MapClusterLayer
          data={geoJsonData}
          clusterRadius={30}
          clusterMaxZoom={14}
          clusterColors={["#EBFF11", "#EBFF11", "#EBFF11"]}
          pointColor="#EBFF11"
        />

        <MapControls
          position="bottom-right"
          showZoom
          showCompass
          showFullscreen
        />
      </Map>
    </div>
  );
}

export default GlobalMap;
