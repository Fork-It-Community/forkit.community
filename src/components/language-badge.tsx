import { Badge } from "@/components/ui/badge";
import type { Talk } from "@/content/talks/talks";
import { Languages } from "lucide-react";

export const LanguageBadge = (props?: Pick<Talk, "language">) => {
  return (
    <Badge variant="ghost" className="w-fit h-5 text-neutral-400 p-0">
      <Languages className="mr-2 h-4 w-4" />
      <span>
        Talk in <span className="capitalize">{props?.language}</span>
      </span>
    </Badge>
  );
};
