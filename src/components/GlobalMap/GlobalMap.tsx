"use client";

import { useRef, useState } from "react";
import dayjs from "dayjs";
import {
  Map,
  MapControls,
  MapClusterLayer,
  MapPopup,
} from "@/components/ui/map";
import { cn } from "@/lib/utils-client";
import type { EventsByCities } from "@/lib/events";
import { lunalink } from "@bearstudio/lunalink";
import { ROUTES } from "@/routes.gen";

type GlobalMapProps = {
  events: EventsByCities;
  className?: string;
};

type PopupInfo = {
  cityName: string;
  countryName: string;
  events: {
    id: string;
    name: string;
    type: string;
    date: string;
  }[];
  coordinates: [number, number];
};

export function GlobalMap({ events, className }: GlobalMapProps) {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [selectedCity, setSelectedCity] = useState<PopupInfo | null>(null);

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
            events: JSON.stringify(
              cityEvents.map((event) => ({
                id: event.id,
                name: event.data._computed.name,
                type: event.data.type,
                date: event.data.date,
              })),
            ),
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
          onPointClick={(feature, coordinates) => {
            const properties = feature.properties;
            const cityEvents =
              typeof properties?.events === "string"
                ? JSON.parse(properties.events)
                : properties?.events;

            setSelectedCity({
              cityName: properties?.cityName,
              countryName: properties?.countryName,
              events: cityEvents,
              coordinates: coordinates,
            });
          }}
        />

        {selectedCity && (
          <MapPopup
            longitude={selectedCity.coordinates[0]}
            latitude={selectedCity.coordinates[1]}
            onClose={() => setSelectedCity(null)}
            closeButton
            className="z-20 min-w-[200px] border-white/10 bg-black/80 bg-none backdrop-blur-md"
          >
            <div className="flex flex-col gap-2">
              <div className="border-b border-white/10 pb-2">
                <h3 className="font-bold text-white">
                  {selectedCity.cityName}, {selectedCity.countryName}
                </h3>
              </div>
              <div className="flex max-h-[160px] flex-col gap-1 overflow-y-auto pr-1">
                {selectedCity.events.map((event) => (
                  <a
                    key={event.id}
                    href={lunalink(ROUTES.events[":id"].__path, {
                      id: event.id,
                    })}
                    className="group flex flex-col rounded-md p-1.5 transition-colors hover:bg-white/5"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-medium text-white group-hover:text-[#EBFF11]">
                        {event.name}
                      </span>
                      <span className="shrink-0 text-[10px] text-white/40">
                        {dayjs(event.date).format("DD MMM YYYY")}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </MapPopup>
        )}

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
