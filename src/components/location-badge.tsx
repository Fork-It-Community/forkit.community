import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { LuMapPin } from "react-icons/lu";

export const LocationBadge = (props: { children: ReactNode }) => {
  return (
    <Badge variant="ghost" className="w-fit text-neutral-400">
      <LuMapPin className="mr-2 h-3 w-3" />
      {props.children}
    </Badge>
  );
};
