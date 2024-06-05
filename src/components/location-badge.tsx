import { Badge } from "@/components/ui/badge";
import { Event } from "@/content/collections";
import { MapPinIcon } from "lucide-react";

export const LocationBadge = (
  props: Pick<Event["schedule"][number], "location">,
) => {
  return (
    <Badge variant="outline" className="w-fit">
      <MapPinIcon className="mr-2 h-4 w-4" />
      {props.location}
    </Badge>
  );
};
