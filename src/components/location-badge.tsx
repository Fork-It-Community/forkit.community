import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon } from "lucide-react";

export const LocationBadge = (props: { children: ReactNode }) => {
  return (
    <Badge
      variant="ghost"
      className="flex w-full justify-end text-sm text-neutral-400"
    >
      <MapPinIcon className="mr-2 h-3 w-3" />
      {props.children}
    </Badge>
  );
};
