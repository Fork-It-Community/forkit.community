import { Badge } from "@/components/ui/badge";
import { Talk } from "@/content/collections";
import { Languages } from "lucide-react";

export const LanguageBadge = (props: Pick<Talk, "language">) => {
  return (
    <Badge variant="outline" className="w-fit">
      <Languages className="mr-2 h-4 w-4" />
      <span>
        Talk in <span className="capitalize">{props.language}</span>
      </span>
    </Badge>
  );
};
