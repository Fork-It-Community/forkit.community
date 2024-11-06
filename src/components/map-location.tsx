import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

const MapLocation = (
  props: Readonly<{
    detail: {
      title: string;
      description?: string;
    };
    mapUri: string;
    className?: string;
  }>,
) => {
  const { mapUri, className } = props;
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex gap-1">
        <div className="pt-2">
          <MapPin className="h-3.5 w-3.5" />
        </div>
        <div className="flex flex-col">
          <p className="my-0">{props.detail.title}</p>
          {props.detail.description && (
            <p className="my-0 text-neutral-400">{props.detail.description}</p>
          )}
        </div>
      </div>
      <Map mapUri={mapUri} className={String(className)} />
    </div>
  );
};

const Map = (
  props: Readonly<{
    mapUri: string;
    className?: string;
  }>,
) => {
  return (
    <iframe
      src={props.mapUri}
      style={{ border: "1px solid black" }}
      className={cn("h-43 w-full rounded-lg", props.className)}
    />
  );
};

export { MapLocation, Map };
