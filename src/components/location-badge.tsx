import { Badge } from "@/components/ui/badge";
import { MapPinIcon } from "lucide-react";
import { ReactNode } from "react";

export const LocationBadge = (props: { children: ReactNode }) => {
  return (
    <Badge variant="outline" className="w-fit">
      <MapPinIcon className="mr-2 h-3 w-3" />
      {props.children}
    </Badge>
  );
};
