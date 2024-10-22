import { cn } from "@/lib/utils";
import { ICONS } from "./icons";

const MapLocation = (
  props: Readonly<{
    detail: {
      title: string;
      description?: string;
    };
    hideIcon?: boolean;
    mapUri: string;
    className?: string;
  }>,
) => {
  const { hideIcon = false, mapUri, className } = props;
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="flex flex-col">
        <div className="flex gap-1">
          {!hideIcon && <div className="pt-2">{ICONS.pin}</div>}
          <p className="my-0">{props.detail.title}</p>
        </div>
        {props.detail.description && (
          <p className="my-0 text-neutral-400">{props.detail.description}</p>
        )}
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
