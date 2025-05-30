import { LuMapPin } from "react-icons/lu";

import { cn } from "@/lib/utils-client";

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
          <LuMapPin className="h-3.5 w-3.5" />
        </div>
        <div className="flex flex-col">
          <p className="my-0">{props.detail.title}</p>
          {props.detail.description && (
            <p className="text-neutral-400 my-0">{props.detail.description}</p>
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
