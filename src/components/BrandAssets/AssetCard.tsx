import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils-client";

export const AssetCard = (props: {
  type: "logo" | "icon";
  color: "default" | "black" | "white";
  withBackground?: boolean;
}) => {
  const pathWithoutExt = `/logo-assets/${props.type}${props.withBackground ? "-background" : ""}${props.color !== "default" ? `-${props.color}` : ""}`;
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg",

        !props.withBackground && "bg-white/10",
        props.withBackground && "border border-white/10",
      )}
    >
      <img
        className={cn("w-full overflow-hidden", !props.withBackground && "p-8")}
        src={`${pathWithoutExt}.svg`}
      />
      <div className="flex w-full items-center justify-center gap-2 p-2">
        <Button size="sm" asChild className="flex-1" variant="secondary">
          <a href={`${pathWithoutExt}.svg`} download>
            SVG
          </a>
        </Button>
        <Button size="sm" className="flex-1" variant="secondary">
          <a href={`${pathWithoutExt}.png`} download>
            PNG
          </a>
        </Button>
        {props.withBackground && (
          <Button size="sm" className="flex-1" variant="secondary">
            <a href={`${pathWithoutExt}.jpg`} download>
              JPG
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};
