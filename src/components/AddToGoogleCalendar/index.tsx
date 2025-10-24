import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ComponentProps } from "react";

import { LuCalendarPlus } from "react-icons/lu";

export const AddToGoogleCalendar = (
  props: Pick<ComponentProps<"a">, "href">,
) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a rel="nofollow" href={props.href}>
            <LuCalendarPlus />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to Google Calendar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
