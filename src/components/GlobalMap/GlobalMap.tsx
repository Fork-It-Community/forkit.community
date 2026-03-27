"use client";

import { useState } from "react";
import dayjs from "dayjs";
import {
  Map,
  MapControls,
  MapClusterLayer,
  MapPopup,
} from "@/components/ui/map";
import { cn } from "@/lib/utils-client";
import type { CitiesGeoJson } from "@/lib/events";
import { lunalink } from "@bearstudio/lunalink";
import { ROUTES } from "@/routes.gen";
import { Result } from "better-result";

type GlobalMapProps = {
  citiesGeoJson: CitiesGeoJson;
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

export function GlobalMap({
  citiesGeoJson: { geoJsonData, totalEvents },
  className,
}: GlobalMapProps) {
  const [selectedCity, setSelectedCity] = useState<PopupInfo | null>(null);

  return (
    <div
      className={cn(
        "relative h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm md:h-[500px]",
        className,
      )}
    >
      <Map center={[10, 30]} zoom={2} projection={{ type: "globe" }}>
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
            className="z-20 min-w-[200px] border-white/10 bg-black/90"
          >
            <div className="flex flex-col gap-2">
              <div className="border-b border-white/10 pb-2">
                <p className="font-heading text-2xs uppercase tracking-widest text-white/60">
                  {selectedCity.countryName}
                </p>
                <h3 className="font-heading font-medium uppercase tracking-widest text-white">
                  {selectedCity.cityName}
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
                          isMeetup ? "bg-white/60" : "bg-primary",
                        )}
                      />
                      <span className="truncate font-heading font-medium text-white transition group-hover:text-primary">
                        {event.name}
                      </span>
                      {!isPast && (
                        <span className="shrink-0 font-heading text-2xs uppercase tracking-widest text-primary">
                          Soon
                        </span>
                      )}
                      <span className="ml-auto shrink-0 font-heading text-xs text-white/40">
                        {dayjs(event.date).format("DD MMM YY")}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </MapPopup>
        )}

        <MapControls position="bottom-right" showZoom />
        <div className="absolute bottom-4 left-4 flex flex-col gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-medium text-white">
              {totalEvents} Total Events
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm text-white">Event</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              <span className="text-sm text-white">Meetup</span>
            </div>
          </div>
        </div>
        <div className="absolute left-4 top-4 hidden rounded-lg border-2 bg-black px-4 py-2 md:block">
          <span className="text-sm font-medium text-white/80">
            🌍 Drag to explore
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-1 right-2">
          <span className="text-[10px] text-white/40">
            © OpenFreeMap © OpenStreetMap contributors
          </span>
        </div>
      </Map>
    </div>
  );
}

export default GlobalMap;
