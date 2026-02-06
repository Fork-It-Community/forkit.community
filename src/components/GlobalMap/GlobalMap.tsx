"use client";

import { useRef } from "react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
} from "@/components/ui/map";
import { cn } from "@/lib/utils-client";
import { MdEvent, MdPeople } from "react-icons/md";
import type { EventsByCities } from "@/lib/events";
import { lunalink } from "@bearstudio/lunalink";
import { ROUTES } from "@/routes.gen";
import dayjs from "dayjs";

type GlobalMapProps = {
  events: EventsByCities;
  className?: string;
};

export function GlobalMap({ events, className }: GlobalMapProps) {
  const mapRef = useRef<maplibregl.Map | null>(null);

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
        {Object.entries(events).map(([cityId, events]) => {
          if (!events[0] || !events[0].data._computed.city) return;
          return (
            <MapMarker
              key={cityId}
              longitude={events[0].data._computed.city.data.location.lng}
              latitude={events[0].data._computed.city.data.location.lat}
            >
              <MarkerContent>
                <div className="relative flex size-6 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-primary shadow-lg transition-transform hover:scale-110">
                  <span className="text-xs font-bold text-primary-foreground">
                    {events.length}
                  </span>
                </div>
              </MarkerContent>
              {/* ffff */}
              <MarkerPopup className="bg min-w-[200px] p-0" closeButton>
                <div className="max-h-[300px] overflow-y-auto">
                  {events.map((event) => (
                    <a
                      key={event.id}
                      href={lunalink(ROUTES.events[":id"].__path, {
                        id: event.id,
                      })}
                      className="block border-b border-white/5 p-3 transition-colors last:border-b-0 hover:bg-white/5"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg",
                            event.data.type === "event"
                              ? "bg-blue-500/20"
                              : "bg-purple-500/20",
                          )}
                        >
                          {event.data.type === "event" ? (
                            <MdEvent
                              className={cn(
                                "h-4 w-4",
                                event.data.type === "event"
                                  ? "text-blue-400"
                                  : "text-purple-400",
                              )}
                            />
                          ) : (
                            <MdPeople className="text-purple-400 h-4 w-4" />
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-heading text-sm font-medium">
                            {event.data._computed.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {event.data._computed.city?.data.name},{" "}
                            {event.data._computed.country?.data.name}
                          </span>
                          <span className="text-xs text-primary">
                            {dayjs(event.data.date).format("DD MMM, YYYY")}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </MarkerPopup>
            </MapMarker>
          );
        })}

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
