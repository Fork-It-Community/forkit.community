import { Badge } from "@/components/ui/badge";
import type { Talk } from "@/schemas/talks";
import { LuLanguages } from "react-icons/lu";

export const LanguageBadge = (props?: Pick<Talk, "language">) => {
  return (
    <Badge variant="ghost" className="text-neutral-400 h-5 w-fit p-0">
      <LuLanguages className="mr-2 h-4 w-4" />
      <span>
        Talk in <span className="capitalize">{props?.language}</span>
      </span>
    </Badge>
  );
};
