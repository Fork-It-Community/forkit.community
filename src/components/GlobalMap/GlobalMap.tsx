"use client";

import { useMemo, useRef, useState } from "react";
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
import { Result } from "better-result";

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

  const { geoJsonData, totalEvents } = useMemo(() => {
    const features = Object.entries(events)
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
      .filter((feature) => !!feature);

    return {
      geoJsonData: { type: "FeatureCollection" as const, features },
      totalEvents: features.reduce(
        (sum, f) => sum + f.properties.eventCount,
        0,
      ),
    };
  }, [events]);
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
      >
        <MapClusterLayer
          data={geoJsonData}
          clusterRadius={30}
          clusterMaxZoom={14}
          clusterColors={["#EBFF11", "#EBFF11", "#EBFF11"]}
          pointColor="#EBFF11"
          onPointClick={(feature, coordinates) => {
            const properties = feature.properties;
            const parsed = Result.try(() => JSON.parse(properties.events));
            if (parsed.isErr()) return;

            setSelectedCity({
              cityName: properties?.cityName,
              countryName: properties?.countryName,
              events: parsed.value,
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
                {selectedCity.events.map((event) => {
                  const isPast = dayjs(event.date).isBefore(dayjs(), "day");
                  const isMeetup = event.type === "meetup";
                  return (
                    <a
                      key={event.id}
                      href={lunalink(ROUTES.events[":id"].__path, {
                        id: event.id,
                      })}
                      className="group flex items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-white/5"
                    >
                      <div
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full",
                          isMeetup ? "bg-white/60" : "bg-[#EBFF11]",
                        )}
                      />
                      <span className="truncate text-sm font-medium text-white group-hover:text-[#EBFF11]">
                        {event.name}
                      </span>
                      {!isPast && (
                        <span className="shrink-0 rounded-full bg-[#EBFF11] px-1.5 py-0.5 text-[10px] font-semibold text-black">
                          Upcoming
                        </span>
                      )}
                      <span className="ml-auto shrink-0 text-[10px] text-white/40">
                        {dayjs(event.date).format("DD MMM YYYY")}
                      </span>
                    </a>
                  );
                })}
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
        <div className="absolute bottom-4 left-4 flex flex-col gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-medium text-white">
              {totalEvents} Total Events
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#EBFF11]" />
              <span className="text-sm text-white">Event</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              <span className="text-sm text-white">Meetup</span>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-lg border-2 bg-black px-4 py-2">
          <span className="text-sm font-medium text-white/80">
            🌍 Drag to explore
          </span>
        </div>
      </Map>
    </div>
  );
}

export default GlobalMap;
