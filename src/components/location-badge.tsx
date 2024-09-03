import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon } from "lucide-react";

export const LocationBadge = (props: { children: ReactNode }) => {
  return (
    <Badge variant="outline" className="w-fit">
      <MapPinIcon className="mr-2 h-3 w-3" />
      {props.children}
    </Badge>
  );
};
