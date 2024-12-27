import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { LuMapPin } from "react-icons/lu";

export const LocationBadge = (props: { children: ReactNode }) => {
  return (
    <Badge variant="ghost" className="text-neutral-400 w-fit">
      <LuMapPin className="mr-2 h-3 w-3" />
      {props.children}
    </Badge>
  );
};
